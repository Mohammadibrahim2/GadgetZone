import React from "react";
import { Card, Text, Group, Badge, Image, Rating } from "@mantine/core";
import { motion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import HeroCarousel from "@/Pages/Home/Header";
import { Categories } from "@/Pages/Home/Categories/Categories";
import { Newsletter } from "@/Pages/Home/Newletter/Index";
import { Footer } from "@/Pages/Home/Footer/Footer";

const ShoppingPage = () => {
    const { shopProducts } = usePage().props;
    const products = shopProducts.data;
    const displayProducts = products || [];

    const getRandomRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);

    const handleProductClick = (id) => router.get(route("products.show", id));

    return (
        <>
            <HeroCarousel />
            <Categories />
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Text className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 ">
                    Just For You
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {displayProducts.map((product) => {
                        const priceInfo =
                            product.variants.find((attr) =>
                                parseInt(attr.price)
                            ) || {};
                        const ratingInfo =
                            product.variants.find((attr) => attr.rating) || {};

                        const price = priceInfo.price
                            ? parseInt(priceInfo.price)
                            : 0;
                        const originalPrice = priceInfo.original_price
                            ? parseInt(priceInfo.original_price)
                            : null;
                        const rating = ratingInfo.rating || getRandomRating();
                        const reviewCount =
                            ratingInfo.review_count ||
                            Math.floor(Math.random() * 100) + 5;

                        return (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleProductClick(product.id)}
                                className="cursor-pointer"
                            >
                                <Card
                                    withBorder
                                    shadow="sm"
                                    className="h-full flex flex-col border border-gray-200 transition-all duration-300"
                                >
                                    {product.featured_image && (
                                        <Card.Section className="p-2 sm:p-3 flex-1 flex items-center justify-center">
                                            <Image
                                                src={product.featured_image}
                                                height={60}
                                                alt={product.title}
                                                fit="contain"
                                                className="object-center"
                                            />
                                        </Card.Section>
                                    )}

                                    <div className="p-3 flex-0">
                                        <Text
                                            weight={600}
                                            className="text-sm sm:text-base mb-2 min-h-[44px] line-clamp-2 leading-snug"
                                        >
                                            {product.title}
                                        </Text>

                                        <Text className="text-xs sm:text-sm text-gray-500 ">
                                            {product.brand?.name || "Generic"} •{" "}
                                            {product.category?.title ||
                                                "Category"}
                                        </Text>

                                        <Group spacing="xs">
                                            <Text
                                                weight={700}
                                                className="text-base sm:text-lg text-red-600"
                                            >
                                                ৳{price.toLocaleString()}
                                            </Text>
                                            {originalPrice &&
                                                originalPrice > price && (
                                                    <Text className="text-xs sm:text-sm text-gray-400 line-through">
                                                        ৳
                                                        {originalPrice.toLocaleString()}
                                                    </Text>
                                                )}
                                            {priceInfo.discount && (
                                                <Badge
                                                    color="red"
                                                    variant="light"
                                                    size="sm"
                                                    className="font-semibold"
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
                                                size="sm"
                                                className="mr-1"
                                            />
                                            <Text className="text-sm text-yellow-600 font-semibold">
                                                {rating}
                                            </Text>
                                            <Text className="text-sm text-gray-400">
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
            <Newsletter />
            <Footer />
        </>
    );
};

ShoppingPage.layout = (page) => (
    <GuestLayout title="Products">{page}</GuestLayout>
);
export default ShoppingPage;
