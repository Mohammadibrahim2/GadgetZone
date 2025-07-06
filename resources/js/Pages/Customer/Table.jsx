import {
    Paper,
    Table,
    Badge,
    ActionIcon,
    TextInput,
    Group,
    Button,
} from "@mantine/core";
import {
    IconEdit,
    IconTrash,
    IconSearch,
    IconChevronDown,
} from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { useState } from "react";

const CategoryTable = () => {
    const theme = useMantineTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const subCategories = [
        {
            id: 1,
            image: "",
            name: "kolihj",
            email: "Computers@mail.com",
            phone: "08135678",
            description: "Efficient Productivity",
            status: "Active",
        },
        {
            id: 1,
            image: "",
            name: "kolihj",
            email: "Computers@mail.com",
            phone: "08135678",
            description: "Efficient Productivity",
            status: "Active",
        },
        {
            id: 1,
            image: "",
            name: "kolihj",
            email: "Computers@mail.com",
            phone: "08135678",
            description: "Efficient Productivity",
            status: "Active",
        },
        {
            id: 1,
            image: "",
            name: "kolihj",
            email: "Computers@mail.com",
            phone: "08135678",
            description: "Efficient Productivity",
            status: "Active",
        },
    ];

    const filteredData = subCategories.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                    Customer
                                </th>
                                <th style={{ padding: "16px 24px" }}>Email</th>
                                <th style={{ padding: "16px 24px" }}>Code</th>
                                <th style={{ padding: "16px 24px" }}>Phone</th>
                                <th style={{ padding: "16px 24px" }}>Status</th>
                                <th style={{ padding: "16px 24px" }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
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
                                        {item.name}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item.email}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item.code}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        {item.phone}
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        <Badge
                                            color={
                                                item.status === "Active"
                                                    ? "green"
                                                    : "gray"
                                            }
                                            variant="light"
                                            radius="sm"
                                            style={{ textTransform: "none" }}
                                        >
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td style={{ padding: "12px 24px" }}>
                                        <Group spacing={4}>
                                            <ActionIcon
                                                variant="outline"
                                                color="blue"
                                                size="md"
                                            >
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                            <ActionIcon
                                                variant="outline"
                                                color="red"
                                                size="md"
                                            >
                                                <IconTrash size={16} />
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
