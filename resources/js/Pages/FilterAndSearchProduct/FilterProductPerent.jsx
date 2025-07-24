import { useEffect, useState } from "react";
import {
    Grid,
    Stack,
    Title,
    Text,
    Checkbox,
    RangeSlider,
    Card,
    Image,
    Group,
    Badge,
    Button,
    Divider,
    Box,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import GuestLayout from "@/Layouts/GuestLayout";
import FilterProductSideBar from "./FilterOptions";
import ProductCard from "./ProductCard";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useSearch } from "@/hooks/Search/SearchContext";

const ProductFilterPage = () => {
    const { search, setSearch } = useSearch();

    const { categories, brands, colors, products } = usePage().props;

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [priceRange, setPriceRange] = useState([100, 30000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    console.log(search, "from filter page");
    const fetchProducts = () => {
        const response = axios.get(route("filter.productList"), {
            params: { priceRange, selectedCategories, selectedColors, search },
        });
    };

    useEffect(() => {
        if (search) {
            fetchProducts();
        }
    }, [search, selectedColors, priceRange, selectedCategories]);
    const toggleCategory = (category) => {
        setSelectedCategories((current) =>
            current.includes(category)
                ? current.filter((c) => c !== category)
                : [...current, category]
        );
    };

    const toggleColor = (color) => {
        setSelectedColors((current) =>
            current.includes(color)
                ? current.filter((c) => c !== color)
                : [...current, color]
        );
    };

    const renderStars = (rating) => {
        return (
            <Group spacing={4}>
                {[...Array(5)].map((_, i) => (
                    <Text key={i} color={i < rating ? "orange" : "gray"}>
                        {i < rating ? "★" : "☆"}
                    </Text>
                ))}
            </Group>
        );
    };

    return (
        <Box className="min-h-screen bg-gray-50">
            <Grid gutter="xl" className="max-w-7xl mx-auto p-4 md:p-8">
                {/* Sidebar - Filters */}
                <FilterProductSideBar
                    isMobile={isMobile}
                    toggleCategory={toggleCategory}
                    toggleColor={toggleColor}
                    setPriceRange={setPriceRange}
                    priceRange={priceRange}
                    selectedColors={selectedColors}
                    selectedCategories={selectedCategories}
                    categories={categories}
                    colors={colors}
                />
                {/* Main Content - Products */}
                <ProductCard
                    isMobile={isMobile}
                    products={products?.data}
                    renderStars={renderStars}
                />
            </Grid>
        </Box>
    );
};
ProductFilterPage.layout = (page) => <GuestLayout>{page}</GuestLayout>;

export default ProductFilterPage;
