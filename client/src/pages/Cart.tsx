import { useStore } from "../lib/store";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { motion } from "framer-motion";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity } = useStore();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-4xl font-bold">{t("cart")} is empty</h1>
        <p className="text-muted-foreground text-lg">Start adding some items to your cart!</p>
        <Link href="/shop">
          <Button size="lg" className="mt-4">{t("shop_now")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">{t("cart")}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-border/80 transition-all"
            >
              <div className="h-24 w-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <Link href={`/product/${item.id}`}>
                    <div className="cursor-pointer">
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Link>
                  <p className="font-bold text-lg text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3 border border-border rounded-lg p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Sticky */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-xl border border-border space-y-6 sticky top-24"
          >
            <h2 className="text-2xl font-bold">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{t("total")}</span>
                <span className="text-primary text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full h-12 text-lg rounded-xl">
                {t("checkout")} <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
              </Button>
            </Link>
            
            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full h-12 rounded-xl">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
