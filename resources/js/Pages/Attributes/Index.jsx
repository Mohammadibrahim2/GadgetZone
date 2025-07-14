import { Box, Title, Button, Group, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import SubCategoryForm from "./Form";
import MainLayout from "@/Layouts/MainLayout";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AttributeTable from "./Table";

const CategoryIndex = () => {
    const { attributes } = usePage().props;
    // const [opened, { open, close }] = useDisclosure(false);
    const [opened, setOpened] = useState(false);
    const handleSubmit = () => {
        router.get(route("attributes.create"));
    };
    return (
        <Box className="w-full p-4">
            {/* Header section with proper alignment */}

            <div className="flex justify-between mb-8 px-4">
                <div>
                    <Title order={2} className="text-xl">
                        {" "}
                        Variant Attributes
                    </Title>
                    <Title order={6} color="dimmed" mt={4}>
                        Manage your Attributes
                    </Title>
                </div>
                <ButtonWithIcon
                    title="Add New"
                    iconLeft={<IconPlus size={16} />}
                    variant="brand"
                    onClick={handleSubmit}
                    className="mr-6"
                />
            </div>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Authentication"
                centered
                zIndex={10000}
            >
                <h1>dhjhbahbhjabkjbf</h1>
            </Modal>
            <AttributeTable attributes={attributes} />
        </Box>
    );
};

CategoryIndex.layout = (page) => (
    <MainLayout title="Categories" meta="Category Management">
        {page}
    </MainLayout>
);

export default CategoryIndex;
