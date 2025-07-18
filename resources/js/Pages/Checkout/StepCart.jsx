import { useCart } from "@/hooks/Cart/CartContext";
import {
    Button,
    Table,
    Group,
    TextInput,
    Paper,
    Stack,
    Title,
    Text,
    Divider,
    Badge,
    ActionIcon,
    NumberInput,
    rem,
    Image,
    Box,
} from "@mantine/core";
import {
    IconArrowRight,
    IconTrash,
    IconDiscount2,
    IconShoppingCart,
    IconReceipt2,
    IconPhoto,
} from "@tabler/icons-react";

export default function StepCart({ onNext }) {
    const { cart } = useCart();

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = 50;
    const shipping = 0;
    const total = subtotal - discount + shipping;

    return (
        <Paper p="xl" radius="lg" withBorder shadow="xs">
            <Stack gap="lg">
                <Group gap="sm">
                    <IconShoppingCart
                        size={24}
                        color="var(--mantine-color-green-6)"
                    />
                    <Title order={2} fw={600}>
                        Your Shopping Cart ({cart.length}{" "}
                        {cart.length === 1 ? "item" : "items"})
                    </Title>
                </Group>

                <Divider />

                <Table verticalSpacing="sm" horizontalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Product</Table.Th>
                            <Table.Th ta="right">Price</Table.Th>
                            <Table.Th ta="center">Quantity</Table.Th>
                            <Table.Th ta="right">Subtotal</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {cart.map((item) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>
                                    <Group
                                        gap="md"
                                        wrap="nowrap"
                                        align="center"
                                    >
                                        <Box
                                            style={{
                                                width: rem(80),
                                                height: rem(80),
                                                position: "relative",
                                                backgroundColor:
                                                    "var(--mantine-color-gray-1)",
                                                borderRadius:
                                                    "var(--mantine-radius-xs)",
                                            }}
                                        >
                                            <Image
                                                src={item.image}
                                                width="100%"
                                                height="100%"
                                                fit="contain"
                                                radius="xs"
                                                style={{
                                                    objectFit: "contain",
                                                    padding: rem(4),
                                                }}
                                                placeholder={
                                                    <Box
                                                        w="100%"
                                                        h="100%"
                                                        display="flex"
                                                        style={{
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            backgroundColor:
                                                                "var(--mantine-color-gray-2)",
                                                        }}
                                                    >
                                                        <IconPhoto
                                                            size={24}
                                                            color="gray"
                                                        />
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                        <Text
                                            fw={500}
                                            lineClamp={2}
                                            style={{
                                                maxWidth: rem(200),
                                                minWidth: rem(120),
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td ta="right">
                                    ${parseFloat(item.price).toFixed(2)}
                                </Table.Td>
                                <Table.Td ta="center">
                                    <NumberInput
                                        value={item.quantity}
                                        min={1}
                                        max={10}
                                        size="xs"
                                        style={{ width: rem(70) }}
                                    />
                                </Table.Td>
                                <Table.Td ta="right" fw={600}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Table.Td>
                                <Table.Td>
                                    <ActionIcon
                                        variant="subtle"
                                        color="red"
                                        size="sm"
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                {/* Rest of your component remains the same */}
                <Group justify="space-between" mt="md">
                    <TextInput
                        placeholder="Enter coupon code"
                        leftSection={<IconDiscount2 size={16} />}
                        style={{ width: rem(250) }}
                        size="sm"
                    />
                    <Button
                        variant="light"
                        color="gray"
                        leftSection={<IconDiscount2 size={16} />}
                        size="sm"
                    >
                        Apply Coupon
                    </Button>
                </Group>

                <Paper p="md" radius="md" withBorder mt="xl">
                    <Stack gap="xs">
                        <Title order={4} fw={600}>
                            <IconReceipt2
                                size={18}
                                style={{ marginRight: rem(6) }}
                            />
                            Order Summary
                        </Title>
                        <Divider />
                        <Group justify="space-between" gap="xs">
                            <Text c="dimmed" size="sm">
                                Subtotal:
                            </Text>
                            <Text fw={500} size="sm">
                                ${subtotal.toFixed(2)}
                            </Text>
                        </Group>
                        <Group justify="space-between" gap="xs">
                            <Text c="dimmed" size="sm">
                                Discount:
                            </Text>
                            <Text fw={500} c="green" size="sm">
                                -${discount.toFixed(2)}
                            </Text>
                        </Group>
                        <Group justify="space-between" gap="xs">
                            <Text c="dimmed" size="sm">
                                Shipping:
                            </Text>
                            <Badge color="teal" variant="light" size="sm">
                                FREE
                            </Badge>
                        </Group>
                        <Divider />
                        <Group justify="space-between">
                            <Text fw={700}>Total:</Text>
                            <Text fw={700}>${total.toFixed(2)}</Text>
                        </Group>
                    </Stack>
                </Paper>

                <Group justify="flex-end" mt="xl">
                    <Button
                        onClick={onNext}
                        rightSection={<IconArrowRight size={16} />}
                        size="sm"
                        variant="gradient"
                        gradient={{ from: "green", to: "teal" }}
                    >
                        Proceed to Checkout
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
}
