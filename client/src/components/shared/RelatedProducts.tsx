import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductController } from "../../shared/controllers/ProductController";
import { Product } from "../../shared/models/types";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
  maxProducts?: number;
}

export function RelatedProducts({ currentProductId, category, maxProducts = 4 }: RelatedProductsProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ProductController.getProductsByCategory(category).then((data) => {
      const filtered = data.filter(p => p.id !== currentProductId).slice(0, maxProducts);
      setProducts(filtered);
      setIsLoading(false);
    });
  }, [currentProductId, category, maxProducts]);

  if (isLoading || products.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold mb-8">{t("related_products")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
