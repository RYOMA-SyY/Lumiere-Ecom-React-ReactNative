import { useStore } from "../lib/store";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Separator } from "../components/ui/separator";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQuantity } = useStore();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-bold">{t("cart")} is empty</h1>
        <p className="text-muted-foreground">Start adding some items to your cart!</p>
        <Link href="/shop">
          <Button size="lg">{t("shop_now")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("cart")}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
              <div className="h-24 w-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-xl border border-border space-y-6 sticky top-24">
            <h2 className="text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{t("total")}</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full text-lg h-12 rounded-xl">
              {t("checkout")} <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
