import { Image, Group, Text, rem } from "@mantine/core";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";

export function ProductImages({
    images,
    colors,
    selectedColor,
    onColorChange,
    activeImage,
    setActiveImage,
}) {
    const [filteredImages, setFilteredImages] = useState(images);
    const [thumbnailCarousel, setThumbnailCarousel] = useState(null);

    // Filter images when color changes
    useEffect(() => {
        if (selectedColor) {
            const filtered = images.filter(
                (img) => img.color_id === selectedColor
            );
            setFilteredImages(filtered);
            if (!filtered.some((img) => img.path === activeImage)) {
                setActiveImage(filtered[0]?.path);
            }
        } else {
            setFilteredImages(images);
            if (!images.some((img) => img.path === activeImage)) {
                setActiveImage(images[0]?.path);
            }
        }
    }, [selectedColor, images]);
    // Handle thumbnail click
    const handleThumbnailClick = (imgPath, index) => {
        setActiveImage(imgPath);
        if (thumbnailCarousel) {
            thumbnailCarousel.scrollTo(index);
        }
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Main Image Display (No Carousel) */}
            <div
                style={{
                    borderRadius: "var(--mantine-radius-md)",
                    overflow: "hidden",
                    boxShadow: "var(--mantine-shadow-sm)",
                    aspectRatio: "1/1",
                    backgroundColor: "var(--mantine-color-gray-1)",
                    marginBottom: rem(16),
                }}
            >
                <Image
                    src={activeImage}
                    fit="contain"
                    // className="w-[200px] h-[300px]"
                    width="70%"
                    height="60%"
                    alt="Product image"
                    withPlaceholder
                />
            </div>

            {/* Thumbnail Navigation Carousel */}
            <Carousel
                withControls
                slideSize="20%"
                slideGap="md"
                align="start"
                height={rem(90)}
                getEmblaApi={setThumbnailCarousel}
                dragFree
                style={{ marginBottom: rem(16) }}
            >
                {filteredImages.map((img, index) => (
                    <Carousel.Slide key={img.id}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Image
                                src={img.path}
                                onClick={() =>
                                    handleThumbnailClick(img.path, index)
                                }
                                style={{
                                    width: rem(80),
                                    height: rem(80),
                                    borderRadius: "var(--mantine-radius-sm)",
                                    cursor: "pointer",
                                    border: `2px solid ${
                                        activeImage === img.path
                                            ? "var(--mantine-color-orange-5)"
                                            : "var(--mantine-color-gray-3)"
                                    }`,
                                }}
                            />
                        </motion.div>
                    </Carousel.Slide>
                ))}
            </Carousel>

            {/* Color Selection */}
            {colors.length > 0 && (
                <div style={{ marginTop: rem(16) }}>
                    <Text size="sm" fw={500}>
                        Color Family
                    </Text>
                    <Group gap="xs" mt={8}>
                        {colors.map((color) => (
                            <motion.div
                                key={color.id}
                                style={{
                                    width: rem(32),
                                    height: rem(32),
                                    borderRadius: "50%",
                                    border: `2px solid ${
                                        selectedColor === color.id
                                            ? "var(--mantine-color-orange-5)"
                                            : "var(--mantine-color-gray-4)"
                                    }`,
                                    cursor: "pointer",
                                    backgroundColor: color.hex,
                                }}
                                onClick={() => onColorChange(color.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={color.name}
                            />
                        ))}
                    </Group>
                </div>
            )}
        </div>
    );
}
