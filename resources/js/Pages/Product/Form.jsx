import { useForm, Controller } from "react-hook-form";
import {
    TextInput,
    Textarea,
    Select,
    MultiSelect,
    Button,
    Group,
    Stack,
    Grid,
    Paper,
    Title,
    Text,
    Image,
    ActionIcon,
    Divider,
    Box,
    Radio,
    useMantineTheme,
    LoadingOverlay,
    ColorSwatch,
    Badge,
    rem,
} from "@mantine/core";
import {
    IconTrash,
    IconPlus,
    IconPhoto,
    IconCheck,
    IconX,
    IconCurrencyDollar,
} from "@tabler/icons-react";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";

const ProductForm = () => {
    const theme = useMantineTheme();
    const { categories, brands, attributes, colors, product } = usePage().props;
    const [loading, setLoading] = useState(false);
    const [featuredPreview, setFeaturedPreview] = useState(null);
    const [variantPreviews, setVariantPreviews] = useState({});

    // Transform data for Select components
    const brandData =
        brands?.map((brand) => ({
            value: brand.id.toString(),
            label: brand.name,
        })) || [];

    const categoriesData =
        categories?.map((category) => ({
            value: category.id.toString(),
            label: category.title,
        })) || [];

    const colorData =
        colors?.map((color) => ({
            value: color.id.toString(),
            label: color.name,
            color: color.hex_code,
        })) || [];

    const attributeFields =
        attributes?.map((attr) => ({
            id: attr.id,
            name: attr.name,
            values: attr.values.map((val) => ({
                id: val.id,
                value: val.id.toString(),
                label: val.value,
            })),
        })) || [];

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            brand_id: "",
            category_id: "",
            sku: "",
            status: "draft",
            featured_image: null,
            variants: [],
            attributes: {},
        },
    });

    // Initialize form with product data
    useEffect(() => {
        if (product) {
            const initialAttributes = {};
            if (product.data.attributes) {
                product.data.attributes.forEach((attr) => {
                    initialAttributes[attr.name] = attr.values.map((v) =>
                        v.id.toString()
                    );
                });
            }

            reset({
                title: product.data.title || "",
                slug: product.data.slug || "",
                description: product.data.description || "",
                brand_id: product.data.brand?.id?.toString() || "",
                category_id: product.data.category?.id?.toString() || "",
                sku: product.data.sku || "",
                status: product.data.status || "draft",
                featured_image: null,
                variants:
                    product.data.variants?.map((variant) => ({
                        id: variant.id,
                        color_id: variant.color_id?.toString(),
                        price: variant.price?.toString(),
                        stock: variant.stock?.toString(),
                        images: [],
                    })) || [],
                attributes: initialAttributes,
            });

            if (product.data.featured_image) {
                setFeaturedPreview(product.data.featured_image);
            }

            if (product.data.variants) {
                const previews = {};
                product.data.variants.forEach((variant, index) => {
                    if (variant.images?.length > 0) {
                        previews[index] = variant.images.map((img) => img.path);
                    }
                });
                setVariantPreviews(previews);
            }
        }
    }, [product, reset]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (
                name === "title" &&
                (!product?.data.slug || product.data.slug === "")
            ) {
                const slug = value.title
                    ?.toLowerCase()
                    .replace(/[^\w\s]/gi, "")
                    .replace(/\s+/g, "-")
                    .trim();
                setValue("slug", slug);
                trigger("slug");
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, trigger, product?.data.slug]);

    const handleFeaturedImageChange = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => setFeaturedPreview(reader.result);
            reader.readAsDataURL(file);
            setValue("featured_image", file);
        }
    };

    const handleVariantImagesChange = (files, index) => {
        const previews = { ...variantPreviews };
        const newPreviews = Array.from(files).map((file) =>
            URL.createObjectURL(file)
        );

        previews[index] = [...(previews[index] || []), ...newPreviews];
        setVariantPreviews(previews);

        const variants = [...watch("variants")];
        variants[index].images = [...(variants[index].images || []), ...files];
        setValue("variants", variants);
    };

    const addVariant = () => {
        setValue("variants", [
            ...watch("variants"),
            { color_id: "", price: "", stock: "", images: [] },
        ]);
    };

    const removeVariant = (index) => {
        const variants = [...watch("variants")];
        variants.splice(index, 1);
        setValue("variants", variants);

        const previews = { ...variantPreviews };
        delete previews[index];
        setVariantPreviews(previews);
    };

    const removeVariantImage = (variantIndex, imageIndex) => {
        const previews = { ...variantPreviews };
        if (previews[variantIndex]) {
            previews[variantIndex].splice(imageIndex, 1);
            setVariantPreviews(previews);
        }

        const variants = [...watch("variants")];
        if (variants[variantIndex]?.images) {
            variants[variantIndex].images = variants[
                variantIndex
            ].images.filter((_, i) => i !== imageIndex);
            setValue("variants", variants);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("slug", data.slug);
            formData.append("description", data.description);
            formData.append("brand_id", data.brand_id);
            formData.append("category_id", data.category_id);
            formData.append("sku", data.sku);
            formData.append("status", data.status);

            if (data.featured_image) {
                formData.append("featured_image", data.featured_image);
            } else if (featuredPreview && typeof featuredPreview !== "string") {
                formData.append("featured_image", featuredPreview);
            }

            const attributesPayload = {};
            attributeFields.forEach((attr) => {
                const selectedValues = data.attributes[attr.name] || [];
                if (selectedValues.length > 0) {
                    attributesPayload[attr.id] = selectedValues.map((id) =>
                        parseInt(id)
                    );
                }
            });
            formData.append("attributes", JSON.stringify(attributesPayload));

            data.variants.forEach((variant, index) => {
                formData.append(
                    `variants[${index}][color_id]`,
                    variant.color_id
                );
                formData.append(`variants[${index}][price]`, variant.price);
                formData.append(`variants[${index}][stock]`, variant.stock);

                if (variant.id) {
                    formData.append(`variants[${index}][id]`, variant.id);
                }

                if (variant.images) {
                    Array.from(variant.images).forEach((image, imgIndex) => {
                        formData.append(
                            `variants[${index}][images][${imgIndex}]`,
                            image
                        );
                    });
                }
            });

            router.post(route("products.store"), formData, {
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: `Product ${
                            product ? "updated" : "created"
                        } successfully.`,
                        color: "green",
                        icon: <IconCheck size={18} />,
                    });
                },
                onError: (errors) => {
                    notifications.show({
                        title: "Error",
                        message: Object.values(errors).join("\n"),
                        color: "red",
                        icon: <IconX size={18} />,
                    });
                },
                forceFormData: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const ColorSelectItem = ({ color, label, ...rest }) => (
        <div
            {...rest}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
            <ColorSwatch color={color} size={16} />
            {label}
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <MainLayout title={product ? "Edit Product" : "Create Product"}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Paper p="md" radius="lg" withBorder>
                    <LoadingOverlay visible={loading} overlayBlur={2} />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <Stack gap="lg">
                            <motion.div variants={itemVariants}>
                                <Group justify="space-between">
                                    <Title order={3} fw={600}>
                                        {product
                                            ? "Edit Product"
                                            : "Create New Product"}
                                    </Title>
                                    <Badge
                                        radius="sm"
                                        color={
                                            watch("status") === "published"
                                                ? "green"
                                                : "gray"
                                        }
                                    >
                                        {watch("status")}
                                    </Badge>
                                </Group>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Grid gutter="xl">
                                    <Grid.Col span={{ xs: 12, md: 8 }}>
                                        <Stack gap="sm">
                                            <Controller
                                                name="title"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Title is required",
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            "Title must be at least 3 characters",
                                                    },
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <TextInput
                                                        label="Product Title"
                                                        withAsterisk
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="slug"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Slug is required",
                                                    pattern: {
                                                        value: /^[a-z0-9-]+$/,
                                                        message:
                                                            "Slug can only contain lowercase letters, numbers, and hyphens",
                                                    },
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <TextInput
                                                        label="Slug"
                                                        withAsterisk
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="description"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Description is required",
                                                    minLength: {
                                                        value: 10,
                                                        message:
                                                            "Description must be at least 10 characters",
                                                    },
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <Textarea
                                                        label="Description"
                                                        minRows={4}
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </Stack>
                                    </Grid.Col>

                                    <Grid.Col span={{ xs: 12, md: 4 }}>
                                        <Stack gap="sm">
                                            <Controller
                                                name="sku"
                                                control={control}
                                                rules={{
                                                    required: "SKU is required",
                                                    pattern: {
                                                        value: /^[A-Za-z0-9-]+$/,
                                                        message:
                                                            "SKU can only contain letters, numbers, and hyphens",
                                                    },
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <TextInput
                                                        label="SKU Code"
                                                        placeholder="SKU-1001"
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="brand_id"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Brand is required",
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <Select
                                                        label="Brand"
                                                        placeholder="Select brand"
                                                        data={brandData}
                                                        searchable
                                                        clearable
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                name="category_id"
                                                control={control}
                                                rules={{
                                                    required:
                                                        "Category is required",
                                                }}
                                                render={({
                                                    field,
                                                    fieldState,
                                                }) => (
                                                    <Select
                                                        label="Category"
                                                        placeholder="Select category"
                                                        data={categoriesData}
                                                        searchable
                                                        clearable
                                                        error={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Box>
                                    <Text size="sm" fw={500} mb={4}>
                                        Featured Image
                                    </Text>
                                    {featuredPreview ? (
                                        <Box pos="relative" w={150}>
                                            <Image
                                                src={featuredPreview}
                                                alt="Featured preview"
                                                radius="sm"
                                                h={150}
                                                w={150}
                                                fit="cover"
                                            />
                                            <ActionIcon
                                                color="red"
                                                variant="filled"
                                                size="sm"
                                                style={{
                                                    top: -8,
                                                    right: -8,
                                                    position: "absolute",
                                                }}
                                                onClick={() => {
                                                    setFeaturedPreview(null);
                                                    setValue(
                                                        "featured_image",
                                                        null
                                                    );
                                                }}
                                            >
                                                <IconX size={16} />
                                            </ActionIcon>
                                        </Box>
                                    ) : (
                                        <Dropzone
                                            onDrop={handleFeaturedImageChange}
                                            accept={IMAGE_MIME_TYPE}
                                            maxFiles={1}
                                            style={{
                                                width: 150,
                                                height: 150,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderStyle: "dashed",
                                            }}
                                        >
                                            <Stack align="center" gap={4}>
                                                <IconPhoto
                                                    size={32}
                                                    c={theme.colors.gray[5]}
                                                />
                                                <Text size="xs" c="dimmed">
                                                    Upload image
                                                </Text>
                                            </Stack>
                                        </Dropzone>
                                    )}
                                </Box>
                            </motion.div>

                            {attributeFields.length > 0 && (
                                <motion.div variants={itemVariants}>
                                    <Divider label="Attributes" />
                                    <Grid gutter="md">
                                        {attributeFields.map((attr) => (
                                            <Grid.Col
                                                key={attr.id}
                                                span={{ xs: 12, sm: 6, md: 4 }}
                                            >
                                                <Controller
                                                    name={`attributes.${attr.name}`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <MultiSelect
                                                            label={attr.name}
                                                            data={attr.values}
                                                            placeholder={`Select ${attr.name}`}
                                                            clearable
                                                            value={
                                                                field.value ||
                                                                []
                                                            }
                                                            onChange={(
                                                                selected
                                                            ) => {
                                                                field.onChange(
                                                                    selected
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </motion.div>
                            )}

                            <motion.div variants={itemVariants}>
                                <Divider label="Variants" />
                                <Button
                                    leftSection={<IconPlus size={16} />}
                                    onClick={addVariant}
                                    variant="light"
                                    size="sm"
                                    mb="xs"
                                >
                                    Add Variant
                                </Button>

                                <Stack gap="md">
                                    {watch("variants")?.map(
                                        (variant, index) => (
                                            <motion.div
                                                key={index}
                                                variants={itemVariants}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Paper
                                                    p="sm"
                                                    withBorder
                                                    radius="md"
                                                >
                                                    <Stack gap="sm">
                                                        <Group grow>
                                                            <Controller
                                                                name={`variants.${index}.color_id`}
                                                                control={
                                                                    control
                                                                }
                                                                rules={{
                                                                    required:
                                                                        "Color is required",
                                                                }}
                                                                render={({
                                                                    field,
                                                                    fieldState,
                                                                }) => (
                                                                    <Select
                                                                        label="Color"
                                                                        placeholder="Select color"
                                                                        data={
                                                                            colorData
                                                                        }
                                                                        itemComponent={
                                                                            ColorSelectItem
                                                                        }
                                                                        error={
                                                                            fieldState
                                                                                .error
                                                                                ?.message
                                                                        }
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            <Controller
                                                                name={`variants.${index}.price`}
                                                                control={
                                                                    control
                                                                }
                                                                rules={{
                                                                    required:
                                                                        "Price is required",
                                                                    min: {
                                                                        value: 0.01,
                                                                        message:
                                                                            "Price must be greater than 0",
                                                                    },
                                                                }}
                                                                render={({
                                                                    field,
                                                                    fieldState,
                                                                }) => (
                                                                    <TextInput
                                                                        label="Price"
                                                                        type="number"
                                                                        placeholder="0.00"
                                                                        min="0.01"
                                                                        step="0.01"
                                                                        leftSection={
                                                                            <IconCurrencyDollar
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        }
                                                                        error={
                                                                            fieldState
                                                                                .error
                                                                                ?.message
                                                                        }
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            <Controller
                                                                name={`variants.${index}.stock`}
                                                                control={
                                                                    control
                                                                }
                                                                rules={{
                                                                    required:
                                                                        "Stock is required",
                                                                    min: {
                                                                        value: 0,
                                                                        message:
                                                                            "Stock cannot be negative",
                                                                    },
                                                                }}
                                                                render={({
                                                                    field,
                                                                    fieldState,
                                                                }) => (
                                                                    <TextInput
                                                                        label="Stock"
                                                                        type="number"
                                                                        placeholder="0"
                                                                        min="0"
                                                                        error={
                                                                            fieldState
                                                                                .error
                                                                                ?.message
                                                                        }
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            <Box mt={25}>
                                                                <ActionIcon
                                                                    color="red"
                                                                    variant="light"
                                                                    onClick={() =>
                                                                        removeVariant(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </ActionIcon>
                                                            </Box>
                                                        </Group>

                                                        <Box>
                                                            <Text
                                                                size="sm"
                                                                mb={4}
                                                            >
                                                                Images (Upload
                                                                multiple for
                                                                this variant)
                                                            </Text>
                                                            <Group gap="xs">
                                                                {(
                                                                    variantPreviews[
                                                                        index
                                                                    ] || []
                                                                ).map(
                                                                    (
                                                                        preview,
                                                                        imgIndex
                                                                    ) => (
                                                                        <Box
                                                                            key={
                                                                                imgIndex
                                                                            }
                                                                            pos="relative"
                                                                        >
                                                                            <Image
                                                                                src={
                                                                                    preview
                                                                                }
                                                                                w={
                                                                                    80
                                                                                }
                                                                                h={
                                                                                    80
                                                                                }
                                                                                radius="sm"
                                                                                fit="cover"
                                                                            />
                                                                            <ActionIcon
                                                                                color="red"
                                                                                size="xs"
                                                                                style={{
                                                                                    top: -5,
                                                                                    right: -5,
                                                                                    position:
                                                                                        "absolute",
                                                                                }}
                                                                                onClick={() =>
                                                                                    removeVariantImage(
                                                                                        index,
                                                                                        imgIndex
                                                                                    )
                                                                                }
                                                                            >
                                                                                <IconX
                                                                                    size={
                                                                                        12
                                                                                    }
                                                                                />
                                                                            </ActionIcon>
                                                                        </Box>
                                                                    )
                                                                )}
                                                                <Dropzone
                                                                    onDrop={(
                                                                        files
                                                                    ) =>
                                                                        handleVariantImagesChange(
                                                                            files,
                                                                            index
                                                                        )
                                                                    }
                                                                    accept={
                                                                        IMAGE_MIME_TYPE
                                                                    }
                                                                    multiple
                                                                    style={{
                                                                        width: 80,
                                                                        height: 80,
                                                                        display:
                                                                            "flex",
                                                                        alignItems:
                                                                            "center",
                                                                        justifyContent:
                                                                            "center",
                                                                        borderStyle:
                                                                            "dashed",
                                                                    }}
                                                                >
                                                                    <IconPhoto
                                                                        size={
                                                                            24
                                                                        }
                                                                        c={
                                                                            theme
                                                                                .colors
                                                                                .gray[5]
                                                                        }
                                                                    />
                                                                </Dropzone>
                                                            </Group>
                                                        </Box>
                                                    </Stack>
                                                </Paper>
                                            </motion.div>
                                        )
                                    )}
                                </Stack>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Divider />
                                <Group justify="space-between">
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Radio.Group
                                                label="Product Status"
                                                {...field}
                                            >
                                                <Group mt="xs">
                                                    <Radio
                                                        value="draft"
                                                        label="Draft"
                                                    />
                                                    <Radio
                                                        value="published"
                                                        label="Published"
                                                    />
                                                </Group>
                                            </Radio.Group>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        loading={isSubmitting}
                                        size="md"
                                        px="xl"
                                    >
                                        {product
                                            ? "Update Product"
                                            : "Create Product"}
                                    </Button>
                                </Group>
                            </motion.div>
                        </Stack>
                    </form>
                </Paper>
            </motion.div>
        </MainLayout>
    );
};

export default ProductForm;
