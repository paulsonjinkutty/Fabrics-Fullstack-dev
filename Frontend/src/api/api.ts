const BASE_URL = import.meta.env.VITE.API_URL

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories`);
    return res.json();
}

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
}

export async function getProduct(id: number) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
}