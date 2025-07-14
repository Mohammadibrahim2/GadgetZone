import MainLayout from "@/Layouts/MainLayout";
import {
    Table,
    Badge,
    ActionIcon,
    Group,
    Text,
    Menu,
    Pagination,
    Box,
} from "@mantine/core";
import {
    IconEdit,
    IconTrash,
    IconDots,
    IconEye,
    IconArrowsSort,
} from "@tabler/icons-react";
import { useState } from "react";

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
    const [sortBy, setSortBy] = useState(null);
    const [reverseSort, setReverseSort] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        if (!sortBy) return 0;

        if (a[sortBy] < b[sortBy]) return reverseSort ? 1 : -1;
        if (a[sortBy] > b[sortBy]) return reverseSort ? -1 : 1;
        return 0;
    });

    // Paginate products
    const paginatedProducts = sortedProducts.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleSort = (column) => {
        if (sortBy === column) {
            setReverseSort(!reverseSort);
        } else {
            setSortBy(column);
            setReverseSort(false);
        }
    };

    const StatusBadge = ({ status }) => {
        const color =
            {
                published: "green",
                draft: "yellow",
                archived: "red",
            }[status] || "gray";

        return (
            <Badge color={color} variant="light" radius="sm">
                {status}
            </Badge>
        );
    };

    return (
        <Box className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <Table striped highlightOnHover className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("name")}
                        >
                            <Group spacing="xs">
                                Product
                                <IconArrowsSort size={14} />
                            </Group>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("price")}
                        >
                            <Group spacing="xs">
                                Price
                                <IconArrowsSort size={14} />
                            </Group>
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("stock")}
                        >
                            <Group spacing="xs">
                                Stock
                                <IconArrowsSort size={14} />
                            </Group>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {paginatedProducts.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Group spacing="sm">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-md object-cover"
                                            src={
                                                product.image ||
                                                "/placeholder-product.jpg"
                                            }
                                            alt={product.name}
                                        />
                                    </div>
                                    <div>
                                        <Text className="text-sm font-medium text-gray-900">
                                            {product.name}
                                        </Text>
                                        <Text className="text-sm text-gray-500">
                                            SKU: {product.sku}
                                        </Text>
                                    </div>
                                </Group>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Text className="text-sm text-gray-900">
                                    {product.category?.name || "N/A"}
                                </Text>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Text className="text-sm text-gray-900 font-medium">
                                    ${product.price.toFixed(2)}
                                </Text>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Text
                                    className={`text-sm font-medium ${
                                        product.stock < 10
                                            ? "text-red-600"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {product.stock} in stock
                                </Text>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={product.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Group spacing={4} position="right">
                                    <ActionIcon
                                        color="blue"
                                        variant="light"
                                        onClick={() => onView(product.id)}
                                    >
                                        <IconEye size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        color="orange"
                                        variant="light"
                                        onClick={() => onEdit(product.id)}
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <Menu position="bottom-end" withinPortal>
                                        <Menu.Target>
                                            <ActionIcon variant="light">
                                                <IconDots size={16} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                icon={<IconTrash size={14} />}
                                                color="red"
                                                onClick={() =>
                                                    onDelete(product.id)
                                                }
                                            >
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {products.length > itemsPerPage && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <Pagination
                        total={Math.ceil(products.length / itemsPerPage)}
                        page={page}
                        onChange={setPage}
                        position="right"
                        className="justify-end"
                    />
                </div>
            )}
        </Box>
    );
};
ProductTable.layout = (page) => (
    <MainLayout title="Products">{page}</MainLayout>
);

export default ProductTable;
