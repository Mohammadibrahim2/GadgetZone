import { ActionIcon, Tooltip, Group, Menu } from "@mantine/core";
import {
    IconEdit,
    IconEye,
    IconTrash,
    IconDotsVertical,
    IconFileDownload,
    IconShare,
    IconCopy,
} from "@tabler/icons-react";

export function ActionButtons({
    onEdit,
    onDelete,
    onView,
    onDownload,
    onShare,
    onCopy,
    showEdit = true,
    showDelete = true,
    showView = false,
    showDownload = false,
    showShare = false,
    showCopy = false,
    compact = false,
}) {
    if (compact) {
        return (
            <Menu position="bottom-end" shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="subtle" color="gray">
                        <IconDotsVertical size={16} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    {showView && (
                        <Menu.Item
                            leftSection={<IconEye size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onView?.();
                            }}
                        >
                            View
                        </Menu.Item>
                    )}
                    {showEdit && (
                        <Menu.Item
                            leftSection={<IconEdit size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.();
                            }}
                        >
                            Edit
                        </Menu.Item>
                    )}
                    {showCopy && (
                        <Menu.Item
                            leftSection={<IconCopy size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopy?.();
                            }}
                        >
                            Copy
                        </Menu.Item>
                    )}
                    {showDownload && (
                        <Menu.Item
                            leftSection={<IconFileDownload size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownload?.();
                            }}
                        >
                            Download
                        </Menu.Item>
                    )}
                    {showShare && (
                        <Menu.Item
                            leftSection={<IconShare size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onShare?.();
                            }}
                        >
                            Share
                        </Menu.Item>
                    )}
                    {showDelete && (
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash size={14} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.();
                            }}
                        >
                            Delete
                        </Menu.Item>
                    )}
                </Menu.Dropdown>
            </Menu>
        );
    }

    return (
        <Group gap={4} wrap="nowrap">
            {showView && (
                <Tooltip label="View">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            onView?.();
                        }}
                    >
                        <IconEye size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
            {showEdit && (
                <Tooltip label="Edit">
                    <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.();
                        }}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
            {showCopy && (
                <Tooltip label="Copy">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCopy?.();
                        }}
                    >
                        <IconCopy size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
            {showDownload && (
                <Tooltip label="Download">
                    <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDownload?.();
                        }}
                    >
                        <IconFileDownload size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
            {showShare && (
                <Tooltip label="Share">
                    <ActionIcon
                        variant="subtle"
                        color="violet"
                        onClick={(e) => {
                            e.stopPropagation();
                            onShare?.();
                        }}
                    >
                        <IconShare size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
            {showDelete && (
                <Tooltip label="Delete">
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.();
                        }}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Tooltip>
            )}
        </Group>
    );
}
