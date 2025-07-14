import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { IconCheck, IconUpload, IconUser } from "@tabler/icons-react";
import MainLayout from "@/Layouts/MainLayout";
import { notifications } from "@mantine/notifications";
import { router, usePage } from "@inertiajs/react";
import { Indicator } from "@mantine/core";

const Profile = () => {
    const { auth } = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            name: auth.user?.name || "",
            phone: auth.user?.phone || "",
            email: auth.user?.email || "",
            password: "",
            profile_image: null,
            old_image: auth.user?.profileImage || "", // 🔁 Short path
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
                setValue("profile_image", file); // ✅ mark dirty
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        setIsSubmitting(true);
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        if (data.password) formData.append("password", data.password);

        // ✅ Always append old_image (short path)
        formData.append("old_image", data.old_image);

        // ✅ If user selected a new file, append it
        if (data.profile_image instanceof File) {
            formData.append("profile_image", data.profile_image);
        }

        router.post(route("profile.update", { id: auth?.user?.id }), formData, {
            onSuccess: () => {
                notifications.show({
                    title: "Success!",
                    message: "Profile updated successfully",
                    color: "green",
                    icon: <IconCheck size={18} />,
                });
                reset(data);
                setPreviewImage(null);
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
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <IconUser className="text-green-600" /> Profile
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 p-0.5">
                            <Controller
                                name="profile_image"
                                control={control}
                                render={() => (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/jpeg,image/png"
                                            className="hidden"
                                        />
                                        {previewImage ? (
                                            <Indicator
                                                processing
                                                color="green"
                                                size={18}
                                            >
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </Indicator>
                                        ) : (
                                            <Indicator
                                                processing
                                                color="green"
                                                size={18}
                                            >
                                                <img
                                                    src={
                                                        auth.user?.profile_image
                                                    }
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </Indicator>
                                        )}
                                    </>
                                )}
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
                                onClick={() => fileInputRef.current.click()}
                                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                            >
                                <IconUpload
                                    size={16}
                                    className="inline-block mr-1"
                                />
                                Upload Image
                            </button>
                        </div>
                    </div>

                    {/* Inputs in 2 columns (responsive 1 column) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-700">
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
                                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    />
                                )}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm text-gray-700">
                                Phone *
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "Phone is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    />
                                )}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-600">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm text-gray-700">
                                Email *
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm text-gray-700">
                                Password
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="********"
                                        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
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
