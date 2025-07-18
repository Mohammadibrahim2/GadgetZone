import React from "react";
import {
    Card,
    Text,
    Group,
    Badge,
    Image,
    Rating,
    useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useMediaQuery } from "@mantine/hooks";
import HeroCarousel from "@/Pages/Home/Header";
import GuestLayout from "@/Layouts/GuestLayout";

const ShoppingPage = () => {
    const { shopProducts } = usePage().props;
    const products = shopProducts.data;
    const displayProducts = products || [];
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    const getRandomRating = () => {
        return (Math.random() * 1.5 + 3.5).toFixed(1);
    };

    const handleProductClick = (id) => {
        router.get(route("products.show", id));
    };

    const getGridColumns = () => {
        if (isMobile) return "repeat(2, 1fr)";
        if (isTablet) return "repeat(3, 1fr)";
        return "repeat(4, 1fr)";
    };

    return (
        <>
            <HeroCarousel />
            <div
                style={{
                    padding: isMobile ? "10px" : "20px",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                <Text
                    size={isMobile ? "lg" : "xl"}
                    weight={700}
                    style={{
                        marginBottom: isMobile ? "16px" : "24px",
                        fontSize: isMobile ? "24px" : "28px",
                        color: theme.colors.dark[7],
                        paddingLeft: isMobile ? "8px" : "0",
                    }}
                >
                    Just For You
                </Text>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: getGridColumns(),
                        gap: isMobile ? "12px" : "20px",
                    }}
                >
                    {displayProducts.map((product) => {
                        const priceInfo =
                            product.variants.find((attr) =>
                                parseInt(attr.price)
                            ) || {};
                        const ratingInfo =
                            product.variants.find((attr) => attr.rating) || {};

                        // Ensure price is an integer
                        const price = priceInfo.price
                            ? parseInt(priceInfo.price)
                            : 0;
                        const originalPrice = priceInfo.original_price
                            ? parseInt(priceInfo.original_price)
                            : null;

                        // Use actual rating if available, otherwise generate a random one
                        const rating = ratingInfo.rating || getRandomRating();
                        const reviewCount =
                            ratingInfo.review_count ||
                            Math.floor(Math.random() * 100) + 5;

                        return (
                            <motion.div
                                key={product.id}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleProductClick(product.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card
                                    withBorder
                                    shadow="sm"
                                    style={{
                                        height: "100%",
                                        transition: "all 0.3s ease",
                                        border: "1px solid #e0e0e0",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {product.featured_image && (
                                        <Card.Section
                                            style={{
                                                padding: isMobile
                                                    ? "4px"
                                                    : "10px",
                                                flex: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Image
                                                src={product.featured_image}
                                                height={isMobile ? 10 : 120}
                                                alt={product.title}
                                                fit="contain"
                                                style={{
                                                    objectPosition: "center",
                                                }}
                                            />
                                        </Card.Section>
                                    )}

                                    <div
                                        style={{
                                            padding: isMobile ? "8px" : "12px",
                                            flex: "0 0 auto",
                                        }}
                                    >
                                        <Text
                                            weight={600}
                                            size={isMobile ? "sm" : "md"}
                                            style={{
                                                marginBottom: isMobile
                                                    ? "6px"
                                                    : "8px",
                                                minHeight: isMobile
                                                    ? "36px"
                                                    : "44px",
                                                lineHeight: "1.3",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {product.title}
                                        </Text>

                                        <Text
                                            size={isMobile ? "xs" : "sm"}
                                            color="dimmed"
                                            style={{
                                                marginBottom: isMobile
                                                    ? "4px"
                                                    : "6px",
                                            }}
                                        >
                                            {product.brand?.name || "Generic"} •{" "}
                                            {product.category?.title ||
                                                "Category"}
                                        </Text>

                                        <Group
                                            spacing="xs"
                                            style={{
                                                marginBottom: isMobile
                                                    ? "8px"
                                                    : "12px",
                                            }}
                                        >
                                            <Text
                                                weight={700}
                                                size={isMobile ? "md" : "lg"}
                                                color="#e63946"
                                            >
                                                ৳{price.toLocaleString()}
                                            </Text>
                                            {originalPrice &&
                                                originalPrice > price && (
                                                    <Text
                                                        size={
                                                            isMobile
                                                                ? "xs"
                                                                : "sm"
                                                        }
                                                        color="dimmed"
                                                        strikethrough
                                                    >
                                                        ৳
                                                        {originalPrice.toLocaleString()}
                                                    </Text>
                                                )}
                                            {priceInfo.discount && (
                                                <Badge
                                                    color="red"
                                                    variant="light"
                                                    size={
                                                        isMobile ? "xs" : "sm"
                                                    }
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    {priceInfo.discount}% OFF
                                                </Badge>
                                            )}
                                        </Group>

                                        <Group spacing={4} align="center">
                                            <Rating
                                                value={parseFloat(rating)}
                                                fractions={2}
                                                readOnly
                                                size={isMobile ? "xs" : "sm"}
                                                style={{ marginRight: "4px" }}
                                            />
                                            <Text
                                                size={isMobile ? "xs" : "sm"}
                                                color="#FFA41C"
                                                weight={600}
                                            >
                                                {rating}
                                            </Text>
                                            <Text
                                                size={isMobile ? "xs" : "sm"}
                                                color="dimmed"
                                            >
                                                ({reviewCount.toLocaleString()})
                                            </Text>
                                        </Group>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

ShoppingPage.layout = (page) => (
    <GuestLayout title="Products">{page}</GuestLayout>
);
export default ShoppingPage;
