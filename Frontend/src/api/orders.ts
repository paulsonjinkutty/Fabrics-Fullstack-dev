const API = import.meta.env.VITE_API_URL;

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  unitPrice: string;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: {
    productId: number;
    quantity: number;
    size: string;
    color: string;
  }[];
}

export const createOrder = async (
    payload: { data: CreateOrderPayload } | CreateOrderPayload
): Promise<Order> => {
  const body = "data" in payload ? payload.data : payload;

  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};

export const getOrder = async (id: number): Promise<Order> => {
  const res = await fetch(`${API}/orders/${id}`);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};