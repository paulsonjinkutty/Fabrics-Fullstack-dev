import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/api";
import type { Order } from "@/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Mail } from "lucide-react";

export default function OrderConfirmation() {


  const params = useParams<{ id: string }>();

  const id = params.id;

  const { data: order, isPending: isLoading } = useQuery<Order>({
    queryKey: ["order", id],
    queryFn: () => getOrder(Number(id)),
    enabled: !!id,
  });
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-3xl min-h-screen flex flex-col items-center">
        <Skeleton className="h-16 w-16 rounded-full mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-12" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col justify-center">
        <h1 className="font-serif text-4xl mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't locate this dispatch record.</p>
        <Button asChild><Link href="/">Return Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24 max-w-3xl min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-8 border-2 border-primary/20">
          <Check className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Order Confirmed.</h1>
        <p className="text-lg text-muted-foreground">
          Thank you for choosing Fabrics. Your provisions are being prepared.
        </p>
      </div>

      <div className="bg-card print-border border-border p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements for receipt vibe */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIGZpbGw9IiNlNTVlNGIiIHBvaW50cz0iMCAwIDQgNCA4IDAgOCA4IDAgOCIvPjwvc3ZnPg==')] bg-repeat-x opacity-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-border/50 pb-8 mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Dispatch Number</p>
            <p className="font-mono text-xl">#{String(order.id).padStart(6, '0')}</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Date</p>
            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="font-serif text-2xl font-bold mb-6">Manifest</h3>
          <div className="space-y-6">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 aspect-[4/5] bg-muted shrink-0 print-border border-border/30">
                  <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base leading-tight mb-1">{item.productName}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.color} / {item.size} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-base font-bold">
                  {item.unitPrice}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 mb-10 text-sm">
          <div className="flex justify-between items-center py-2 text-lg">
            <span className="font-bold uppercase tracking-widest">Total Paid</span>
            <span className="font-serif text-2xl font-bold text-primary">{order.total}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/30 p-6 print-border border-border/20 text-sm">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Shipping Details</h4>
            <p className="font-medium mb-1">{order.customerName}</p>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {order.shippingAddress.split(', ').join('\n')}
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-muted-foreground mb-2">Contact</h4>
            <p className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              {order.customerEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="h-14 px-8 rounded-none border-border font-bold uppercase tracking-widest hover:bg-muted">
          <Link href="/shop">Return to Catalog</Link>
        </Button>
      </div>
    </div>
  );
}
