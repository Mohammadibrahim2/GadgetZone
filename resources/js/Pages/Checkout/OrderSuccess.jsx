import { router } from "@inertiajs/react";
import { Paper, Title, Text, Group, Button, Center } from "@mantine/core";
import {
    IconCircleCheck,
    IconShoppingBag,
    IconHome,
    IconList,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
    const [trackCode, setTrackcode] = useState(null);
    useEffect(() => {
        const trackingInfo = localStorage.getItem("trackingInfo");
        if (trackingInfo) {
            const parsed = JSON.parse(trackingInfo);
            console.log("Parsed:", parsed);
            setTrackcode(parsed);
        }
    }, []);

    const handleViewOrder = () => {
        router.get(route("orders.viewOrder", trackCode.orderId));
    };

    const handleMyOrder = () => {
        router.get(route("orders.myOrder"), {
            trackingCode: trackCode.code,
            email,
        });
    };
    return (
        <Paper
            p="xl"
            radius="md"
            withBorder
            shadow="sm"
            style={{ maxWidth: 600, margin: "0 auto" }}
        >
            <Center>
                <IconCircleCheck size={80} className="text-lime-600" />
            </Center>
            <Title order={2} align="center" mt="md">
                Order Confirmed!
            </Title>
            <Text color="dimmed" align="center" mt="sm">
                Your order # has been placed successfully. We've sent a
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
                    onClick={handleViewOrder}
                    disabled={!trackCode}
                >
                    View Order
                </Button>
                <Button
                    variant="light"
                    leftIcon={<IconList size={18} />}
                    disabled={!trackCode}
                    onClick={() => handleMyOrder}
                >
                    My Orders
                </Button>
            </Group>
        </Paper>
    );
}
