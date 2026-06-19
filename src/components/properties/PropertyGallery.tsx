import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { optimizeGalleryImage } from "@/utils/imageOptimizer";

export default function PropertyGallery({ images, className }: { images: string[]; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {images.map((src) => {
            const imgSrc = optimizeGalleryImage(src);
            return (
              <CarouselItem key={src} className="basis-full">
                <div className="overflow-hidden rounded-3xl border border-[hsl(var(--brand-ink)/0.10)] bg-black/5">
                  <div className="aspect-[16/11] md:aspect-[16/10]">
                    <img
                      src={imgSrc}
                      alt="Property photo"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-3 rounded-full bg-white/85 hover:bg-white border border-[hsl(var(--brand-ink)/0.12)]" />
        <CarouselNext className="right-3 rounded-full bg-white/85 hover:bg-white border border-[hsl(var(--brand-ink)/0.12)]" />
      </Carousel>
    </div>
  );
}
