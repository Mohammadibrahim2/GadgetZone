import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Title, Text } from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

function HeroCarousel() {
    const autoplay = useRef(
        Autoplay({ delay: 4500, stopOnInteraction: false })
    );
    const isMobile = useMediaQuery("(max-width: 768px)");

    // 6 verified slides with working images
    const slides = [
        {
            title: "AirPods Pro",
            subtitle: "Active noise cancellation",
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1470&auto=format&fit=crop",
            bgColor: "from-orange-100 to-orange-400",
            textColor: "text-white",
            cta: "Buy Now",
            brand: "APPLE",
        },
        {
            title: "Anker Nano III USB Drive",
            subtitle: "256GB Ultra-Compact • 400MB/s Speeds",
            image: "https://i.postimg.cc/wx4kc2P8/pexels-photo-10336136.jpg",
            gradient:
                "bg-gradient-to-tr from-amber-500/90 via-orange-500/80 to-amber-600/90",
            cta: "Shop Storage",
            brand: "ANKER",
        },
        {
            title: "Galaxy Watch 6",
            subtitle: "Advanced health monitoring",
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1470&auto=format&fit=crop",
            bgColor: "from-orange-100 to-orange-400",
            textColor: "text-white",
            cta: "Shop Now",
            brand: "SAMSUNG",
        },
        {
            title: "Premium Headphones",
            subtitle: "40-hour battery life",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1470&auto=format&fit=crop",
            bgColor: "from-orange-400 to-orange-100",
            textColor: "text-white",
            cta: "Shop Audio",
            brand: "SONY",
        },
        {
            title: "USB-C Cable Set",
            subtitle: "10Gbps data transfer",
            image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1470&auto=format&fit=crop",
            bgColor: "from-orange-300 to-amber-100",
            textColor: "text-white",
            cta: "Shop Cables",
            brand: "UGREEN",
        },
        {
            title: "Gaming Keyboard",
            subtitle: "Mechanical RGB switches",
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1470&auto=format&fit=crop",
            bgColor: "",
            textColor: "text-white",
            cta: "Explore Gaming",
            brand: "RAZER",
        },
    ];

    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            <Carousel
                withIndicators
                withControls
                height="100%"
                loop
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
                styles={{
                    root: { height: "100%" },
                    viewport: { height: "100%" },
                    container: { height: "100%" },
                    controls: {
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0 16px",
                    },
                    control: {
                        backgroundColor: "rgba(255,255,255,0.7)",
                        color: "black",
                        border: "none",
                        "&:hover": { backgroundColor: "white" },
                    },
                    indicators: {
                        bottom: "20px",
                    },
                    indicator: {
                        width: 10,
                        height: 10,
                        backgroundColor: "rgba(255,255,255,0.4)",
                        "&[data-active]": { backgroundColor: "white" },
                    },
                }}
            >
                {slides.map((slide, index) => (
                    <Carousel.Slide key={index} className="h-full">
                        <div
                            className={`relative h-full w-full bg-gradient-to-r ${slide.bgColor}`}
                        >
                            {/* Image with orange overlay */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover  "
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/1920x1080/333/fff?text=${encodeURIComponent(
                                            slide.title
                                        )}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-orange-500 opacity-30"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center justify-center p-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slide.title + index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-center max-w-4xl mx-auto px-4"
                                    >
                                        <Title
                                            className={`${
                                                slide.textColor || "text-white"
                                            } text-3xl md:text-5xl font-bold mb-4`}
                                        >
                                            {slide.title}
                                        </Title>
                                        <Text
                                            className={`${"text-white"} text-lg md:text-xl mb-8`}
                                        >
                                            {slide.subtitle}
                                        </Text>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                size="sm"
                                                variant="white"
                                                color="orange"
                                                radius="xl"
                                                className="font-bold shadow-lg hover:bg-orange-100"
                                            >
                                                {slide.cta}
                                            </Button>
                                        </motion.div>
                                        <Text
                                            className={`${
                                                slide.textColor || "text-white"
                                            } text-sm md:text-base mt-8 tracking-widest`}
                                        >
                                            {slide.brand}
                                        </Text>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

export default HeroCarousel;
