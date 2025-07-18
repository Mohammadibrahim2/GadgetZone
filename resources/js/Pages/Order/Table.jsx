import { router } from "@inertiajs/react";
import {
    Table,
    Image,
    Badge,
    Group,
    Text,
    ActionIcon,
    Flex,
    Box,
    Select,
    Pagination,
    LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconCheck,
    IconEdit,
    IconEye,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { useState } from "react";

export default function OrderTable({ orders, searchQuery }) {
    const [sortedData, setSortedData] = useState(orders?.data || []);
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const filteredProducts = sortedData.filter((order) =>
        order?.created_at.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginatedOrders = filteredProducts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleEdit = (id) => {
        console.log(id);
    };

    const handleView = (id) => {
        console.log(id);
    };

    const handleDelete = (id) => {
        const confirm = window.confirm("Do you want to delete this order?");
        if (confirm) {
            setLoading(true);
            router.delete(route("orders.delete", id), {
                preserveScroll: true,
                onSuccess: () => {
                    setSortedData((prev) =>
                        prev.filter((order) => order.id !== id)
                    );
                    notifications.show({
                        title: "Success!",
                        message: "Order deleted successfully",
                        color: "green",
                        icon: <IconCheck size={18} />,
                        withCloseButton: true,
                    });
                },
                onError: () => {
                    notifications.show({
                        title: "Error",
                        message: "Failed to delete order",
                        color: "red",
                        icon: <IconX size={18} />,
                        withCloseButton: true,
                    });
                },
                onFinish: () => {
                    setLoading(false);
                },
            });
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: "md",
                padding: "md",
                position: "relative", // Needed for LoadingOverlay
            }}
        >
            <LoadingOverlay visible={loading} overlayBlur={2} />

            <Table
                striped
                highlightOnHover
                sx={{
                    "& tbody tr td": {
                        borderBottom: "1px solid #e9ecef",
                        verticalAlign: "middle",
                        textAlign: "left",
                        padding: "12px 16px",
                    },
                    "& thead tr th": {
                        fontWeight: 600,
                        textAlign: "left",
                        padding: "12px 16px",
                        backgroundColor: "#f8f9fa",
                    },
                }}
            >
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Shipping Cost</th>
                        <th>Payment Method</th>
                        <th>Ordered On</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.map((order) => (
                        <tr key={order?.id}>
                            <td>
                                <Text weight={500}>#{order?.id}</Text>
                            </td>
                            <td>
                                <Text style={{ textAlign: "left" }}>
                                    <Text weight={500}>
                                        {order?.customers?.name}
                                    </Text>
                                    <Text size="sm" color="dimmed">
                                        {order?.customers?.email}
                                    </Text>
                                    <Text size="sm" color="green">
                                        {order?.customers?.phone}
                                    </Text>
                                </Text>
                            </td>
                            <td>
                                <Text weight={600}>
                                    $
                                    {parseFloat(
                                        order?.total_amount || 0
                                    ).toFixed(2)}
                                </Text>
                            </td>
                            <td>
                                <Badge
                                    color={
                                        order?.payment_status === "paid"
                                            ? "green"
                                            : order?.payment_status === "unpaid"
                                            ? "red"
                                            : "orange"
                                    }
                                    variant="light"
                                >
                                    {order?.payment_status}
                                </Badge>
                            </td>
                            <td>
                                <Text size="sm">
                                    $
                                    {parseFloat(
                                        order?.shipping_cost || 0
                                    ).toFixed(2)}
                                </Text>
                            </td>
                            <td>
                                <Text size="sm" transform="capitalize">
                                    {order?.payment_method}
                                </Text>
                            </td>
                            <td>
                                <Text size="sm">{order?.created_at}</Text>
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Group spacing={4} position="center" noWrap>
                                    <ActionIcon
                                        color="green"
                                        onClick={() => handleView(order?.id)}
                                        title="View"
                                    >
                                        <IconEye size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="orange"
                                        onClick={() => handleEdit(order?.id)}
                                        title="Edit"
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="red"
                                        onClick={() => handleDelete(order?.id)}
                                        title="Delete"
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination Section */}
            <Flex justify="space-between" align="center" mt="md">
                <Text size="sm" color="dimmed">
                    Showing {paginatedOrders.length} of{" "}
                    {filteredProducts.length} Orders
                </Text>

                <Flex align="center" gap="md">
                    <Group spacing="xs">
                        <Text size="sm">Rows per page</Text>
                        <Select
                            value={rowsPerPage.toString()}
                            onChange={(value) =>
                                setRowsPerPage(parseInt(value))
                            }
                            data={["5", "10", "20", "50"]}
                            style={{ width: 80 }}
                        />
                    </Group>
                    <Pagination
                        value={currentPage}
                        onChange={setCurrentPage}
                        total={totalPages}
                        size="sm"
                    />
                </Flex>
            </Flex>
        </Box>
    );
}
