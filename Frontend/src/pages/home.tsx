import { useEffect, useState } from "react";
import { getCategories, getFeaturedProducts } from "@/api";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

const denimJacketImg = "/products/denim-jacket.jpg";
const graphicTeeImg = "/products/graphic-tee.jpg";
const choreCoatImg = "/products/chore-coat.jpg";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoadingFeatured, setLoadingFeatured] = useState(true);
  const [isLoadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const products = await getFeaturedProducts();
        const cats = await getCategories();

        setFeaturedProducts(products);
        setCategories(cats);
      } finally {
        setLoadingFeatured(false);
        setLoadingCategories(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center bg-[#D6D2C4] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={denimJacketImg} 
            alt="Vintage clothing" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply"
          />
        </div>
        
        <div className="container relative z-10 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground font-bold tracking-tight mb-6 drop-shadow-sm">
            Worn In.
            <br />
            <span className="italic text-primary">Never Out.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto font-medium">
            Discover our latest collection of heavy-weight flannels, raw selvedge denim, and canvas goods built for the long haul.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground rounded-none px-8 py-6 text-sm uppercase tracking-widest font-bold hover:bg-primary/90 shadow-md">
              <Link href="/shop">Shop the Catalog</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none px-8 py-6 text-sm uppercase tracking-widest font-bold border-foreground/20 hover:bg-foreground/5 bg-transparent">
              <Link href="/shop?category=denim">Explore Denim</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-32 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Supply Lines</h2>
            <p className="text-muted-foreground mt-2">Browse our staple categories.</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 group">
            All Goods <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoadingCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-sm" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories?.slice(0, 3).map((category, index) => {
              const bgImages = [graphicTeeImg, choreCoatImg, denimJacketImg];
              const bgImage = bgImages[index % bgImages.length];
              
              return (
                <Link key={category.id} href={`/shop?category=${category.slug}`} className="group relative h-80 overflow-hidden print-border bg-card">
                  <div className="absolute inset-0">
                    <img 
                      src={bgImage} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="font-serif text-3xl text-white font-bold mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{category.productCount} Items</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card border-y border-border/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Archival Picks</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Our most loved pieces, brought back by popular demand.
            </p>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {featuredProducts?.map((product) => (
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
      </section>

      {/* Brand Story Banner */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center p-12 md:p-16 border-2 border-foreground/10 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')]">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-primary">Made for the Journey</h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            We don't believe in fast fashion. We believe in clothes that tell a story, that get better with every wash, every scrape, and every mile. Our fabrics are sourced from mills that still do things the old-fashioned way.
          </p>
          <img src="/api/healthz" alt="" className="hidden" /> {/* pre-warm api connection if possible */}
          <p className="font-bold uppercase tracking-widest text-sm text-accent">Since 1974</p>
        </div>
      </section>
    </div>
  );
}
