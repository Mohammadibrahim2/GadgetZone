import { Container, Grid } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { ProductDetails } from "./ProductDetails";
import { ProductImages } from "./ProductImageCarousel";
import { ProductServiceInfo } from "./ProductServiceInfo";
import GuestLayout from "@/Layouts/GuestLayout";

const ProductPage = () => {
    const { product } = usePage().props;
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(
        product.data.variants[0]
    );
    const [activeImage, setActiveImage] = useState(
        product.data.variants[0]?.images[0]?.path
    );

    // Extract unique colors from variants
    const colors = [
        ...new Map(
            product.data.variants.map((v) => [
                v.color_id,
                {
                    id: v.color.id,
                    hex: v.color.code || "#ddd",
                    name: v.color.name || `Color ${v.color_id}`,
                },
            ])
        ).values(),
    ];

    // Combine all images with color info
    const allImages = product.data.variants.flatMap((v) =>
        (v.images || []).map((img) => ({
            ...img,
            color_id: v.color_id,
            is_featured: img.is_featured || false,
        }))
    );

    // Update variant when color changes
    useEffect(() => {
        const variant = selectedColor
            ? product.data.variants.find((v) => v.color_id === selectedColor)
            : product.data.variants[0];
        setSelectedVariant(variant);
        setQuantity(1);
    }, [selectedColor]);

    return (
        <Container size="lg" py="xl">
            <Grid gutter="xl">
                {/* Product Images - 5 cols on desktop, 12 on mobile */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <ProductImages
                        images={allImages}
                        colors={colors}
                        selectedColor={selectedColor}
                        onColorChange={setSelectedColor}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                    />
                </Grid.Col>

                {/* Product Details - 4 cols on desktop, 12 on mobile */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <ProductDetails
                        product={product.data}
                        selectedVariant={selectedVariant}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        activeImage={activeImage}
                    />
                </Grid.Col>

                {/* Service Info - 3 cols on desktop, 12 on mobile */}
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <ProductServiceInfo />
                </Grid.Col>
            </Grid>
        </Container>
    );
};

ProductPage.layout = (page) => (
    <GuestLayout title="Product">{page}</GuestLayout>
);

export default ProductPage;
