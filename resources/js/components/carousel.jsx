import * as React from "react";
import announcement from "../../assets/ClassReturn.jpg";
import westbridgeBanner from "../../assets/Westbridge2025.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [announcement, westbridgeBanner];

export default function CarouselCard({ className = "" }) {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <div className={`${className} flex justify-center`}>
            <Carousel
                className="w-full max-w-6xl"
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-[16/9] items-center justify-center lg:p-6">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`carousel-image-${index}`}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
