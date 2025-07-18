import { Paper, Title, Text, Group, Button, Center } from "@mantine/core";
import {
    IconCircleCheck,
    IconShoppingBag,
    IconHome,
    IconList,
} from "@tabler/icons-react";

export default function OrderSuccess({ orderId }) {
    return (
        <Paper
            p="xl"
            radius="md"
            withBorder
            shadow="sm"
            style={{ maxWidth: 600, margin: "0 auto" }}
        >
            <Center>
                <IconCircleCheck size={80} color="green" />
            </Center>
            <Title order={2} align="center" mt="md">
                Order Confirmed!
            </Title>
            <Text color="dimmed" align="center" mt="sm">
                Your order #{orderId} has been placed successfully. We've sent a
                confirmation to your email.
            </Text>

            <Group position="center" mt="xl">
                <Button
                    leftIcon={<IconHome size={18} />}
                    onClick={() => (window.location.href = "/")}
                >
                    Back to Home
                </Button>
                <Button
                    variant="outline"
                    leftIcon={<IconShoppingBag size={18} />}
                    onClick={() =>
                        (window.location.href = `/orders/${orderId}`)
                    }
                >
                    View Order
                </Button>
                <Button
                    variant="light"
                    leftIcon={<IconList size={18} />}
                    onClick={() => (window.location.href = "/orders")}
                >
                    My Orders
                </Button>
            </Group>
        </Paper>
    );
}
