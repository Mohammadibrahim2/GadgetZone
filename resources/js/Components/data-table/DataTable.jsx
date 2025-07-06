import { Table, Checkbox, Box, Paper, Text, Flex } from "@mantine/core";
import { Pagination } from "./Pagination";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useMemo, useState } from "react";

// Mock data generator function
const generateMockData = (count = 5) => {
    const mockData = [];
    for (let i = 1; i <= count; i++) {
        mockData.push({
            id: i,
            name: `Customer ${i}`,
            email: `customer${i}@example.com`,
            phone: `+1 (555) ${Math.floor(
                1000 + Math.random() * 9000
            )}-${Math.floor(1000 + Math.random() * 9000)}`,
            status: ["active", "inactive", "pending"][
                Math.floor(Math.random() * 3)
            ],
            createdAt: new Date(
                Date.now() - Math.floor(Math.random() * 10000000000)
            ).toISOString(),
            // Add more fields as needed
        });
    }
    return mockData;
};
const categories = [
    {
        name: "Logistic",
        code: "CT003",
        description: "Efficient Productivity",
        status: "Active",
    },
    {
        name: "Desktop",
        code: "CT002",
        description: "Compact Design",
        status: "Active",
    },
    {
        name: "Sneakers",
        code: "CT003",
        description: "Dynamic Clip",
        status: "Active",
    },
    {
        name: "Wearables",
        code: "CT005",
        description: "Soundless Connectivity",
        status: "Active",
    },
    {
        name: "Speakers",
        code: "CT006",
        description: "Reliable Sound",
        status: "Active",
    },
    {
        name: "Handbags",
        code: "CT007",
        description: "Compact Carry",
        status: "Active",
    },
    {
        name: "Sofa",
        code: "CT009",
        description: "Cary Comfort",
        status: "Active",
    },
    {
        name: "Chair",
        code: "CT0010",
        description: "Stylish Comfort",
        status: "Active",
    },
];
const DataTable = ({
    data,
    columns,
    pagination,
    onPageChange,
    onPerPageChange,
    onSortChange,
    onRowClick,
    selectable = false,
    loading = false,
    emptyState,
    className,
}) => {
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("desc");

    // Use provided data or fallback to mock data
    const tableData = data || generateMockData(6); // Default to 6 mock items if no data provided

    const handleSort = (columnId) => {
        const direction =
            sortColumn === columnId && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(columnId);
        setSortDirection(direction);
        onSortChange?.(columnId, direction);
    };

    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedData = useMemo(() => tableData, [tableData]); // Use tableData here

    return (
        <Box className={className}>
            <Paper withBorder radius="md" className="overflow-hidden">
                <Box className="overflow-x-auto">
                    <Table striped highlightOnHover>
                        <Table.Thead className="bg-gray-50">
                            <Table.Tr>
                                {selectable && (
                                    <Table.Th style={{ width: 40 }}>
                                        <Checkbox
                                            checked={
                                                selectedRows.size ===
                                                    tableData.length &&
                                                tableData.length > 0
                                            }
                                            indeterminate={
                                                selectedRows.size > 0 &&
                                                selectedRows.size <
                                                    tableData.length
                                            }
                                            onChange={() => {
                                                const newSelected = new Set(
                                                    selectedRows.size ===
                                                    tableData.length
                                                        ? []
                                                        : tableData.map(
                                                              (item) => item.id
                                                          )
                                                );
                                                setSelectedRows(newSelected);
                                            }}
                                        />
                                    </Table.Th>
                                )}
                                {memoizedColumns.map((column) => (
                                    <Table.Th
                                        key={column.id}
                                        className={`text-gray-600 ${
                                            column.sortable
                                                ? "cursor-pointer"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            column.sortable &&
                                            handleSort(column.id)
                                        }
                                    >
                                        <Flex align="center" gap={4}>
                                            {column.header}
                                            {column.sortable &&
                                                sortColumn === column.id &&
                                                (sortDirection === "asc" ? (
                                                    <IconChevronUp size={14} />
                                                ) : (
                                                    <IconChevronDown
                                                        size={14}
                                                    />
                                                ))}
                                        </Flex>
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {memoizedData.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td
                                        colSpan={
                                            columns.length +
                                            (selectable ? 1 : 0)
                                        }
                                    >
                                        {emptyState || (
                                            <Box className="py-12 text-center">
                                                <Text color="dimmed">
                                                    No data available
                                                </Text>
                                            </Box>
                                        )}
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                memoizedData.map((item) => (
                                    <Table.Tr
                                        key={item.id}
                                        className={
                                            onRowClick
                                                ? "cursor-pointer hover:bg-gray-50"
                                                : ""
                                        }
                                        onClick={() => onRowClick?.(item)}
                                    >
                                        {selectable && (
                                            <Table.Td
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Checkbox
                                                    checked={selectedRows.has(
                                                        item.id
                                                    )}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        const newSelected =
                                                            new Set(
                                                                selectedRows
                                                            );
                                                        newSelected.has(item.id)
                                                            ? newSelected.delete(
                                                                  item.id
                                                              )
                                                            : newSelected.add(
                                                                  item.id
                                                              );
                                                        setSelectedRows(
                                                            newSelected
                                                        );
                                                    }}
                                                />
                                            </Table.Td>
                                        )}
                                        {memoizedColumns.map((column) => (
                                            <Table.Td
                                                key={`${item.id}-${column.id}`}
                                            >
                                                {column.cell
                                                    ? column.cell(item)
                                                    : item[column.accessorKey]}
                                            </Table.Td>
                                        ))}
                                    </Table.Tr>
                                ))
                            )}
                        </Table.Tbody>
                    </Table>
                </Box>
                {/* 
                {pagination && (
                    <Pagination
                        pagination={pagination}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )} */}
            </Paper>
        </Box>
    );
};

export default DataTable;
