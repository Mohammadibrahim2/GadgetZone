import { Box, Title, Button, Group, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import SubCategoryForm from "./Form";
import MainLayout from "@/Layouts/MainLayout";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { useState } from "react";
import CategoryTable from "./Table";
import { router, usePage } from "@inertiajs/react";
import CustomerTable from "./Table";

const CategoryIndex = () => {
    const [opened, { open, close }] = useDisclosure(false);
    //const [opened, setOpened] = useState(false);
    // const handleSubmit = () => {
    //     router.get(route("categories.create"));
    // };
    const { customers } = usePage().props;
    console.log(customers);
    return (
        <Box className="w-full p-4">
            {/* Header section with proper alignment */}

            <div className="flex justify-between mb-8 px-4">
                <div>
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="Authentication"
                        centered
                        zIndex={9999} // ✅ উচ্চতর z-index দিন
                        withinPortal={true}
                    >
                        <h1>dhjhbahbhjabkjbf</h1>
                    </Modal>
                    <Title order={2} className="text-xl">
                        {" "}
                        Customers
                    </Title>
                    <Title order={6} color="dimmed" mt={4}>
                        Manage your Customer
                    </Title>
                </div>
                <ButtonWithIcon
                    title="Add new"
                    iconLeft={<IconPlus size={16} />}
                    variant="brand"
                    onClick={open}
                    className="mr-6"
                />
            </div>

            <CustomerTable customers={customers} />
        </Box>
    );
};

CategoryIndex.layout = (page) => (
    <MainLayout title="Categories" meta="Category Management">
        {page}
    </MainLayout>
);

export default CategoryIndex;
