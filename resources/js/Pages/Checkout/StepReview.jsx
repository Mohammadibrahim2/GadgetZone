import { useCart } from "@/hooks/Cart/CartContext";
import {
    Button,
    Group,
    Paper,
    Stack,
    Title,
    Text,
    Divider,
    Badge,
    Box,
    rem,
} from "@mantine/core";
import {
    IconArrowLeft,
    IconArrowRight,
    IconReceipt,
    IconTruck,
    IconCreditCard,
    IconMapPin,
} from "@tabler/icons-react";

export default function StepReview({ onNext, onBack }) {
    const { cart } = useCart();
    const orderSummary = {
        subtotal: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ),
        discount: 50.0,
        shipping: 0.0,
        // Calculate total based on the values above
        get total() {
            return this.subtotal - this.discount + this.shipping;
        },
    };

    return (
        <Paper p="xl" radius="lg" withBorder shadow="xs">
            <Stack gap="lg">
                <Group gap="sm">
                    <Title order={2} fw={600}>
                        📋 Order Review
                    </Title>
                </Group>

                <Divider />

                {/* Order Items */}
                <Paper p="md" radius="md" withBorder>
                    <Text fw={600} size="lg" mb="sm">
                        🛒 Your Items
                    </Text>
                    <Stack gap="xs">
                        {cart.map((item, index) => (
                            <Group key={index} justify="space-between">
                                <Text>
                                    {item.title} × {item.quantity}
                                </Text>
                                <Text fw={500}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </Text>
                            </Group>
                        ))}
                    </Stack>
                </Paper>

                {/* Shipping Information */}
                <Paper p="md" radius="md" withBorder>
                    <Group gap="sm" mb="sm">
                        <IconMapPin size={20} />
                        <Text fw={600} size="lg">
                            🚚 Shipping Details
                        </Text>
                    </Group>
                    <Text>{orderSummary.shippingAddress}</Text>
                    <Badge color="teal" variant="light" mt="sm">
                        <Group gap={4}>
                            <IconTruck size={14} />
                            Free Standard Shipping (3-5 business days)
                        </Group>
                    </Badge>
                </Paper>

                {/* Order Total Summary */}
                <Paper
                    p="md"
                    radius="md"
                    withBorder
                    bg="var(--mantine-color-blue-0)"
                >
                    <Stack gap="xs">
                        <Text fw={600} size="lg">
                            💰 Order Total
                        </Text>
                        <Divider />
                        <Group justify="space-between">
                            <Text>Subtotal:</Text>
                            <Text>${orderSummary.subtotal.toFixed(2)}</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text>Discount:</Text>
                            <Text c="green">
                                -${orderSummary.discount.toFixed(2)}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text>Shipping:</Text>
                            <Badge color="teal" variant="light">
                                FREE
                            </Badge>
                        </Group>
                        <Divider />
                        <Group justify="space-between">
                            <Text size="lg" fw={700}>
                                Total:
                            </Text>
                            <Text size="lg" fw={700}>
                                ${orderSummary.total.toFixed(2)}
                            </Text>
                        </Group>
                    </Stack>
                </Paper>

                <Group justify="space-between" mt="xl">
                    <Button
                        onClick={onBack}
                        leftSection={<IconArrowLeft size={18} />}
                        variant="outline"
                        size="md"
                    >
                        Back to Payment
                    </Button>
                    <Button
                        onClick={onNext}
                        rightSection={<IconArrowRight size={18} />}
                        size="md"
                        variant="gradient"
                        gradient={{ from: "green", to: "teal" }}
                    >
                        Confirm & Place Order
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
}
