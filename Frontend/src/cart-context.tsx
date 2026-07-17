import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
type OrderItemInput = {
  productId: number;
  quantity: number;
  size: string;
  color: string;
};

export type CartItem = OrderItemInput & {
  cartItemId: string;
  name: string;
  price: string;
  imageUrl: string;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartItemId">) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("fabrics-cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fabrics-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "cartItemId">) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      
      if (existingIndex > -1) {
        const newItems = [...current];
        newItems[existingIndex].quantity += item.quantity;
        return newItems;
      }
      
      return [...current, { ...item, cartItemId: Math.random().toString(36).substr(2, 9) }];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((current) => current.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems((current) =>
      current.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartTotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
