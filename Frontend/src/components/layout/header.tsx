import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, Search, X } from "lucide-react";
import { useCart } from "../../cart-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Header() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Mobile menu */}
        <div className="flex items-center md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 -ml-2 text-foreground/80 hover:text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background border-r print-border p-0 flex flex-col">
              <div className="p-6 border-b border-border/40 bg-muted/30">
                <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-primary flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  Fabrics<span className="text-accent text-4xl leading-none">.</span>
                </Link>
                <p className="text-muted-foreground mt-2 text-sm italic">Honest goods since '74.</p>
              </div>
              <nav className="flex flex-col flex-1 p-4 gap-2">
                <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-3 text-lg font-medium hover:bg-muted/50 rounded-sm transition-colors border border-transparent hover:border-border/30">
                  Home
                </Link>
                <Link href="/shop" onClick={() => setIsOpen(false)} className="px-4 py-3 text-lg font-medium hover:bg-muted/50 rounded-sm transition-colors border border-transparent hover:border-border/30">
                  Shop All
                </Link>
                <Link href="/shop?category=denim" onClick={() => setIsOpen(false)} className="px-4 py-3 text-lg font-medium hover:bg-muted/50 rounded-sm transition-colors border border-transparent hover:border-border/30">
                  Denim
                </Link>
                <Link href="/shop?category=outerwear" onClick={() => setIsOpen(false)} className="px-4 py-3 text-lg font-medium hover:bg-muted/50 rounded-sm transition-colors border border-transparent hover:border-border/30">
                  Outerwear
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
          <Link href="/" className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-primary flex items-center gap-1 group">
            Fabrics<span className="text-accent group-hover:text-primary transition-colors text-4xl leading-none">.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 mx-6">
          <Link href="/shop" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Shop</Link>
          <Link href="/shop?category=denim" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Denim</Link>
          <Link href="/shop?category=shirting" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Shirting</Link>
          <Link href="/shop?category=accessories" className="text-sm font-medium tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">Accessories</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-1 md:flex-initial justify-end">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative w-full max-w-sm flex items-center">
              <Input
                autoFocus
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 bg-background border-primary focus-visible:ring-1 focus-visible:ring-primary rounded-none"
              />
              <Button type="button" variant="ghost" size="icon" className="absolute right-0 h-full text-muted-foreground hover:text-foreground" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {!isSearchOpen && (
            <Link href="/cart" className="relative p-2 text-foreground/80 hover:text-primary transition-colors inline-flex items-center justify-center rounded-md hover:bg-muted/50">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground border border-background">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
