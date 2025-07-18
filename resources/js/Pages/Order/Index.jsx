import MainLayout from "@/Layouts/MainLayout";
import ProductTable from "./Table";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { Box, Button, Chip, Flex, Group, Text, Title } from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import Modal from "@/Components/Modal";
import { router, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import OrderTable from "./Table";
import PaymentStatusChip from "./PaymentStatusChip";

const Index = () => {
    const { orders } = usePage().props;
    console.log(orders.data);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSubmit = () => {
        // router.get(route("Orders.create"));
    };

    return (
        <Box className="w-full p-4">
            <Flex justify="space-between" align="center" mb="md">
                <div>
                    <Text size="xl" weight={600}>
                        Order List
                    </Text>
                    <Text size="sm" color="dimmed">
                        Manage your orders
                    </Text>
                </div>
                {/* <PaymentStatusChip status={"unpaid"} />
                <Box mb="md">
                    <Chip.Group
                    // multiple
                    // value={selectedStatuses}
                    // onChange={setSelectedStatuses}
                    >
                        <Group spacing="sm">
                            <Text size="sm" weight={500}></Text>
                            <Chip value="paid" color="green" variant="filled">
                                Paid
                            </Chip>
                            <Chip value="unpaid" color="red" variant="filled">
                                Unpaid
                            </Chip>
                            <Chip
                                value="pending"
                                color="orange"
                                variant="filled"
                            >
                                Pending
                            </Chip>
                            <Chip
                                value="cash_on_delivery"
                                color="blue"
                                variant="filled"
                            >
                                COD
                            </Chip>
                        </Group>
                    </Chip.Group>
                </Box> */}
                <Button variant="filled" color="orange" onClick={handleSubmit}>
                    <IconPlus size={16} /> Add Order
                </Button>
            </Flex>

            {/* Search and Filter Section */}
            <Flex gap="md" mb="md">
                <TextInput
                    placeholder="Search orders..."
                    icon={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    sx={{ flex: 1 }}
                />
                <Button leftIcon={<IconFilter size={16} />} variant="outline">
                    Filters
                </Button>
            </Flex>
            {/* 
            <ButtonWithIcon
                title="Add Product"
                iconLeft={<IconPlus size={16} />}
                variant="brand"
                className="mr-6"
            /> */}

            <OrderTable orders={orders} searchQuery={searchQuery} />
        </Box>
    );
};

Index.layout = (page) => <MainLayout title="Orders">{page}</MainLayout>;
export default Index;
