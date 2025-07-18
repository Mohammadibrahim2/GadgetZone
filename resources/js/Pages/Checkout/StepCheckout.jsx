import {
    Button,
    TextInput,
    Group,
    Paper,
    Stack,
    Title,
    Text,
    Divider,
    useMantineTheme,
    Badge,
    Select,
} from "@mantine/core";
import {
    IconCreditCard,
    IconArrowLeft,
    IconUser,
    IconHome,
    IconMail,
    IconPhone,
    IconCashBanknote,
    IconDeviceMobile,
    IconWallet,
    IconNote,
    IconChecklist,
} from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { useCart } from "@/hooks/Cart/CartContext";
import { router, usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import axios from "axios";

// Bangladesh districts data
const districts = [
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barisal",
    "Bhola",
    "Bogra",
    "Brahmanbaria",
    "Chandpur",
    "Chittagong",
    "Chuadanga",
    "Comilla",
    "Cox's Bazar",
    "Dhaka",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jessore",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachhari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Nawabganj",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Patuakhali",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon",
];

export default function StepCheckout({ onBack, onNext }) {
    const theme = useMantineTheme();
    const { cart } = useCart();
    const [selectedMethod, setSelectedMethod] = useState(null);
    //  const [selectedMethod, setSelectedMethod] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm();
    const { trackingInfo } = usePage().props;
    const onSubmit = async (data) => {
        const OrderInfo = {
            ...data,
            payment_method: selectedMethod,
            cart: cart,
        };

        try {
            const response = await axios.post(route("orders.store"), OrderInfo);
            const trackingInfo = response.data.trackingInfo;

            if (trackingInfo) {
                localStorage.setItem(
                    "trackingInfo",
                    JSON.stringify(trackingInfo)
                );
                onNext();
            }
        } catch (error) {
            console.error("Order submission failed:", error);
        }
    };

    return (
        <Paper p="xl" radius="lg" withBorder shadow="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="lg">
                    <Group gap="sm">
                        <Title order={2} fw={600}>
                            💳 Payment Information
                        </Title>
                    </Group>

                    {/* Contact Information */}
                    <Paper p="md" radius="md" withBorder>
                        <Stack gap="sm">
                            <Text fw={600} size="lg">
                                📧 Contact Information
                            </Text>
                            <Divider />
                            <Group grow>
                                <TextInput
                                    label="Name"
                                    placeholder="Your Name"
                                    required
                                    leftSection={<IconUser size={16} />}
                                    error={errors.name?.message}
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="your@email.com"
                                    required
                                    leftSection={<IconMail size={16} />}
                                    error={errors.email?.message}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </Group>

                            <TextInput
                                label="Phone"
                                placeholder="01XXXXXXXXX"
                                required
                                leftSection={<IconPhone size={16} />}
                                error={errors.phone?.message}
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^01\d{9}$/,
                                        message:
                                            "Invalid Bangladeshi phone number",
                                    },
                                })}
                            />
                            <TextInput
                                label="Note"
                                placeholder="Keep Note.."
                                leftSection={<IconChecklist size={16} />}
                                error={errors.note?.message}
                                {...register("nnoteame", {})}
                            />
                        </Stack>
                    </Paper>

                    {/* Shipping Address */}
                    <Paper p="md" radius="md" withBorder>
                        <Stack gap="sm">
                            <Text fw={600} size="lg">
                                🚚 Shipping Address
                            </Text>
                            <Divider />
                            <TextInput
                                label="Address"
                                placeholder="123 Main Street"
                                required
                                leftSection={<IconHome size={16} />}
                                error={errors.address?.message}
                                {...register("address", {
                                    required: "Address is required",
                                })}
                            />
                            <Group grow>
                                <Controller
                                    name="district"
                                    control={control}
                                    rules={{ required: "District is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="District"
                                            placeholder="Select district"
                                            data={districts}
                                            searchable
                                            required
                                            error={errors.district?.message}
                                        />
                                    )}
                                />
                                <TextInput
                                    label="City"
                                    placeholder="Dhaka"
                                    required
                                    error={errors.city?.message}
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                />
                                <TextInput
                                    label="Area"
                                    placeholder="Mirpur"
                                    required
                                    error={errors.area?.message}
                                    {...register("area", {
                                        required: "Area is required",
                                    })}
                                />
                            </Group>
                            <TextInput
                                label="ZIP Code"
                                placeholder="1216"
                                required
                                error={errors.zipCode?.message}
                                {...register("zipCode", {
                                    required: "ZIP code is required",
                                })}
                            />
                        </Stack>
                    </Paper>

                    {/* Payment Methods */}
                    <PaymentMethodSelect
                        selectedMethod={selectedMethod}
                        setSelectedMethod={setSelectedMethod}
                    />

                    {/* Order Summary */}
                    <Paper
                        p="md"
                        radius="md"
                        withBorder
                        bg={theme.colors.orange[0]}
                    >
                        <Stack gap="xs">
                            <Text fw={600} size="lg">
                                💰 Order Total
                            </Text>
                            <Divider />
                            <Group justify="space-between">
                                <Text>Subtotal:</Text>
                                <Text fw={600}>৳4,400</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text>Discount:</Text>
                                <Text fw={600} c="green">
                                    -৳880
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text>Shipping:</Text>
                                <Badge color="orange" variant="light">
                                    FREE
                                </Badge>
                            </Group>
                            <Divider />
                            <Group justify="space-between">
                                <Text size="lg" fw={700}>
                                    Total:
                                </Text>
                                <Text size="lg" fw={700}>
                                    ৳3,520
                                </Text>
                            </Group>
                        </Stack>
                    </Paper>

                    <Group justify="space-between" mt="md">
                        <Button
                            onClick={onBack}
                            leftSection={<IconArrowLeft size={18} />}
                            variant="outline"
                            radius="md"
                            size="md"
                            type="button"
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            radius="md"
                            size="md"
                            variant="gradient"
                            gradient={{ from: "orange", to: "red" }}
                            rightSection={<span>🔥</span>}
                            loading={isSubmitting}
                        >
                            Confirm Order
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}
