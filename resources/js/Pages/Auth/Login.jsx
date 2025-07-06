import React from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from "@inertiajs/react";
import { IconAt, IconLock, IconLogin } from "@tabler/icons-react";

export default function Login({ status, canResetPassword }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const submit = (data) => {
        router.post(route("login"), {
            ...data,
            onFinish: () => reset({ password: "" }),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-orange-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-orange-200 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80')] bg-cover bg-center opacity-10"></div>

                <div className="relative flex items-center justify-center min-h-screen w-full p-4">
                    <div className="w-full max-w-lg backdrop-blur-lg bg-white/70 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                        <div className="p-10">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-orange-600 font-medium">
                                    Sign in to continue to your account
                                </p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-green-50/80 text-green-700 rounded-lg text-sm border border-green-100">
                                    {status}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit(submit)}
                                className="space-y-6"
                                noValidate
                            >
                                {/* Email */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                        className="text-gray-700 font-medium mb-2"
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
                                                    message:
                                                        "Enter a valid email",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="email"
                                                    type="email"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="username"
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
                                        className="text-gray-700 font-medium mb-2"
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
                                                        "Password must be at least 6 characters",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <TextInput
                                                    {...field}
                                                    id="password"
                                                    type="password"
                                                    className="block w-full pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500 bg-white/80"
                                                    autoComplete="current-password"
                                                />
                                            )}
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password?.message}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <Controller
                                        name="remember"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                            >
                                                Remember me
                                            </Checkbox>
                                        )}
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-orange-600 hover:text-orange-500"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                {/* Submit */}
                                <div>
                                    <PrimaryButton
                                        className="w-full justify-center py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:ring-orange-500 focus:ring-offset-2 border-transparent text-white font-semibold shadow-lg"
                                        disabled={isSubmitting}
                                    >
                                        <IconLogin className="w-5 h-5 mr-2" />
                                        {isSubmitting
                                            ? "Signing in..."
                                            : "Log in"}
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        href={route("register")}
                                        className="font-medium text-orange-600 hover:text-orange-500"
                                    >
                                        Create account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
