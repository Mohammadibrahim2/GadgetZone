// ... import part same

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from "@inertiajs/react";
import { IconAt, IconLock, IconUser, IconUserPlus } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        resetField,
        getValues,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const submit = (data) => {
        console.log("Submitted:", data);
        router.post(route("register"), data, {
            onSuccess: () => {
                resetField("password");
                resetField("password_confirmation");
            },
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-orange-200 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Background image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')] bg-cover bg-center opacity-10"></div>

                {/* Main Register form container */}
                <div className="relative flex items-center justify-center min-h-screen w-full p-4">
                    <div className="w-full max-w-lg backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                        <div className="p-10">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                    Create Account
                                </h1>
                                <p className="text-orange-600 font-medium">
                                    Join us to get started
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit(submit)}
                                className="space-y-6"
                            >
                                {/* Full Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IconUser className="h-5 w-5 text-orange-400" />
                                        </div>
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required: "Name is required",
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Minimum 3 characters",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="name"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="name"
                                                    isFocused
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputError
                                        message={errors.name?.message}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IconAt className="h-5 w-5 text-orange-400" />
                                        </div>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Invalid email",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="email"
                                                    type="email"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="email"
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputError
                                        message={errors.email?.message}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IconLock className="h-5 w-5 text-orange-400" />
                                        </div>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Minimum 6 characters",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="password"
                                                    type="password"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="new-password"
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password?.message}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <IconLock className="h-5 w-5 text-orange-400" />
                                        </div>
                                        <Controller
                                            name="password_confirmation"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Confirm password is required",
                                                validate: (value) =>
                                                    value ===
                                                        getValues("password") ||
                                                    "Passwords do not match",
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="password_confirmation"
                                                    type="password"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="new-password"
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputError
                                        message={
                                            errors.password_confirmation
                                                ?.message
                                        }
                                        className="mt-1"
                                    />
                                </div>

                                <PrimaryButton
                                    className="w-full justify-center py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:ring-orange-500 text-white font-semibold"
                                    disabled={isSubmitting}
                                >
                                    <IconUserPlus className="w-5 h-5 mr-2" />
                                    {isSubmitting
                                        ? "Registering..."
                                        : "Create Account"}
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    href={route("login")}
                                    className="text-orange-600 hover:text-orange-500 font-medium"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
