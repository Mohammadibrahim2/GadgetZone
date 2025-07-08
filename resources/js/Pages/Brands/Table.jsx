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

const BrandTable = ({ brands }) => {
    const theme = useMantineTheme();
    const [searchQuery, setSearchQuery] = useState("");

    console.log(brands, "brands");

    const handleEdit = (id) => {
        console.log(id);
        const response = router.get(route("brands.edit", { id: id }), {
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
        router.delete(route("brands.delete", { id: id }), {
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
                            Brand
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
                                <th style={{ padding: "16px 24px" }}>Brand</th>
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
                            {brands?.data?.map((item) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderBottom: `1px solid ${theme.colors.gray[1]}`,
                                    }}
                                >
                                    <td style={{ padding: "12px 24px" }}>
                                        <Group spacing="md">
                                            <div className="flex flex-row items-center gap-x-3">
                                                <img
                                                    src={item?.logo}
                                                    alt={item?.name}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 6,
                                                        objectFit: "cover",
                                                        backgroundColor:
                                                            theme.colors
                                                                .gray[2],
                                                    }}
                                                />
                                                <span
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {item?.name}
                                                </span>
                                            </div>
                                        </Group>
                                    </td>

                                    <td style={{ padding: "12px 24px" }}>
                                        {item?.created_at}
                                    </td>

                                    <td style={{ padding: "12px 24px" }}>
                                        <Badge
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
                                                className="py-2 px-2 shadow"
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
                                                className="py-2 px-2 shadow"
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

export default BrandTable;
