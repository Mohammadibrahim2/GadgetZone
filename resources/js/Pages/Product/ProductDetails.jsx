import { useCart } from "@/hooks/Cart/CartContext";
import {
    Stack,
    Group,
    Title,
    Text,
    Badge,
    Divider,
    Button,
    NumberInput,
    Box,
    Rating,
    rem,
    Select,
    Table,
    ActionIcon,
} from "@mantine/core";
import { IconHeart, IconShare, IconShoppingCart } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function ProductDetails({
    product,
    activeImage,
    selectedVariant,
    quantity,
    onQuantityChange,
}) {
    const { addToCart } = useCart();
    const discountPercentage = Math.round(
        ((selectedVariant?.originalPrice - selectedVariant?.price) /
            selectedVariant?.originalPrice) *
            100
    );

    const attributeItems = product.attributes.map((attri) => ({
        label: attri.name,
        value: attri.values.map((v) => v.value).join("/ "),
    }));
    // Product attributes data
    const productAttributes = [
        {
            label: "Brand",
            value: product.brand?.name || "No Brand",
        },
        ...attributeItems,
    ];

    const handleCart = () => {
        const item = {
            product_id: product.id,
            variant_id: selectedVariant.id,
            title: product.title,
            image: activeImage || selectedVariant.images[0]?.path,
            attributes: selectedVariant.attribute_values,
            price: selectedVariant.price,
            original_price: selectedVariant.originalPrice,
            quantity: quantity,
            color: selectedVariant?.color?.name || "White",
            stock: selectedVariant?.stock || 0,
        };

        addToCart(item);
    };

    return (
        <Stack gap="md">
            <Group justify="space-between" align="flex-start">
                <Stack gap="xs">
                    <Title order={2} fw={600} lineClamp={2}>
                        {product.title}
                    </Title>
                    <Text c="dimmed">{product.category?.title}</Text>
                </Stack>
                <Group>
                    <ActionIcon variant="outline" size="lg" color="gray">
                        <IconHeart color="red" />
                    </ActionIcon>
                    <ActionIcon variant="outline" size="lg" color="gray">
                        <IconShare color="blue" />
                    </ActionIcon>
                </Group>
            </Group>

            <Group gap="xs">
                <Rating value={4.22} fractions={2} readOnly />
                <Text size="sm" c="dimmed">
                    (422 ratings)
                </Text>
                <Text size="sm" c="blue">
                    Answered Questions
                </Text>
            </Group>

            <Divider />

            <Group align="flex-end" gap={rem(4)}>
                <Text size="xl" fw={700}>
                    ৳{selectedVariant?.price || product.price}
                </Text>
                {selectedVariant?.originalPrice && (
                    <>
                        <Text size="md" c="dimmed" td="line-through">
                            ৳{selectedVariant.originalPrice}
                        </Text>
                        <Badge color="red" size="lg">
                            {discountPercentage}% OFF
                        </Badge>
                    </>
                )}
            </Group>

            <Divider />

            {/* Product Attributes Section */}
            {/* <Box>
                <Text fw={600} mb="sm">
                    Product Details
                </Text>
                <Table withRowBorders={false}>
                    <Table.Tbody>
                        {productAttributes.map((attr, index) => (
                            <Table.Tr key={index}>
                                <Table.Td w="40%" style={{ fontWeight: 500 }}>
                                    {attr.label}
                                </Table.Td>
                                <Table.Td>{attr.value}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Box> */}

            <Divider />

            {/* Variant Selection */}
            <Stack gap="sm">
                <Group grow>
                    <Stack gap="xs">
                        <Text fw={500}>Color Family</Text>
                        <Text>{selectedVariant?.color?.name || "White"}</Text>
                    </Stack>
                    <Stack gap="xs">
                        <Text fw={500}>Size</Text>
                        <Select
                            data={["S", "M", "L", "XL", "XXL"]}
                            defaultValue="M"
                            allowDeselect={false}
                        />
                    </Stack>
                </Group>

                <Stack gap="xs">
                    <Text fw={500}>Quantity</Text>
                    <NumberInput
                        value={quantity}
                        onChange={onQuantityChange}
                        min={1}
                        max={selectedVariant?.stock || 100}
                        size="md"
                    />
                </Stack>
            </Stack>

            <Group grow mt="md">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        leftSection={<IconShoppingCart size={18} />}
                        color="orange"
                        size="md"
                        radius="xs"
                        fullWidth
                        onClick={() => handleCart()}
                    >
                        Add to Cart
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button size="md" radius="xs" fullWidth variant="outline">
                        Buy Now
                    </Button>
                </motion.div>
            </Group>

            <Divider />

            {/* Delivery Information */}
            <Box>
                <Text fw={600} mb="xs">
                    Delivery Options
                </Text>
                <Text size="sm">
                    Dhaka, Dhaka North, Banani Road No. 12 - 19
                </Text>
                <Text size="sm" mt={4}>
                    Standard Delivery: Guaranteed by 17:20 Jul
                </Text>
                <Text size="sm" c="green">
                    Cash on Delivery Available
                </Text>
            </Box>

            <Divider />

            {/* Return Policy */}
            <Box>
                <Text fw={600} mb="xs">
                    Return & Warranty
                </Text>
                <Text size="sm">Change of Mind: 7 Day Return</Text>
                <Text size="sm">Warranty not available</Text>
            </Box>

            <Divider />

            {/* Seller Information */}
            <Box>
                <Text fw={600} mb="xs">
                    Sold by
                </Text>
                <Text size="sm" fw={500}>
                    CHANDNI FASHION (DK)
                </Text>
                <Text size="sm">Positive Seller Ratings</Text>
                <Text size="sm">Ship on Time</Text>
                <Button variant="outline" size="sm" mt="sm" radius="xs">
                    Chat Now
                </Button>
                <Text size="sm" mt={4}>
                    Chat Response Rate: 60%
                </Text>
            </Box>
        </Stack>
    );
}
