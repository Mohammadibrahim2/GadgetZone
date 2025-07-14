import MainLayout from "@/Layouts/MainLayout";
import ProductTable from "./Table";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { Box, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";

const Index = () => {
    const handleSubmit = () => {
        router.get(route("products.create"));
    };
    return (
        <Box className="w-full p-4">
            {/* Header section with proper alignment */}

            <div className="flex justify-between mb-8 px-4">
                <div>
                    <Title order={2} className="text-xl">
                        {" "}
                        Product
                    </Title>
                    <Title order={6} color="dimmed" mt={4}>
                        Manage your Products
                    </Title>
                </div>
                <ButtonWithIcon
                    title="Add Product"
                    iconLeft={<IconPlus size={16} />}
                    variant="brand"
                    onClick={handleSubmit}
                    className="mr-6"
                />
            </div>

            {/* <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Authentication"
                centered
                zIndex={10000}
            >
                <h1>dhjhbahbhjabkjbf</h1>
            </Modal> */}
            {/* //  <ProductTable /> */}
        </Box>
    );
};

Index.layout = (page) => <MainLayout title="Product">{page}</MainLayout>;
export default Index;
