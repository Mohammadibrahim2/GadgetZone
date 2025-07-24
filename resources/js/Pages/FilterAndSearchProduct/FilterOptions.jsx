import Checkbox from "@/Components/Checkbox";
import { Divider, Grid, RangeSlider, Stack, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";

const FilterProductSideBar = ({
    isMobile,
    colors = [],
    categories = [],
    selectedCategories = [],
    priceRange = [100, 3000],
    setPriceRange,
    selectedColors = [],
    toggleCategory,
    toggleColor,
}) => {
    return (
        <Grid.Col span={isMobile ? 12 : 3}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm sticky top-4"
            >
                <Title order={3} className="text-black mb-6 font-bold">
                    FILTERS
                </Title>

                {/* Categories Filter */}
                <div className="mb-8">
                    <Title order={4} className="text-black mb-2">
                        CATEGORIES
                    </Title>
                    <Divider className="mb-3" />
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-50"
                                onClick={() =>
                                    toggleCategory(
                                        category.title || category.name
                                    )
                                }
                            >
                                <div
                                    className={`mr-2 w-4 h-4 border-2 ${
                                        selectedCategories.includes(
                                            category.title || category.name
                                        )
                                            ? "bg-orange-500 border-orange-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {selectedCategories.includes(
                                        category.title || category.name
                                    ) && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="white"
                                            className="w-full h-full"
                                        >
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    )}
                                </div>
                                <Text className="select-none">
                                    {category.title || category.name}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <Stack spacing="sm" className="mb-8">
                    <Title order={4} className="text-black">
                        PRICE
                    </Title>
                    <Divider />
                    <Text>
                        Range: {priceRange[0]}tk - {priceRange[1]}tk
                    </Text>
                    <RangeSlider
                        min={100}
                        max={3000}
                        value={priceRange}
                        onChange={setPriceRange}
                        color="orange"
                        className="mt-4"
                        marks={[
                            { value: 100, label: "100 tk" },
                            { value: 1000, label: "1000tk" },
                            { value: 3000, label: "3000tk" },
                        ]}
                    />
                </Stack>

                {/* Color Filter */}
                <div>
                    <Title order={4} className="text-black mb-2">
                        COLOR
                    </Title>
                    <Divider className="mb-3" />
                    <div className="space-y-2">
                        {colors.map((color) => (
                            <div
                                key={color.id}
                                className="flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-50"
                                onClick={() => toggleColor(color.name)}
                            >
                                <div
                                    className={`flex-shrink-0 w-4 h-4 border-2 ${
                                        selectedColors.includes(color.name)
                                            ? "bg-orange-500 border-orange-500"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {selectedColors.includes(color.name) && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="white"
                                            className="w-full h-full"
                                        >
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full "
                                        style={{
                                            backgroundColor: color.hex_code,
                                        }}
                                        title={color.hex_code}
                                    />
                                    <Text className="select-none">
                                        {color.name}{" "}
                                        <span className="text-gray-500 text-sm">
                                            ({color.hex_code})
                                        </span>
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Grid.Col>
    );
};

export default FilterProductSideBar;
