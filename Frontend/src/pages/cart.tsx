import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "../cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const { items, updateQuantity, removeItem, cartTotal } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl font-bold text-foreground mb-6">Your sack is empty</h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-md">
          Looks like you haven't added any goods yet. Browse our catalog to find your next staple piece.
        </p>
        <Button asChild size="lg" className="rounded-none px-8 py-6 text-sm uppercase tracking-widest font-bold bg-primary text-primary-foreground">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-screen">
      <h1 className="font-serif text-5xl lg:text-6xl font-bold text-foreground mb-12 border-b border-border pb-6">
        Provisions
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-8">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex gap-4 sm:gap-6 pb-8 border-b border-border/50">
              {/* Product Image */}
              <div className="w-24 sm:w-32 aspect-[4/5] bg-muted shrink-0 print-border">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                      <Link href={`/products/${item.productId}`} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <span className="font-bold text-lg">{item.price}</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <label htmlFor={`qty-${item.cartItemId}`} className="sr-only">Quantity</label>
                    <div className="flex items-center border border-border">
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-3 py-1 text-foreground hover:bg-muted/50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-3 py-1 text-foreground hover:bg-muted/50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-muted-foreground hover:text-destructive flex items-center gap-2 text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-card print-border p-6 md:p-8 sticky top-24">
            <h2 className="font-serif text-3xl font-bold mb-6">Manifest</h2>
            
            <div className="space-y-4 text-sm font-medium border-b border-border/50 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold">Estimated Total</span>
              <span className="text-2xl font-bold font-serif">${cartTotal.toFixed(2)}</span>
            </div>

            <Button 
              onClick={() => setLocation("/checkout")}
              className="w-full h-14 rounded-none bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-primary/90 flex items-center justify-between px-6"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-6 uppercase tracking-widest">
              Secure Checkout • Standard Shipping Available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
