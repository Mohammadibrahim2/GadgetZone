import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MainLayout from "@/Layouts/MainLayout";
import { IconCheck, IconCross, IconUpload, IconX } from "@tabler/icons-react";
import { router, usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";

const BrandForm = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            id: "",
            name: "",
            status: "draft",
            logo: null,
        },
    });
    const { brand } = usePage().props;

    useState(() => {
        setValue("name", brand?.data?.name);
        setValue("logo", brand?.data?.logo);
        setValue("status", brand?.data?.status);
        setValue("id", brand?.data?.id);
    }, [brand?.data?.id]);

    const [preview, setPreview] = useState(null);
    const logo = watch("logo");

    const onSubmit = (data) => {
        let id = brand?.data?.id;
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("status", data.status);
        formData.append("id", brand?.data?.id);

        if (data.logo instanceof File) {
            formData.append("logo", data.logo);
        }
        if (id) {
            router.post(route("brands.update"), formData, {
                forceFormData: true,
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Brand created successfully",
                        color: "green",
                        icon: <IconCheck size={18} />,
                        withCloseButton: true,
                    });
                },
            });
            reset();
            setPreview(null);
        } else {
            router.post(route("brands.store"), formData, {
                forceFormData: true,
                onSuccess: () => {
                    notifications.show({
                        title: "Success!",
                        message: "Brand created successfully",
                        color: "green",
                        icon: <IconCheck size={18} />,
                        withCloseButton: true,
                    });
                },
            });
            reset();
            setPreview(null);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("logo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setValue("logo", null);
        setPreview(null);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Brand</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Brand Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Brand Name *
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter brand name"
                            />
                        )}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        )}
                    />
                </div>

                {/* Logo Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Logo
                    </label>

                    {/* Image Preview */}
                    {preview && (
                        <div className="mb-4 relative">
                            <div className="w-32 h-32 border border-gray-200 rounded-md overflow-hidden">
                                <img
                                    src={preview}
                                    alt="Logo preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 hover:bg-red-600"
                            >
                                <IconX className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    <div className="mt-1 flex items-center">
                        <label className="cursor-pointer flex items-center  px-1 py-1 rounded-md border border-orange-600 shadow-sm text-sm font-medium text-orange-600 transition-colors">
                            <IconUpload className="mr-2" />
                            Upload Image
                            <input
                                type="file"
                                accept="image/jpeg, image/png"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        <span className="ml-3 text-sm text-gray-500">
                            JPEG, PNG up to 2 MB
                        </span>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setPreview(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Add Brand
                    </button>
                </div>
            </form>
        </div>
    );
};

BrandForm.layout = (page) => (
    <MainLayout title="Create Brands">{page}</MainLayout>
);

export default BrandForm;
