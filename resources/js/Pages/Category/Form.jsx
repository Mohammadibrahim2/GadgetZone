import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { IconCheck, IconCategory, IconChevronDown } from "@tabler/icons-react";
import MainLayout from "@/Layouts/MainLayout";
import { notifications } from "@mantine/notifications";
import { router, usePage } from "@inertiajs/react";

const CategoryForm = () => {
    const { category } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            id: "",
            title: "",
            parent_id: "",
            description: "",
            status: "draft",
        },
    });

    const onSubmit = (data) => {
        setIsSubmitting(true);

        let id = category?.data?.id;
        if (id) {
            router.post(route("categories.update", id), data, {
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Category created successfully",
                        color: "green",
                        icon: <IconCheck size={18} />,
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
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post(route("categories.store"), data, {
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Category created successfully",
                        color: "green",
                        icon: <IconCheck size={18} />,
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
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };
    const currentStatus = watch("status");

    console.log(category);
    useEffect(() => {
        setValue("id", category?.data?.id);
        setValue("status", category?.data?.status);
        setValue("description", category?.data?.description);
        setValue("title", category?.data?.title);
    }, [category?.data?.id]);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative">
                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <IconCategory className="w-8 h-8 text-orange-600" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Create New Category
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            {/* Category Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="title"
                                    control={control}
                                    rules={{
                                        required: "Category name is required",
                                        minLength: {
                                            value: 3,
                                            message:
                                                "Name must be at least 3 characters",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="e.g. Luxury Suites"
                                            className={`w-full px-4 py-2 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                                                errors.title
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } bg-white text-gray-800`}
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title.message}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Enter a unique name for your category
                                </p>
                            </div>

                            {/* Parent Category */}
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Parent Category
                                </label>
                                <Controller
                                    name="parent_id"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <select
                                                {...field}
                                                className={`w-full px-4 py-2 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none ${
                                                    errors.parent_id
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } bg-white text-gray-800`}
                                            >
                                                <option value="">
                                                    Select parent category
                                                </option>
                                                <option value="1">
                                                    Hotels
                                                </option>
                                                <option value="2">Rooms</option>
                                                <option value="3">
                                                    Amenities
                                                </option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <IconChevronDown className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    )}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Optional - select if this is a sub-category
                                </p>
                            </div> */}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    maxLength: {
                                        value: 200,
                                        message:
                                            "Description must be less than 200 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        placeholder="Describe this category..."
                                        rows={4}
                                        className={`w-full px-4 py-2 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                                            errors.description
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } bg-white text-gray-800`}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description.message}
                                </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                Provide details about this category (optional)
                            </p>
                        </div>

                        {/* Status Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <select
                                            {...field}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white text-gray-800"
                                        >
                                            <option value="published">
                                                Published
                                            </option>
                                            <option value="draft">Draft</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <IconChevronDown className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <IconCheck className="w-5 h-5 mr-2" />
                                        Save Category
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

CategoryForm.layout = (page) => (
    <MainLayout title="Create Category">
        <div className="p-6">{page}</div>
    </MainLayout>
);

export default CategoryForm;
