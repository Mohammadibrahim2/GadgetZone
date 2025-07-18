import {
    Select,
    Paper,
    Stack,
    Text,
    Divider,
    TextInput,
    Group,
    Image,
    rem,
    useMantineTheme,
    Box,
} from "@mantine/core";
import {
    IconPhone,
    IconCreditCard,
    IconChevronDown,
} from "@tabler/icons-react";
import { useState } from "react";

const paymentMethods = [
    {
        value: "bkash",
        label: "bKash",
        logo: "https://download.logo.wine/logo/BKash/BKash-Icon-Logo.wine.png",
        color: "#e2136e",
        description: "Mobile financial service by bKash Ltd.",
    },
    {
        value: "nagad",
        label: "Nagad",
        logo: "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png",
        color: "#00a651",
        description: "Digital financial service by Nagad",
    },
    {
        value: "rocket",
        label: "Rocket",
        logo: "https://images.seeklogo.com/logo-png/31/1/dutch-bangla-rocket-logo-png_seeklogo-317692.png",
        color: "#0033a0",
        description: "DBBL Mobile Banking",
    },
    {
        value: "cash",
        label: "Cash on Delivery",
        logo: null,
        color: "#ff6b00",
        description: "Pay when you receive your order",
    },
];

export function PaymentMethodSelect({ selectedMethod, setSelectedMethod }) {
    const theme = useMantineTheme();
    const selectedData = paymentMethods.find((m) => m.value === selectedMethod);

    return (
        <Paper p="lg" radius="md" withBorder>
            <Stack gap="md">
                <Text size="lg" fw={600}>
                    Select Payment Method
                </Text>
                <Divider />

                <Select
                    value={selectedMethod}
                    onChange={setSelectedMethod}
                    placeholder="Choose payment option"
                    rightSection={<IconChevronDown size={16} />}
                    itemComponent={({ label, value, ...others }) => {
                        const method = paymentMethods.find(
                            (m) => m.value === value
                        );
                        return (
                            <Group {...others} noWrap spacing="sm">
                                {method.logo ? (
                                    <Image
                                        src={method.logo}
                                        width={24}
                                        height={24}
                                        fit="contain"
                                        alt=""
                                    />
                                ) : (
                                    <Box
                                        w={24}
                                        h={24}
                                        bg={theme.colors.gray[1]}
                                        display="flex"
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 4,
                                        }}
                                    >
                                        <IconCreditCard
                                            size={16}
                                            color={theme.colors.gray[6]}
                                        />
                                    </Box>
                                )}
                                <div>
                                    <Text size="sm">{label}</Text>
                                    <Text size="xs" color="dimmed">
                                        {method.description}
                                    </Text>
                                </div>
                            </Group>
                        );
                    }}
                    styles={{
                        item: {
                            padding: `${rem(10)} ${rem(12)}`,
                            "&[data-selected]": {
                                "&, &:hover": {
                                    backgroundColor: theme.colors.blue[0],
                                },
                            },
                        },
                        input: {
                            paddingLeft: rem(50),
                            height: rem(56),
                        },
                        rightSection: {
                            pointerEvents: "none",
                        },
                    }}
                    leftSection={
                        selectedData &&
                        (selectedData.logo ? (
                            <Image
                                src={selectedData.logo}
                                width={32}
                                height={32}
                                fit="contain"
                                alt=""
                                style={{ borderRadius: 4 }}
                            />
                        ) : (
                            <Box
                                w={32}
                                h={32}
                                bg={theme.colors.gray[1]}
                                display="flex"
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 4,
                                }}
                            >
                                <IconCreditCard
                                    size={20}
                                    color={theme.colors.gray[6]}
                                />
                            </Box>
                        ))
                    }
                    data={paymentMethods.map((method) => ({
                        value: method.value,
                        label: method.label,
                    }))}
                />

                {selectedData && (
                    <Text size="sm" c="dimmed" mt={-8}>
                        {selectedData.description}
                    </Text>
                )}

                {selectedMethod &&
                    ["bkash", "nagad", "rocket"].includes(selectedMethod) && (
                        <>
                            <TextInput
                                label="Mobile Number"
                                placeholder="01XXXXXXXXX"
                                required
                                leftSection={<IconPhone size={18} />}
                                styles={{
                                    input: {
                                        borderLeft: `3px solid ${selectedData.color}`,
                                    },
                                }}
                            />
                            <TextInput
                                label="Transaction ID"
                                placeholder="Enter payment transaction ID"
                                required
                                leftSection={
                                    <Image
                                        src={selectedData.logo}
                                        width={18}
                                        height={18}
                                        fit="contain"
                                        alt=""
                                    />
                                }
                                styles={{
                                    input: {
                                        borderLeft: `3px solid ${selectedData.color}`,
                                    },
                                }}
                            />
                        </>
                    )}
            </Stack>
        </Paper>
    );
}
