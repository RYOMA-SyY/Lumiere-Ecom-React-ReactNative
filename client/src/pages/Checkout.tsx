import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import { validateEmail, validatePostalCode, validateCardNumber, validateExpiryDate, validateCVV } from "../lib/validation";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Checkout() {
  const { t } = useTranslation();
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateShippingForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    else if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = "Invalid postal code";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!validateCardNumber(formData.cardNumber)) newErrors.cardNumber = "Invalid card number";
    
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    else if (!validateExpiryDate(formData.expiryDate)) newErrors.expiryDate = "Invalid or expired card";
    
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (!validateCVV(formData.cvv)) newErrors.cvv = "Invalid CVV (3-4 digits)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShippingForm()) {
      setStep('payment');
      toast.success("Shipping information saved!");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('confirmation');
        toast.success("Order placed successfully!");
        setTimeout(() => {
          clearCart();
        }, 2000);
      }, 1500);
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order is being prepared.</p>
          <p className="text-3xl font-bold text-primary">${total.toFixed(2)}</p>
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p>Order #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p>Confirmation email sent to {formData.email}</p>
          </div>
          <Link href="/">
            <Button className="w-full mt-6">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">{t("checkout")}</h1>
            </div>

            {/* Steps */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              {(['shipping', 'payment'] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    ['shipping', 'payment'].indexOf(s) <= ['shipping', 'payment'].indexOf(step)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium capitalize hidden sm:inline">{s}</span>
                  {i < 1 && <div className="w-4 h-px bg-border mx-2 hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Form */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      errorMessage={errors.firstName}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      errorMessage={errors.lastName}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      errorMessage={errors.email}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      errorMessage={errors.address}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={!!errors.city}
                      errorMessage={errors.city}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      error={!!errors.postalCode}
                      errorMessage={errors.postalCode}
                      required
                    />
                  </div>
                </div>
              </motion.div>
              <Button type="submit" size="lg" className="w-full h-12 text-lg rounded-xl">
                Continue to Payment
              </Button>
            </form>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      error={!!errors.cardNumber}
                      errorMessage={errors.cardNumber}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        error={!!errors.expiryDate}
                        errorMessage={errors.expiryDate}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        error={!!errors.cvv}
                        errorMessage={errors.cvv}
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="flex gap-3">
                <Button 
                  type="button"
                  variant="outline"
                  size="lg" 
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => setStep('shipping')}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 h-12 text-lg rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Complete Purchase"}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-xl border border-border space-y-6 sticky top-24"
          >
            <h2 className="text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1">{item.name} x{item.quantity}</span>
                  <span className="font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
