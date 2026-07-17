import { useParams } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/api";
import { useCart } from "../cart-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function ProductDetail() {
    const params = useParams<{ slug: string }>();
    const slug = params.slug;
    const { toast } = useToast();
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // We need to resolve slug to ID. The API expects an ID.
  // First fetch products matching the slug to get the ID.
 
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      async function loadProducts() {
          try {
              const data = await getProducts();
              setProducts(data);
          } catch (err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      }

      loadProducts();
  }, []);

  const product = useMemo(() => {
      return products.find((p) => p.slug === slug);
  }, [products, slug]);

   const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  }, [products, product]);  
  

  
  
  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    if (!selectedColor) {
      toast({ title: "Please select a color", variant: "destructive" });
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });

    toast({
      title: "Added to sack",
      description: `${product.name} (${selectedColor}, ${selectedSize})`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">This piece might have been archived.</p>
        <Button asChild><Link href="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-8 flex gap-2 items-center">
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-primary transition-colors">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] w-full bg-muted print-border overflow-hidden group">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative thumbnails mimicking vintage catalog layout */}
          <div className="grid grid-cols-3 gap-4">
             <div className="aspect-square bg-muted print-border overflow-hidden">
               <img src={product.imageUrl} className="w-full h-full object-cover scale-150 origin-top" alt="Detail 1"/>
             </div>
             <div className="aspect-square bg-muted print-border overflow-hidden">
               <img src={product.imageUrl} className="w-full h-full object-cover scale-150 origin-bottom" alt="Detail 2"/>
             </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col pt-4 md:pt-10">
          <div className="mb-8">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl font-medium font-serif italic text-primary">{product.price}</p>
          </div>

          <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed mb-10 max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="space-y-8 mb-10">
            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold uppercase tracking-wider">Color</span>
                {selectedColor && <span className="text-sm text-muted-foreground">{selectedColor}</span>}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm font-medium uppercase tracking-wider transition-colors ${
                      selectedColor === color 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-border/50 text-foreground hover:border-foreground'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold uppercase tracking-wider">Size</span>
                <button className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm font-bold uppercase tracking-wider transition-colors ${
                      selectedSize === size 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-border/50 text-foreground hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full h-16 rounded-none bg-primary text-primary-foreground text-base font-bold uppercase tracking-widest hover:bg-primary/90"
          >
            {product.inStock ? 'Add to Sack' : 'Out of Stock'}
          </Button>

          <div className="mt-8 border-t border-border/50 pt-8 space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-2"><span className="font-bold text-foreground">Material:</span> Heavyweight construct</div>
            <div className="flex gap-2"><span className="font-bold text-foreground">Care:</span> Wash cold, hang dry</div>
            <div className="flex gap-2"><span className="font-bold text-foreground">Shipping:</span> Dispatches in 1-2 business days</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="border-t border-border/50 pt-16 lg:pt-24 mt-16">
          <h2 className="font-serif text-4xl font-bold mb-10 text-center">Similar Provisions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0,4).map(related => (
               <Link key={related.id} href={`/products/${related.slug}`} className="group flex flex-col">
                 <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4 print-border">
                   <img 
                     src={related.imageUrl} 
                     alt={related.name}
                     className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                     loading="lazy"
                   />
                 </div>
                 <div className="flex flex-col flex-1">
                   <div className="flex justify-between items-start gap-2 mb-1">
                     <h3 className="font-medium text-base text-foreground leading-tight group-hover:text-primary transition-colors">
                       {related.name}
                     </h3>
                     <span className="font-medium text-base">{related.price}</span>
                   </div>
                 </div>
               </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
