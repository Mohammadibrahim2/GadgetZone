import React from "react";
import {
    Paper,
    Title,
    Text,
    Group,
    Badge,
    Divider,
    Stack,
    Button,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { data } from "autoprefixer";
import axios from "axios";
import GuestLayout from "@/Layouts/GuestLayout";
const ViewOrder = () => {
    const { order } = usePage().props;

    // order = {
    //   customer_id, payment_method, transaction_id, payment_status,
    //   order_status, total_amount, discount, shipping_cost, note
    // }

    const handleBack = () => {
        router.get(route("home"));
    };

    // Status color helper
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "paid":
                return "green";

            case "unpaid":
                return "red";
            default:
                return "gray";
        }
    };
    const handleMyOrder = (id) => {
        console.log(id);

        router.get(route("orders.myOrder", id));
    };
    return (
        <Paper
            p="xl"
            radius="md"
            shadow="sm"
            withBorder
            style={{ maxWidth: 700, margin: "2rem auto" }}
        >
            <Title order={2} mb="xl" align="center">
                Order Details
            </Title>

            <Stack spacing="sm">
                <Group position="apart">
                    <Text weight={600}>Customer :</Text>
                    <Text>{order?.data.customers.name}</Text>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Payment Method:</Text>
                    <Text>{order.data.payment_method}</Text>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Transaction ID:</Text>
                    <Text>{order.data.transaction_id || "N/A"}</Text>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Payment Status:</Text>
                    <Badge
                        color={getStatusColor(order.data.payment_status)}
                        variant="filled"
                    >
                        {order.data.payment_status}
                    </Badge>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Order Status:</Text>
                    {/* <Badge
                        color={getStatusColor(order.data.order_status)}
                        variant="filled"
                    >
                        {order.data.order_status}
                    </Badge> */}
                </Group>

                <Divider />

                <Group position="apart">
                    <Text weight={600}>Total Amount:</Text>
                    <Text>{order.data.total_amount} ৳</Text>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Discount:</Text>
                    <Text>
                        {order.data.discount
                            ? `${order.data.discount} ৳`
                            : "0 ৳"}
                    </Text>
                </Group>

                <Group position="apart">
                    <Text weight={600}>Shipping Cost:</Text>
                    <Text>
                        {order.data.shipping_cost
                            ? `${order.data.shipping_cost} ৳`
                            : "0 ৳"}
                    </Text>
                </Group>

                <Divider />

                <Group direction="column" spacing="xs">
                    <Text weight={600}>Note:</Text>
                    <Text color="dimmed">
                        {order.data.note || "No additional notes."}
                    </Text>
                </Group>
                <Group position="apart" className="mb-md">
                    {/* Back Button */}
                    <Button variant="subtle" onClick={handleBack}>
                        <IconArrowLeft size={18} /> Back
                    </Button>

                    {/* My Order Button */}
                    <Button
                        color="green"
                        variant="subtle"
                        onClick={() => handleMyOrder(order.data.id)}
                    >
                        My Order <IconArrowRight size={18} />
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
};
ViewOrder.layout = (page) => <GuestLayout>{page}</GuestLayout>;
export default ViewOrder;
