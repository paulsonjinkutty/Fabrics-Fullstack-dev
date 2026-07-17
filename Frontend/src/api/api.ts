const BASE_URL = import.meta.env.VITE_API_URL;

export interface Category {
    id: number;
    name: string;
    slug: string;
    imageUrl?: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    imageUrl: string;
    categoryId: number;
    categoryName: string;
    categorySlug: string;
    colors: string[];
    sizes: string[];
    inStock: boolean;
    featured?: boolean;
}

export interface CartItemPayload {
    productId: number;
    quantity: number;
    size: string;
    color: string;
}

export interface CreateOrderPayload {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    items: CartItemPayload[];
}

export interface OrderItem {
    productId: number;
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

async function api<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export function getCategories() {
    return api<Category[]>("/categories");
}

export function getProducts() {
    return api<Product[]>("/products");
}

export function getProduct(id: number) {
    return api<Product>(`/products/${id}`);
}

export async function getFeaturedProducts() {
    const products = await getProducts();
    return products.filter((p) => p.featured);
}

export function createOrder(payload: { data: CreateOrderPayload }) {
    return api<Order>("/orders", {
        method: "POST",
        body: JSON.stringify(payload.data),
    });
}

export function getOrder(id: number) {
    return api<Order>(`/orders/${id}`);
}