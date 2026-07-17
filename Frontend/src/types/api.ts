export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryName: string;
  categorySlug: string;
  isFeatured: boolean;
  inStock: boolean;
  sizes: string[];
  colors: string[];
}
