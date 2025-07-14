import { Box, Title, Button, Group, Modal } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import SubCategoryForm from "./Form";
import MainLayout from "@/Layouts/MainLayout";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { useState } from "react";
import CategoryTable from "./Table";
import { router, usePage } from "@inertiajs/react";
import BrandTable from "./Table";
import ColorTable from "./Table";

const BrandIndex = () => {
    const { colors } = usePage().props;
    // const [opened, { open, close }] = useDisclosure(false);
    const [opened, setOpened] = useState(false);
    const handleSubmit = () => {
        router.get(route("colors.create"));
    };
    return (
        <Box className="w-full p-4">
            {/* Header section with proper alignment */}

            <div className="flex justify-between mb-8 px-4">
                <div>
                    <Title order={2} className="text-xl">
                        {" "}
                        Colors
                    </Title>
                    <Title order={6} color="dimmed" mt={4}>
                        Manage your colors
                    </Title>
                </div>
                <ButtonWithIcon
                    title="Add NEw"
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
            <ColorTable colors={colors} />
        </Box>
    );
};

BrandIndex.layout = (page) => (
    <MainLayout title="Colors" meta="Colors Management">
        {page}
    </MainLayout>
);

export default BrandIndex;
