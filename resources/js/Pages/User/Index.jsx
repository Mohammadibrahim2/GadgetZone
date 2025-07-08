import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { IconCheck, IconUpload, IconUser } from "@tabler/icons-react";
import MainLayout from "@/Layouts/MainLayout";
import { notifications } from "@mantine/notifications";
import { router, usePage } from "@inertiajs/react";
import { Indicator } from "@mantine/core";

const Profile = () => {
    const { auth } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        auth.user?.profile_image || null
    );
    const fileInputRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            name: auth.user?.name || "",
            phone: auth.user?.phone || "",
            email: auth.user?.email || "",
            password: "",
            profile_image: null,
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                notifications.show({
                    title: "Error",
                    message: "Image must be below 2MB",
                    color: "red",
                });
                return;
            }
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                notifications.show({
                    title: "Error",
                    message: "Only JPG/PNG images are allowed",
                    color: "red",
                });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setValue("profile_image", file, { shouldDirty: true });
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        setIsSubmitting(true);

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        router.post(route("profile.update", { id: auth?.user?.id }), formData, {
            onSuccess: () => {
                notifications.show({
                    title: "Success!",
                    message: "Profile updated successfully",
                    color: "green",
                    icon: <IconCheck size={18} />,
                });
                reset(data);
            },
            onError: (errors) => {
                notifications.show({
                    title: "Error!",
                    message: Object.values(errors).join("\n"),
                    color: "red",
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex flex-row">
                    <span className="text-green-600 font-semibold">
                        {" "}
                        <IconUser />{" "}
                    </span>{" "}
                    Profile
                </h1>

                <div className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Basic Information
                        </h2>

                        {/* Profile Image Upload with Green Active Indicator */}
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="relative">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 p-0.5">
                                        {previewImage ? (
                                            <Indicator
                                                //inline
                                                processing
                                                color="green"
                                                size={18}
                                            >
                                                <img
                                                    src={previewImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </Indicator>
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-full">
                                                <span className="text-gray-400 text-xl">
                                                    {auth.user?.name?.charAt(
                                                        0
                                                    ) || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/jpeg,image/png"
                                        className="hidden"
                                    />
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Upload an image below 2MB
                                    </p>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Accepted file formats: JPG, PNG
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current.click()
                                        }
                                        className="flex items-center justify-center sm:justify-start gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors mx-auto sm:mx-0"
                                    >
                                        <IconUpload size={16} />
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Name Fields - Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: "Name is required" }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-3 py-2 rounded border ${
                                                errors.name
                                                    ? "border-red-500"
                                                    : "border-gray-300 focus:border-blue-500"
                                            } focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
                                        />
                                    )}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: "Phone number is required",
                                    }}
                                    render={({ field }) => (
                                        <input
                                            placeholder="+97665..."
                                            {...field}
                                            type="tel"
                                            className={`w-full px-3 py-2 rounded border ${
                                                errors.phone
                                                    ? "border-red-500"
                                                    : "border-gray-300 focus:border-blue-500"
                                            } focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
                                        />
                                    )}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="email"
                                            className={`w-full px-3 py-2 rounded border ${
                                                errors.email
                                                    ? "border-red-500"
                                                    : "border-gray-300 focus:border-blue-500"
                                            } focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password *
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            placeholder="*******"
                                            type="password"
                                            className={`w-full px-3 py-2 rounded border ${
                                                errors.password
                                                    ? "border-red-500"
                                                    : "border-gray-300 focus:border-blue-500"
                                            } focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Information Section */}
                    <div className="pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
                    </div>

                    {/* Save Button - Centered on mobile, right-aligned on larger screens */}
                    <div className="flex justify-center sm:justify-end">
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting || !isDirty}
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded shadow-sm transition-colors disabled:opacity-75 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                            {isSubmitting ? "Saving..." : "Save Change"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Profile.layout = (page) => (
    <MainLayout title="Profile">
        <div className="p-4">{page}</div>
    </MainLayout>
);

export default Profile;
