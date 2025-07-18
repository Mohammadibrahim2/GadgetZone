import { Chip, Badge } from "@mantine/core";
import {
    IconAlertCircle,
    IconCircleCheck,
    IconClock,
    IconTruckDelivery,
    IconArrowBack,
    IconCoin,
} from "@tabler/icons-react";

const PaymentStatusChip = ({ status }) => {
    const statusConfig = {
        paid: {
            color: "green",
            icon: <IconCircleCheck size={14} />,
            label: "Paid",
        },
        unpaid: {
            color: "red",
            icon: <IconAlertCircle size={14} />,
            label: "Unpaid",
        },
        pending: {
            color: "orange",
            icon: <IconClock size={14} />,
            label: "Pending",
        },
        cash_on_delivery: {
            color: "blue",
            icon: <IconTruckDelivery size={14} />,
            label: "Cash on Delivery",
        },
        refunded: {
            color: "violet",
            icon: <IconArrowBack size={14} />,
            label: "Refunded",
        },
        partially_paid: {
            color: "yellow",
            icon: <IconCoin size={14} />,
            label: "Partially Paid",
        },
    };

    const config = statusConfig[status] || statusConfig.unpaid;

    return (
        <Badge
            leftSection={config.icon}
            color={config.color}
            variant="light"
            radius="sm"
            size="md"
        >
            {config.label}
        </Badge>
    );
};
export default PaymentStatusChip;
