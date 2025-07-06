import { Group, Button, Text, Select, Box } from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "@tabler/icons-react";

export function Pagination({
    pagination,
    onPageChange,
    onPerPageChange,
    perPageOptions = [10, 25, 50, 100],
    showPerPage = true,
}) {
    const { current_page, per_page, total, last_page } = pagination;

    const from = Math.min((current_page - 1) * per_page + 1, total);
    const to = Math.min(current_page * per_page, total);

    const handlePageChange = (page) => {
        if (page < 1 || page > last_page) return;
        onPageChange(page);
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (last_page <= maxVisiblePages) {
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(
                1,
                current_page - Math.floor(maxVisiblePages / 2)
            );
            const endPage = Math.min(
                last_page,
                startPage + maxVisiblePages - 1
            );

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) pages.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < last_page) {
                if (endPage < last_page - 1) pages.push("...");
                pages.push(last_page);
            }
        }

        return pages;
    };

    return (
        <Box className="border-t border-gray-200 px-4 py-3">
            <Group justify="space-between">
                <Text size="sm" color="dimmed">
                    Showing {from} to {to} of {total} entries
                </Text>

                <Group gap="xs">
                    {showPerPage && (
                        <Group gap={4}>
                            <Text size="sm">Rows per page:</Text>
                            <Select
                                value={per_page.toString()}
                                onChange={(value) =>
                                    onPerPageChange(Number(value))
                                }
                                data={perPageOptions.map((value) => ({
                                    value: value.toString(),
                                    label: value.toString(),
                                }))}
                                size="xs"
                                style={{ width: 70 }}
                            />
                        </Group>
                    )}

                    <Group gap={4}>
                        <Button
                            variant="subtle"
                            size="sm"
                            px={8}
                            disabled={current_page === 1}
                            onClick={() => handlePageChange(1)}
                        >
                            <IconChevronsLeft size={16} />
                        </Button>
                        <Button
                            variant="subtle"
                            size="sm"
                            px={8}
                            disabled={current_page === 1}
                            onClick={() => handlePageChange(current_page - 1)}
                        >
                            <IconChevronLeft size={16} />
                        </Button>

                        {generatePageNumbers().map((page, index) => (
                            <Button
                                key={index}
                                variant={
                                    page === current_page ? "filled" : "subtle"
                                }
                                size="sm"
                                px={8}
                                onClick={() =>
                                    typeof page === "number" &&
                                    handlePageChange(page)
                                }
                                disabled={typeof page !== "number"}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="subtle"
                            size="sm"
                            px={8}
                            disabled={current_page === last_page}
                            onClick={() => handlePageChange(current_page + 1)}
                        >
                            <IconChevronRight size={16} />
                        </Button>
                        <Button
                            variant="subtle"
                            size="sm"
                            px={8}
                            disabled={current_page === last_page}
                            onClick={() => handlePageChange(last_page)}
                        >
                            <IconChevronsRight size={16} />
                        </Button>
                    </Group>
                </Group>
            </Group>
        </Box>
    );
}
