import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "../cart-context";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
  });
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  const [error, setError] = useState("");

  if (items.length === 0 && !createOrderMutation.isSuccess) {
    setLocation("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      setError("Please fill out all required fields.");
      return;
    }

    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`;
    const customerName = `${formData.firstName} ${formData.lastName}`;

    createOrderMutation.mutate({
      data: {
        customerName,
        customerEmail: formData.email,
        shippingAddress,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        }))
      }
    }, {
      onSuccess: (order: any) => {
        clearCart();
        setLocation(`/order-confirmation/${order.id}`);
      },
      onError: () => {
        setError("There was a problem processing your order. Please try again.");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl min-h-screen">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </Link>
      </div>

      <h1 className="font-serif text-5xl font-bold text-foreground mb-12">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 flex-col-reverse">
        {/* Form */}
        <div className="lg:w-3/5">
          {error && (
             <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 mb-8 text-sm font-medium">
               {error}
             </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 border-b border-border pb-2">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">First Name</Label>
                  <Input 
                    id="firstName" name="firstName" 
                    value={formData.firstName} onChange={handleInputChange}
                    className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Last Name</Label>
                  <Input 
                    id="lastName" name="lastName" 
                    value={formData.lastName} onChange={handleInputChange}
                    className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Email Address</Label>
                  <Input 
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleInputChange}
                    className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 border-b border-border pb-2">Shipping Destination</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Street Address</Label>
                  <Input 
                    id="address" name="address" 
                    value={formData.address} onChange={handleInputChange}
                    className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="city" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">City</Label>
                    <Input 
                      id="city" name="city" 
                      value={formData.city} onChange={handleInputChange}
                      className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">State/Province</Label>
                    <Input 
                      id="state" name="state" 
                      value={formData.state} onChange={handleInputChange}
                      className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Postal Code</Label>
                    <Input 
                      id="zip" name="zip" 
                      value={formData.zip} onChange={handleInputChange}
                      className="rounded-none border-border focus-visible:ring-primary h-12 bg-background"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Dummy */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 border-b border-border pb-2">Payment</h2>
              <div className="bg-muted p-6 print-border border-border/50 text-center">
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Payment bypassed for demonstration</p>
              </div>
            </section>

            <Button 
              type="submit" 
              disabled={createOrderMutation.isPending}
              className="w-full h-16 rounded-none bg-primary text-primary-foreground text-base font-bold uppercase tracking-widest hover:bg-primary/90"
            >
              {createOrderMutation.isPending ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
              ) : (
                `Place Order • $${cartTotal.toFixed(2)}`
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-2/5">
          <div className="bg-card p-6 md:p-8 print-border border-border sticky top-24">
            <h3 className="font-serif text-2xl font-bold mb-6 border-b border-border/50 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.cartItemId} className="flex gap-4">
                  <div className="w-16 aspect-[4/5] bg-muted shrink-0 print-border border-border/30">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.color} / {item.size}</p>
                    <p className="text-xs text-muted-foreground font-medium">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm font-medium border-t border-border/50 pt-6 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-foreground/10 pt-4">
              <span className="text-lg font-bold uppercase tracking-widest">Total</span>
              <span className="text-3xl font-bold font-serif text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
