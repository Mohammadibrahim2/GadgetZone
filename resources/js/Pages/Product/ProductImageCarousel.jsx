import { Image, Group, Text, Button, ScrollArea } from "@mantine/core";
import { motion } from "framer-motion";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { useState } from "react";

export function ProductImages({
    images,
    colors,
    selectedColor,
    onColorChange,
    activeImage,
    setActiveImage,
}) {
    const [showAll, setShowAll] = useState(false);
    const displayImages = showAll
        ? images
        : selectedColor
        ? images.filter((img) => img.color_id === selectedColor)
        : images;

    // Ensure carousel can scroll to last image
    const carouselStyles = {
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        gap: "0.5rem",
        paddingBottom: "0.5rem",
        "&::-webkit-scrollbar": {
            height: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
        },
    };

    return (
        <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden md:flex gap-4 w-full">
                {/* Left - Vertical Scrollable Carousel */}
                <div className="w-[100px] h-[400px]">
                    <ScrollArea style={{ height: "100%" }}>
                        <div className="flex flex-col gap-2 pr-2">
                            {displayImages.map((img) => (
                                <motion.div
                                    key={img.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex-shrink-0"
                                >
                                    <Image
                                        src={img.path}
                                        onClick={() => setActiveImage(img.path)}
                                        className={`w-20 h-20 rounded-sm cursor-pointer border-2 ${
                                            activeImage === img.path
                                                ? "border-orange-500"
                                                : "border-gray-300"
                                        }`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right - Active Image and Colors */}
                <div className="flex-1">
                    <div className="rounded-md overflow-hidden shadow-sm aspect-square bg-gray-100 mb-4 flex justify-center items-center">
                        <Image
                            src={activeImage}
                            fit="contain"
                            className="w-full h-full max-w-[500px] max-h-[500px] object-contain"
                            withPlaceholder
                        />
                    </div>

                    {colors.length > 0 && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Text size="sm" fw={500}>
                                    Available Colors
                                </Text>
                                <Button
                                    variant="subtle"
                                    size="xs"
                                    onClick={() => setShowAll(!showAll)}
                                    className="text-orange-500"
                                >
                                    {showAll ? "Show Filtered" : "Show All"}
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-0">
                                {colors.map((color) => (
                                    <motion.div
                                        key={color.id}
                                        className={`w-10 h-10 cursor-pointer border-2 ${
                                            selectedColor === color.id
                                                ? "border-orange-500"
                                                : "border-gray-200"
                                        }`}
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => {
                                            onColorChange(color.id);
                                            setShowAll(false);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block md:hidden">
                {/* Top - Active Image */}
                <div className="rounded-md overflow-hidden shadow-sm aspect-square bg-gray-100 mb-4 flex justify-center items-center">
                    <Image
                        src={activeImage}
                        fit="contain"
                        className="w-full h-full object-contain"
                        withPlaceholder
                    />
                </div>

                {/* Middle - Horizontal Scrollable Carousel */}
                <div className="mb-4" style={carouselStyles}>
                    {displayImages.map((img) => (
                        <motion.div
                            key={img.id}
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0"
                            style={{ scrollSnapAlign: "start" }}
                        >
                            <Image
                                src={img.path}
                                onClick={() => setActiveImage(img.path)}
                                className={`w-[70px] h-[70px] rounded-sm cursor-pointer border-2 ${
                                    activeImage === img.path
                                        ? "border-orange-500"
                                        : "border-gray-300"
                                }`}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom - Color Selection */}
                {colors.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Text size="sm" fw={500}>
                                Available Colors
                            </Text>
                            <Button
                                variant="subtle"
                                size="xs"
                                onClick={() => setShowAll(!showAll)}
                                className="text-orange-500"
                            >
                                {showAll ? "Show Filtered" : "Show All"}
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-0">
                            {colors.map((color) => (
                                <motion.div
                                    key={color.id}
                                    className={`w-10 h-10 cursor-pointer border-2 ${
                                        selectedColor === color.id
                                            ? "border-orange-500"
                                            : "border-gray-200"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => {
                                        onColorChange(color.id);
                                        setShowAll(false);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
