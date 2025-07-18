import MainLayout from "@/Layouts/MainLayout";
import ProductTable from "./Table";
import ButtonWithIcon from "@/Components/button/ButtonWithIcon";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { IconFilter, IconPlus, IconSearch } from "@tabler/icons-react";
import Modal from "@/Components/Modal";
import { router, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

const Index = () => {
    const { products } = usePage().props;
    console.log(products.data);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSubmit = () => {
        router.get(route("products.create"));
    };
    return (
        <Box className="w-full p-4">
            <Flex justify="space-between" align="center" mb="md">
                <div>
                    <Text size="xl" weight={600}>
                        Product List
                    </Text>
                    <Text size="sm" color="dimmed">
                        Manage your products
                    </Text>
                </div>
                <Button variant="filled" color="orange" onClick={handleSubmit}>
                    <IconPlus size={16} /> Add Product
                </Button>
            </Flex>

            {/* Search and Filter Section */}
            <Flex gap="md" mb="md">
                <TextInput
                    placeholder="Search products..."
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

            <ProductTable products={products} searchQuery={searchQuery} />
        </Box>
    );
};

Index.layout = (page) => <MainLayout title="Product">{page}</MainLayout>;
export default Index;
