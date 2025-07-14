import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MainLayout from "@/Layouts/MainLayout";
import { IconChecklist } from "@tabler/icons-react";
import { router, usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";

const AttributeForm = () => {
    const { attribute } = usePage().props;
    const isEditMode = !!attribute?.data?.id;
    const [userEditedSlug, setUserEditedSlug] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
        setValue,
        trigger,
    } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            values: [],
            status: "draft",
        },
    });

    const [inputValue, setInputValue] = useState("");
    const nameValue = watch("name");
    const slugValue = watch("slug");
    const currentValues = watch("values");

    // Initialize form with attribute data in edit mode
    useEffect(() => {
        if (isEditMode && attribute?.data) {
            const { name, slug, values, status } = attribute.data;
            reset({
                name,
                slug,
                values: values.map((value) => value.value) || [],
                status: status || "draft",
            });
        }
    }, [isEditMode, attribute, reset]);

    // Auto-generate slug when name changes (unless user manually edited slug)
    useEffect(() => {
        if (nameValue && !userEditedSlug) {
            const generatedSlug = nameValue
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/\s+/g, "-")
                .substring(0, 50);

            setValue("slug", generatedSlug);
            trigger("slug");
        }
    }, [nameValue, setValue, trigger, userEditedSlug]);

    const handleAddValue = () => {
        if (inputValue.trim() && !currentValues.includes(inputValue.trim())) {
            setValue("values", [...currentValues, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveValue = (valueToRemove) => {
        setValue(
            "values",
            currentValues.filter((value) => value !== valueToRemove)
        );
    };

    const handleSlugChange = (e) => {
        setValue("slug", e.target.value.toLowerCase());
        setUserEditedSlug(true); // Mark that user has manually edited the slug
    };

    const onSubmit = (data) => {
        if (isEditMode) {
            router.post(route("attributes.update", attribute?.data?.id), data, {
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Attribute updated successfully",
                        color: "green",
                        withCloseButton: true,
                    });
                },
                onError: (errors) => {
                    notifications.show({
                        title: "Error!",
                        message: Object.values(errors).join("\n"),
                        color: "red",
                        withCloseButton: true,
                    });
                },
            });
        } else {
            router.post(route("attributes.store"), data, {
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Attribute created successfully",
                        color: "green",
                        withCloseButton: true,
                    });
                    reset();
                },
                onError: (errors) => {
                    notifications.show({
                        title: "Error!",
                        message: Object.values(errors).join("\n"),
                        color: "red",
                        withCloseButton: true,
                    });
                },
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex flex-row space-x-3 items-center">
                <span className="text-orange-500 text-xl">
                    <IconChecklist />
                </span>
                {isEditMode ? "Edit Attribute" : "Create New Attribute"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Attribute Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Attribute Name *
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="e.g., Memory, Storage, Color"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        )}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug *
                    </label>
                    <Controller
                        name="slug"
                        control={control}
                        rules={{
                            required: "Slug is required",
                            pattern: {
                                value: /^[a-z0-9-]+$/,
                                message:
                                    "Only lowercase letters, numbers and dashes allowed",
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                onChange={handleSlugChange}
                            />
                        )}
                    />
                    {errors.slug && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                {/* Possible Values */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Possible Values *
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter a value"
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddValue();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddValue}
                            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                        >
                            Add
                        </button>
                    </div>

                    {/* Display added values */}
                    <div className="mt-2">
                        {currentValues?.length > 0 && (
                            <div className="space-y-2">
                                {currentValues.map((value) => (
                                    <div
                                        key={value}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                        <span>{value}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveValue(value)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {errors.values && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.values.message}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                    </label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="text-orange-600 focus:ring-orange-500"
                                        value="published"
                                        checked={field.value === "published"}
                                        onChange={() =>
                                            field.onChange("published")
                                        }
                                    />
                                    <span className="ml-2 text-sm text-orange-700">
                                        Published
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="text-orange-600 focus:ring-orange-500"
                                        value="draft"
                                        checked={field.value === "draft"}
                                        onChange={() => field.onChange("draft")}
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Draft
                                    </span>
                                </label>
                            </div>
                        )}
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting
                            ? isEditMode
                                ? "Updating..."
                                : "Saving..."
                            : isEditMode
                            ? "Update Attribute"
                            : "Save Attribute"}
                    </button>
                </div>
            </form>
        </div>
    );
};

AttributeForm.layout = (page) => (
    <MainLayout
        title={page.props.attribute ? "Edit Attribute" : "Create Attribute"}
    >
        {page}
    </MainLayout>
);

export default AttributeForm;
