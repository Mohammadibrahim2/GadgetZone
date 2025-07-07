import {
    Paper,
    Table,
    Badge,
    ActionIcon,
    TextInput,
    Group,
    Button,
    Space,
} from "@mantine/core";
import {
    IconEdit,
    IconTrash,
    IconSearch,
    IconChevronDown,
    IconCheck,
} from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";

const CategoryTable = ({ categories }) => {
    const theme = useMantineTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const subCategories = [
        {
            id: 1,
            image: "",
            name: "Laptop",
            category: "Computers",
            code: "CT001",
            description: "Efficient Productivity",
            status: "Active",
        },
        {
            id: 2,
            image: "",
            name: "Desktop",
            category: "Computers",
            code: "CT002",
            description: "Compact Design",
            status: "Active",
        },
        {
            id: 3,
            image: "",
            name: "Sneakers",
            category: "Store",
            code: "CT003",
            description: "Dynamic Clip",
            status: "Active",
        },
        {
            id: 4,
            image: "",
            name: "Formals",
            category: "Store",
            code: "CT004",
            description: "Stylish Combret",
            status: "Active",
        },
        {
            id: 5,
            image: "",
            name: "Wearables",
            category: "Electronics",
            code: "CT005",
            description: "Soundless Connectivity",
            status: "Inactive",
        },
    ];

    console.log(categories, "categories");
    const filteredData = subCategories.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (id) => {
        console.log(id);
        const response = router.get(route("categories.edit", id), {
            onSuccess: () => {
                notifications.show({
                    title: "Success!",
                    message: "Category created successfully",
                    color: "teal",
                    icon: <IconCheck size={18} />,
                    withCloseButton: true,
                });
            },
        });
    };
    const handleDelete = (id) => {
        router.delete(route("categories.delete", id), {
            onSuccess: () => {
                notifications.show({
                    title: "Success!",
                    message: "Category deleted successfully",
                    color: "teal",
                    icon: <IconCheck size={18} />,
                    withCloseButton: true,
                });
            },
        });
    };
    return (
        <>
            <Paper withBorder p="md" mb="md" radius="md">
                <Group position="apart">
                    <TextInput
                        placeholder="Search sub categories..."
                        icon={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.currentTarget.value)}
                        style={{ width: "100%", maxWidth: 300 }}
                    />
                    <Group>
                        <Button
                            variant="outline"
                            rightIcon={<IconChevronDown size={16} />}
                        >
                            Category
                        </Button>
                        <Button
                            variant="outline"
                            rightIcon={<IconChevronDown size={16} />}
                        >
                            Status
                        </Button>
                    </Group>
                </Group>
            </Paper>

            <Paper
                withBorder
                radius="md"
                shadow="sm"
                style={{ overflow: "hidden" }}
            >
                <div style={{ overflowX: "auto" }}>
                    <Table
                        striped
                        highlightOnHover
                        verticalSpacing="md"
                        fontSize="sm"
                    >
                        <thead
                            style={{
                                backgroundColor: theme.colors.gray[0],
                                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                            }}
                        >
                            <tr>
                                <th style={{ padding: "16px 24px" }}>Image</th>
                                <th style={{ padding: "16px 24px" }}>
                                    Category
                                </th>
                                <th style={{ padding: "16px 24px" }}>
                                    Description
                                </th>
                                <th style={{ padding: "16px 24px" }}>
                                    Category Slug
                                </th>
                                <th style={{ padding: "16px 24px" }}>
                                    Created At
                                </th>
                                <th style={{ padding: "16px 24px" }}>Status</th>
                                <th style={{ padding: "16px 24px" }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.data?.map((item) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderBottom: `1px solid ${theme.colors.gray[1]}`,
                                    }}
                                >
                                    <td style={{ padding: "12px 24px" }}>
                                        <div
                                            style={{
                                                width: 40,
                                                height: 40,
                                                backgroundColor:
                                                    theme.colors.gray[2],
                                                borderRadius: 4,
                                            }}
                                        ></div>
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px 24px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item?.title}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item?.description}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item?.slug}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item?.created_at}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        <Badge
                                            //variant="light"
                                            radius="sm"
                                            className={`${
                                                item?.status === "draft"
                                                    ? "text-gray-500 capitalize"
                                                    : "text-green-600 dark:text-green-500 capitalize"
                                            }`}
                                        >
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Group justify="space-between" grow>
                                            <ActionIcon
                                                variant="outline"
                                                className=" py-2 px-2 shadow "
                                                size="md"
                                                onClick={() =>
                                                    handleEdit(item?.id)
                                                }
                                            >
                                                <IconEdit size={20} />
                                            </ActionIcon>

                                            <ActionIcon
                                                variant="filled"
                                                size="md"
                                                className=" py-2 px-2 shadow "
                                                onClick={() =>
                                                    handleDelete(item?.id)
                                                }
                                            >
                                                <IconTrash size={20} />
                                            </ActionIcon>
                                        </Group>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Paper>
        </>
    );
};

export default CategoryTable;
