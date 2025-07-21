import {
    Badge,
    Button,
    Card,
    Title,
    Text,
    Grid,
    Group,
    Image,
} from "@mantine/core";
import React from "react";
import { motion } from "framer-motion";
const ProductCard = ({ isMobile, products, renderStars }) => {
    return (
        <>
            <Grid.Col span={isMobile ? 12 : 9}>
                <div className="flex justify-between items-center mb-6">
                    <Title order={2} className="text-black font-bold">
                        PRODUCTS
                    </Title>
                    <Text className="text-gray-500">12 items</Text>
                </div>

                <Grid gutter="lg">
                    {products.map((product, index) => (
                        <Grid.Col
                            key={product.title}
                            span={isMobile ? 12 : 6}
                            lg={4}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    className="h-full bg-white"
                                >
                                    <Card.Section>
                                        <Image
                                            src={product?.featured_image}
                                            height={200}
                                            alt={product?.title}
                                            fit="cover"
                                            withPlaceholder
                                        />
                                    </Card.Section>

                                    <Group position="apart" className="mt-4">
                                        <Text
                                            weight={600}
                                            className="text-black"
                                        >
                                            {product?.title}
                                        </Text>
                                        <Badge color="orange" variant="light">
                                            {/* {product.color} */}
                                        </Badge>
                                    </Group>

                                    {/* <Group position="apart" className="mt-2">
                                        <Text className="text-orange-500 font-bold">
                                            {typeof product.price === "number"
                                                ? `$${product.price.toFixed(2)}`
                                                : `$${product.price.min} - $${product.price.max}`}
                                        </Text>
                                        {renderStars(product.rating)}
                                    </Group> */}

                                    <Button
                                        variant="light"
                                        color="orange"
                                        fullWidth
                                        className="mt-4"
                                        radius="md"
                                    >
                                        Add to Cart
                                    </Button>
                                </Card>
                            </motion.div>
                        </Grid.Col>
                    ))}
                </Grid>
            </Grid.Col>
        </>
    );
};
export default ProductCard;
