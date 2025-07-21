import { Button, TextInput, Title, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export function Newsletter() {
    const form = useForm({
        initialValues: {
            email: "",
        },
    });

    return (
        <div
            className="relative py-16 px-4 md:px-8 lg:px-16 overflow-hidden mt-10"
            style={{
                backgroundImage:
                    "url('https://s3-eu-west-1.amazonaws.com/assets.pukit.de/roadcyclingde/wp-content/uploads/2024/10/C-Amazfit-T-Rex-3-UVP-29990-EUR-Sperrfrist-bis-6.9.2024-Surfing-3634.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "40% 50%",
            }}
        >
            {/* White overlay with opacity */}
            <div className="absolute  bg-white "></div>

            {/* Glass effect container */}
            <div className="relative max-w-7xl mx-auto backdrop-blur-sm bg-white bg-opacity-20  rounded-sm p-8 md:p-12 shadow-lg">
                <Title
                    order={1}
                    className="text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                    <span className="text-orange-500"> Get</span>{" "}
                    <span className="text-white">
                        {" "}
                        Notified Of Any Updates!
                    </span>
                </Title>

                <Text className="text-lg md:text-xl mb-8 text-white">
                    Subscribe To Our Newsletter For Promotions
                </Text>

                <form
                    onSubmit={form.onSubmit((values) => console.log(values))}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <TextInput
                        placeholder="Your email address"
                        required
                        type="email"
                        className="flex-grow max-w-md"
                        size="lg"
                        variant="filled"
                        styles={{
                            input: {
                                backgroundColor: "rgba(255,255,255,0.9)",
                                color: "black",
                                borderColor: "#d1d5db",
                                "&:focus": {
                                    borderColor: "#f97316",
                                },
                                "&::placeholder": {
                                    color: "#6b7280",
                                },
                            },
                        }}
                        {...form.getInputProps("email")}
                    />

                    <Button
                        type="submit"
                        size="lg"
                        className="bg-orange-300 hover:bg-orange-500 transition-colors text-white"
                    >
                        SIGN UP
                    </Button>
                </form>
            </div>
        </div>
    );
}
