import { Text, Title, Card, Image } from "@mantine/core";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { motion } from "framer-motion";

export function Categories() {
    const categories = [
        {
            name: "Laptop",
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "Pendrive",
            image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "Smart Watch",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "Adapter",
            image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "Power Bank",
            image: "https://m.media-amazon.com/images/I/51zFgm2MTHL._UF1000,1000_QL80_.jpg",
        },
        {
            name: "Button Mobile",
            image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "Airpod",
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop&auto=format",
        },
        {
            name: "USB Cable",
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200&h=200&fit=crop&auto=format",
        },
    ];

    const ref = useRef(null);
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true, // Adds smooth resistance when scrolling past boundaries
    });

    return (
        <div className="my-12 px-4 sm:px-6 lg:px-8 w-full mx-auto max-w-7xl">
            <Title
                order={2}
                className="text-2xl font-bold text-gray-800 mb-8 text-center"
            >
                Shop by categories
            </Title>

            <div className="relative">
                <motion.div
                    className="flex gap-6 overflow-x-auto py-4 scrollbar-hide px-4"
                    ref={ref}
                    {...events}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.name}
                            className="flex-shrink-0 w-36 h-44 flex justify-center" // Slightly larger cards
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Card
                                shadow="sm"
                                padding="lg"
                                className="flex flex-col items-center justify-center cursor-grab active:cursor-grabbing w-full h-full backdrop-blur-sm bg-white bg-opacity-80 border border-gray-200 rounded-xl"
                            >
                                <Card.Section className="p-3 flex justify-center">
                                    <div className="backdrop-blur-md bg-white bg-opacity-60 rounded-full p-4 flex items-center justify-center">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            width={70}
                                            height={70}
                                            className="rounded-full object-cover"
                                            withPlaceholder
                                        />
                                    </div>
                                </Card.Section>
                                <Text
                                    size="md"
                                    className="text-center mt-4 font-semibold text-gray-800 bg-white bg-opacity-80 px-3 py-1.5 rounded-lg"
                                >
                                    {category.name}
                                </Text>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
