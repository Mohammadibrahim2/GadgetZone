import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { usePage, router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import MainLayout from "@/Layouts/MainLayout";

const ColorForm = () => {
    const { color } = usePage().props;
    const isEditMode = !!color?.id; // Determine if we're in edit mode

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            hex_code: "#000000",
            status: "draft",
        },
    });

    const [colorPreview, setColorPreview] = useState("#000000");
    const hexCodeValue = watch("hex_code");

    // Initialize form in edit mode
    useEffect(() => {
        if (isEditMode && color) {
            reset({
                name: color.name,
                hex_code: color.hex_code,
                status: color.status,
            });
            setColorPreview(color.hex_code);
        }
    }, [color, isEditMode, reset]);

    // Update color preview when hex code changes
    useEffect(() => {
        setColorPreview(hexCodeValue);
    }, [hexCodeValue]);

    const onSubmit = (data) => {
        if (isEditMode) {
            router.post(route("colors.update", color.id), data, {
                onSuccess: () => toast.success("Color updated successfully"),
                onError: () => toast.error("Failed to update color"),
            });
        } else {
            router.post(route("colors.store"), data, {
                onSuccess: () => {
                    toast.success("Color created successfully");
                    reset();
                },
                onError: () => toast.error("Failed to create color"),
            });
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditMode ? "Edit Color" : "Create New Color"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Color Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color Name *
                    </label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Color name is required" }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="e.g., Ocean Blue"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        )}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Hex Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color Code *
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Controller
                                name="hex_code"
                                control={control}
                                rules={{
                                    required: "Color code is required",
                                    pattern: {
                                        value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                                        message: "Invalid hex color code",
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="color"
                                        className="w-16 h-16 rounded-md cursor-pointer"
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <Controller
                                name="hex_code"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.startsWith("#")
                                                    ? e.target.value
                                                    : `#${e.target.value}`;
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                            {errors.hex_code && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.hex_code.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Color Preview */}
                <div className="flex items-center space-x-2">
                    <div
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorPreview }}
                    ></div>
                    <span className="text-sm text-gray-600">
                        {colorPreview}
                    </span>
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
                            <select
                                {...field}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        )}
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting
                            ? isEditMode
                                ? "Updating..."
                                : "Creating..."
                            : isEditMode
                            ? "Update Color"
                            : "Create Color"}
                    </button>
                </div>
            </form>
        </div>
    );
};

ColorForm.layout = (page) => (
    <MainLayout title={page.props.color ? "Edit Color" : "Create Color"}>
        {page}
    </MainLayout>
);

export default ColorForm;
