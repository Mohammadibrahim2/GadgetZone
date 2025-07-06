import {
    TextInput,
    Select,
    Button,
    Group,
    Box,
    Alert,
    Textarea,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import MainLayout from "@/Layouts/MainLayout";

const CategoryForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box className="bg-white p-6 rounded-lg shadow">
            <LoadingOverlay visible={isSubmitting} />

            {error && (
                <Alert icon={<IconAlertCircle />} color="red" mb="md">
                    {error}
                </Alert>
            )}

            {success && (
                <Alert icon={<IconCheck />} color="green" mb="md">
                    Category created successfully!
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <TextInput
                        label="Category Name"
                        placeholder="Enter name"
                        {...register("name", { required: "Required" })}
                        error={errors.name?.message}
                        withAsterisk
                    />

                    <Select
                        label="Parent Category"
                        data={["Hotels", "Rooms", "Amenities"]}
                        {...register("parent")}
                    />
                </div>

                <Textarea
                    label="Description"
                    placeholder="Enter description"
                    {...register("description")}
                    mb="md"
                    autosize
                    minRows={3}
                />

                <Group justify="flex-end">
                    <Button type="submit" loading={isSubmitting}>
                        Save Category
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

CategoryForm.layout = (page) => (
    <MainLayout title="Create Category">{page}</MainLayout>
);

export default CategoryForm;
