const API = import.meta.env.VITE_API_URL;

export async function getProducts() {
    console.log("==========");
    console.log("API URL:", API);
    console.log("Calling:", `${API}/products`);

    const res = await fetch(`${API}/products`);

    console.log("Status:", res.status);

    const data = await res.json();

    console.log("Products:", data);

    return data;
}

export async function getProduct(id: number) {
    const res = await fetch(`${API}/products/${id}`);
    return res.json();
}

export async function getFeaturedProducts() {
    const products = await getProducts();
    return products.filter((p: any) => p.isFeatured);
}