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
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ProductsTable({
    products,

    handleDelete,
    searchQuery,
}) {
    const [sortedData, setSortedData] = useState(products.data);
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter products based on search query
    const filteredProducts = sortedData.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const handleEdit = (id) => {
        console.log(id);
        router.get(route("products.edit", id));
    };
    const handleView = (id) => {
        console.log(id);
        router.get(route("products.show", id));
    };
    return (
        <Box
            sx={{ backgroundColor: "white", borderRadius: "md", padding: "md" }}
        >
            {/* Products Table */}
            <Table
                striped
                highlightOnHover
                sx={{
                    "& tbody tr td": {
                        borderBottom: "1px solid #e9ecef",
                        textAlign: "center",
                        verticalAlign: "middle",
                    },
                    "& thead tr th": {
                        textAlign: "center",
                        fontWeight: 600,
                    },
                }}
            >
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <Text weight={500}>{product.sku}</Text>
                            </td>
                            <td>
                                <Group spacing="sm" position="center">
                                    <Image
                                        src={product.featured_image}
                                        h={70}
                                        w="auto"
                                        radius="sm"
                                        alt={product.title}
                                        withPlaceholder
                                    />
                                    <Text weight={500}>{product.title}</Text>
                                </Group>
                            </td>
                            <td>
                                <Badge color="blue" variant="light">
                                    {product.category?.title || "N/A"}
                                </Badge>
                            </td>
                            <td>
                                {product.brand && (
                                    <Text size="sm">{product.brand.name}</Text>
                                )}
                            </td>
                            <td>
                                <Text weight={600}>
                                    ${product.variants[0]?.price || "N/A"}
                                </Text>
                            </td>
                            <td>
                                <Badge
                                    color={
                                        product.variants[0]?.stock > 0
                                            ? "green"
                                            : "red"
                                    }
                                    variant="light"
                                >
                                    {product.variants[0]?.stock || 0}
                                </Badge>
                            </td>
                            <td>
                                <Badge
                                    color={
                                        product.status === "published"
                                            ? "green"
                                            : product.status === "draft"
                                            ? "orange"
                                            : "gray"
                                    }
                                    variant="light"
                                >
                                    {product.status}
                                </Badge>
                            </td>
                            <td>
                                <Text size="sm">
                                    {product.created_by || "System"}
                                </Text>
                            </td>
                            <td>
                                <Group spacing={4} position="center">
                                    <ActionIcon
                                        color="orange"
                                        onClick={() => handleView(product.id)}
                                    >
                                        <IconEye size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="green"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="red"
                                        onClick={() => handleDelete(product.id)}
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
                    Showing {paginatedProducts.length} of{" "}
                    {filteredProducts.length} products
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
