import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card mt-24">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-4xl font-bold tracking-tight text-primary flex items-center gap-1 mb-4">
              Fabrics<span className="text-accent text-5xl leading-none">.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Honest, well-made clothing designed to wear in, not out. Quality goods for everyday life since 1974.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=denim" className="hover:text-primary transition-colors">Denim</Link></li>
              <li><Link href="/shop?category=shirting" className="hover:text-primary transition-colors">Shirting</Link></li>
              <li><Link href="/shop?category=outerwear" className="hover:text-primary transition-colors">Outerwear</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">The Catalog</h3>
            <p className="text-sm text-muted-foreground mb-4">Join our dispatch for early access to new runs and archival restocks.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-background border border-border/50 px-3 py-2 text-sm w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-none"
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Fabrics Supply Co. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
