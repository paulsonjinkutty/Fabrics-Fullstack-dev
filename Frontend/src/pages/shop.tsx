import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts } from "@/api";
import { useLocation, useSearch } from "wouter";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
};

type Product = {
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
};

export default function Shop() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [, setLocation] = useLocation();
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoadingCategories, setLoadingCategories] = useState(true);
  const [isLoadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {

    async function loadData() {

        try {

            const cats = await getCategories();
            const prods = await getProducts();

            setCategories(cats);
            setProducts(prods);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingCategories(false);
            setLoadingProducts(false);

        }

    }

    loadData();

  }, []);
  
  const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const matchesCategory =
      !categoryFilter || product.categorySlug === categoryFilter;

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}, [products, categoryFilter, searchQuery]);

 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (categoryFilter) newParams.set("category", categoryFilter);
    if (localSearch.trim()) newParams.set("search", localSearch.trim());
    setLocation(`/shop${newParams.toString() ? `?${newParams.toString()}` : ""}`);
  };

  const handleCategorySelect = (slug: string | null) => {
    const newParams = new URLSearchParams();
    if (slug) newParams.set("category", slug);
    if (searchQuery) newParams.set("search", searchQuery);
    setLocation(`/shop${newParams.toString() ? `?${newParams.toString()}` : ""}`);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    setLocation("/shop");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <div className="mb-8 md:mb-12 text-center md:text-left">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
          {categoryFilter 
            ? categories?.find(c => c.slug === categoryFilter)?.name || "Category"
            : searchQuery ? "Search Results" : "All Goods"}
        </h1>
        {categoryFilter && (
          <p className="text-muted-foreground max-w-2xl text-lg">
            {categories?.find(c => c.slug === categoryFilter)?.description || "Browse our collection."}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden w-full flex gap-2">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex-1 flex items-center justify-center gap-2 border border-border bg-card px-4 py-3 text-sm font-medium uppercase tracking-wider"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters {categoryFilter && "(1)"}
          </button>
        </div>

        {/* Sidebar / Filters */}
        <aside className={`${isFilterOpen ? "block" : "hidden"} md:block w-full md:w-64 shrink-0 space-y-8`}>
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 border-b border-border pb-2">Search</h3>
            <form onSubmit={handleSearch} className="relative">
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Find something..."
                className="w-full bg-background border-border rounded-none pr-10"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 border-b border-border pb-2">Categories</h3>
            {isLoadingCategories ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-5 w-full" />)}
              </div>
            ) : (
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className={`text-left w-full flex justify-between items-center text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors ${!categoryFilter ? "text-primary font-bold" : "text-muted-foreground"}`}
                  >
                    <span>All Goods</span>
                  </button>
                </li>
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`text-left w-full flex justify-between items-center text-sm uppercase tracking-wider font-medium hover:text-primary transition-colors ${categoryFilter === cat.slug ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-60">({cat.productCount})</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(categoryFilter || searchQuery) && (
            <button 
              onClick={handleClearFilters}
              className="flex items-center gap-2 text-sm text-destructive hover:underline"
            >
              <X className="h-4 w-4" /> Clear all filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="flex-1 w-full">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : products?.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-border/50 bg-card">
              <h3 className="font-serif text-3xl mb-2">Nothing found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any products matching your current filters.</p>
              <button 
                onClick={handleClearFilters}
                className="bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4 print-border">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.inStock === false && (
                      <div className="absolute top-2 left-2 bg-background/90 text-foreground px-2 py-1 text-xs font-bold uppercase tracking-wider">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="font-medium text-base text-foreground leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-medium text-base">{product.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.categoryName}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
