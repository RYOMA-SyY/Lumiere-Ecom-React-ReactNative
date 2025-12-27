import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductController } from "../shared/controllers/ProductController";
import { Product } from "../shared/models/types";
import { ProductCard } from "../components/shared/ProductCard";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

export default function ProductListing() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    ProductController.getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, products]);

  const categories = ["All", "Electronics", "Fashion", "Home"];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t("shop_now")}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("categories")}</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={cat} 
                    checked={selectedCategory === cat}
                    onCheckedChange={() => setSelectedCategory(cat)}
                  />
                  <Label htmlFor={cat} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t(cat.toLowerCase())}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
