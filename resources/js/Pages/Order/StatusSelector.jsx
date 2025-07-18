import { Select, Badge, ActionIcon, Group } from "@mantine/core";
import {
    IconEdit,
    IconCheck,
    IconX,
    IconCash,
    IconClock,
} from "@tabler/icons-react";
import { useState } from "react";

const StatusSelector = ({ currentStatus, orderId, onStatusChange }) => {
    const [status, setStatus] = useState(currentStatus);
    const [editing, setEditing] = useState(false);

    const statusOptions = [
        {
            value: "paid",
            label: "Paid",
            color: "green",
            icon: <IconCheck size={14} />,
        },
        {
            value: "unpaid",
            label: "Unpaid",
            color: "red",
            icon: <IconX size={14} />,
        },
        {
            value: "pending",
            label: "Pending",
            color: "yellow",
            icon: <IconClock size={14} />,
        },
        {
            value: "cash_on_delivery",
            label: "Cash on Delivery",
            color: "orange",
            icon: <IconCash size={14} />,
        },
    ];

    const handleChange = (newStatus) => {
        setStatus(newStatus);
        setEditing(false);
        onStatusChange(orderId, newStatus);
    };

    if (editing) {
        return (
            <Select
                value={status}
                onChange={handleChange}
                data={statusOptions.map((option) => ({
                    value: option.value,
                    label: (
                        <Group spacing="xs">
                            {option.icon}
                            <span>{option.label}</span>
                        </Group>
                    ),
                }))}
                styles={{
                    item: {
                        // This will style the items in the dropdown
                        "&[data-selected]": {
                            "&, &:hover": {
                                backgroundColor:
                                    statusOptions.find(
                                        (o) => o.value === status
                                    )?.color + ".1",
                            },
                        },
                    },
                }}
                autoFocus
                onBlur={() => setEditing(false)}
                withinPortal
            />
        );
    }

    const currentOption =
        statusOptions.find((opt) => opt.value === status) || statusOptions[1];

    return (
        <Group spacing="xs" noWrap>
            <Badge
                color={currentOption.color}
                variant="light"
                leftSection={currentOption.icon}
                sx={{ cursor: "pointer" }}
                onClick={() => setEditing(true)}
            >
                {currentOption.label}
            </Badge>
            <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => setEditing(true)}
            >
                <IconEdit size={14} />
            </ActionIcon>
        </Group>
    );
};
export default StatusSelector;
