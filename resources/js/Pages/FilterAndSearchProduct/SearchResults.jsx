import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useSearch } from "@/hooks/Search/SearchContext";
import { Card, Text, Group, Badge, Image, Rating } from "@mantine/core";
import { motion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import { Footer } from "../Home/Footer/Footer";

const SearchProducts = ({}) => {
    const { products, count } = usePage().props;

    console.log(products.data);
    const displayProducts = products.data || [];

    const getRandomRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);

    const handleProductClick = (id) => router.get(route("products.show", id));

    const { search } = useSearch();
    return (
        <>
            <div className="px-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <span className="text-xl sm:text-3xl  text-gray-800 py-4 ">
                    Search Results {count}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
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
                                    //shadow="sm"
                                    className="h-full flex flex-col border border-white transition-all duration-300"
                                >
                                    {product.featured_image && (
                                        <Card.Section className="p-2 sm:p-3 flex-1 flex items-center justify-center">
                                            <Image
                                                src={product.featured_image}
                                                //  height={60}
                                                alt={product.title}
                                                fit="contain"
                                                className="object-center h-[200px] w-[200px] "
                                            />
                                        </Card.Section>
                                    )}

                                    <div className=" flex-0  ">
                                        <Text className="text-md  font-semibold ">
                                            {product.title}
                                        </Text>

                                        <Group spacing="">
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

            <Footer />
        </>
    );
};

SearchProducts.layout = (page) => <GuestLayout>{page}</GuestLayout>;

export default SearchProducts;
