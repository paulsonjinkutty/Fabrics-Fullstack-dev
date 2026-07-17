const API = import.meta.env.VITE_API_URL;

export const createOrder = async (payload: any) => {
  // payload may be { data: { ... } } from existing callers — support both shapes
  const body = payload && payload.data ? payload.data : payload;

  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create order: ${res.status} ${text}`);
  }

  return res.json();
};

export const getOrder = async (id: number) => {
  const res = await fetch(`${API}/orders/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch order ${id}`);
  }
  return res.json();
};
