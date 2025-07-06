import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    IconUsers,
    IconBuilding,
    IconCalendarEvent,
    IconReceipt2,
    IconTrendingUp,
    IconStar,
    IconHome,
    IconCalendarStats,
    IconMapPin,
    IconChartLine,
} from "@tabler/icons-react";

const Dashboard = () => {
    const { auth } = usePage().props;
    // Top Stats with 6/3/3 grid
    const topStats = [
        {
            title: "Weekly Revenue",
            value: "$84,245",
            Icon: IconReceipt2,
            trend: "21%",
            trendPositive: true,
            bgColor: "bg-white",
            textColor: "text-gray-900",
            colSpan: "lg:col-span-6",
        },
        {
            title: "Active Bookings",
            value: "1,428",
            Icon: IconCalendarEvent,
            trend: "8%",
            trendPositive: true,
            bgColor: "bg-orange-500",
            textColor: "text-white",
            colSpan: "lg:col-span-3",
        },
        {
            title: "New Customers",
            value: "248",
            Icon: IconUsers,
            trend: "12%",
            trendPositive: true,
            bgColor: "bg-blue-950",
            textColor: "text-white",
            colSpan: "lg:col-span-3",
        },
    ];

    const stats = [
        {
            title: "Total Hotels",
            value: "248",
            icon: IconBuilding,
            trend: "12%",
            trendPositive: true,
        },
        {
            title: "Occupancy Rate",
            value: "78%",
            icon: IconHome,
            trend: "5%",
            trendPositive: true,
        },
        {
            title: "Total Revenue",
            value: "$84,245",
            icon: IconReceipt2,
            trend: "23%",
            trendPositive: true,
        },
        {
            title: "Customer Satisfaction",
            value: "4.8/5",
            icon: IconStar,
            trend: "0.2%",
            trendPositive: false,
        },
    ];

    const recentBookings = [
        {
            id: 1,
            hotel: "Grand Plaza",
            customer: "John Smith",
            date: "2023-06-15",
            status: "Confirmed",
        },
        {
            id: 2,
            hotel: "Beach Resort",
            customer: "Sarah Johnson",
            date: "2023-06-14",
            status: "Completed",
        },
        {
            id: 3,
            hotel: "Mountain View",
            customer: "Robert Chen",
            date: "2023-06-13",
            status: "Pending",
        },
    ];

    // Sample data for charts
    const revenueData = [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3000 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 2780 },
        { month: "May", revenue: 1890 },
        { month: "Jun", revenue: 8424 },
    ];

    return (
        <div>
            <Head title="Dashboard" />

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Hotel Performance Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening with your hotels
                        today.
                    </p>
                </div>

                {/* Top 6/3/3 Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                    {topStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.colSpan} ${stat.bgColor} shadow rounded-lg p-6`}
                        >
                            <div className="flex items-center">
                                <div
                                    className={`flex-shrink-0 p-3 rounded-full ${
                                        stat.bgColor === "bg-white"
                                            ? "bg-orange-100"
                                            : "bg-white bg-opacity-20"
                                    }`}
                                >
                                    <stat.Icon
                                        className={`h-6 w-6 ${
                                            stat.bgColor === "bg-white"
                                                ? "text-orange-500"
                                                : "text-white"
                                        }`}
                                    />
                                </div>
                                <div className="ml-4">
                                    <h3
                                        className={`text-sm font-medium ${stat.textColor}`}
                                    >
                                        {stat.title}
                                    </h3>
                                    <p
                                        className={`text-2xl font-bold ${stat.textColor}`}
                                    >
                                        {stat.value}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            stat.trendPositive
                                                ? stat.bgColor === "bg-white"
                                                    ? "text-green-600"
                                                    : "text-white"
                                                : stat.bgColor === "bg-white"
                                                ? "text-red-600"
                                                : "text-red-200"
                                        }`}
                                    >
                                        <span className="font-medium">
                                            {stat.trendPositive ? "+" : ""}
                                            {stat.trend}
                                        </span>{" "}
                                        from last week
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white overflow-hidden shadow rounded-lg"
                        >
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <stat.icon className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {stat.title}
                                            </dt>
                                            <dd>
                                                <div className="text-lg font-medium text-gray-900">
                                                    {stat.value}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div
                                    className={`mt-4 text-sm ${
                                        stat.trendPositive
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    <span className="font-medium">
                                        {stat.trendPositive ? "+" : ""}
                                        {stat.trend}
                                    </span>{" "}
                                    from last month
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts and Recent Bookings */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Chart with Map */}
                    <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Revenue Overview & Locations
                            </h2>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-md">
                                    Monthly
                                </button>
                                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                                    Yearly
                                </button>
                            </div>
                        </div>

                        {/* Chart Placeholder with decorative elements */}
                        <div className="h-64 bg-white rounded-md">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={revenueData}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorRevenue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#F97316"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#F97316"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: "#6b7280" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: "#6b7280" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #f3f4f6",
                                            boxShadow:
                                                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#F97316"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Chart Placeholder with decorative elements */}
                        {/* Mini map section */}
                        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                            <IconMapPin className="h-4 w-4 text-orange-500" />
                            <span>
                                Properties: Grand Plaza, Beach Resort, Mountain
                                View
                            </span>
                        </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">
                                Recent Bookings
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="px-6 py-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-orange-600">
                                                {booking.hotel}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {booking.customer}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                {booking.date}
                                            </p>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    booking.status ===
                                                    "Confirmed"
                                                        ? "bg-green-100 text-green-800"
                                                        : booking.status ===
                                                          "Completed"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 bg-gray-50 text-right">
                            <a
                                href="#"
                                className="text-sm font-medium text-orange-600 hover:text-orange-500"
                            >
                                View all bookings →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Satisfaction */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Customer Satisfaction
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <IconStar className="h-5 w-5 text-yellow-400" />
                                <span className="ml-2 text-2xl font-bold text-gray-900">
                                    4.8
                                </span>
                                <span className="ml-1 text-gray-500">/5</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    Based on 128 reviews
                                </p>
                                <p className="text-sm text-green-600 font-medium">
                                    +2.4% from last month
                                </p>
                            </div>
                        </div>
                        {/* Rating breakdown */}
                        <div className="mt-4 space-y-2">
                            {[5, 4, 3, 2, 1].map((stars) => (
                                <div key={stars} className="flex items-center">
                                    <span className="text-sm font-medium w-8">
                                        {stars} star
                                    </span>
                                    <div className="mx-2 h-2.5 w-full bg-gray-200 rounded-full">
                                        <div
                                            className="h-2.5 bg-orange-500 rounded-full"
                                            style={{ width: `${stars * 20}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-500 w-8">
                                        {stars === 5
                                            ? "64"
                                            : stars === 4
                                            ? "48"
                                            : stars === 3
                                            ? "12"
                                            : stars === 2
                                            ? "3"
                                            : "1"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <IconUsers className="h-5 w-5 text-orange-500 mr-2" />
                                <span className="text-sm font-medium">
                                    Add Customer
                                </span>
                            </button>
                            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <IconBuilding className="h-5 w-5 text-orange-500 mr-2" />
                                <span className="text-sm font-medium">
                                    New Hotel
                                </span>
                            </button>
                            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <IconCalendarStats className="h-5 w-5 text-orange-500 mr-2" />
                                <span className="text-sm font-medium">
                                    Create Booking
                                </span>
                            </button>
                            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <IconTrendingUp className="h-5 w-5 text-orange-500 mr-2" />
                                <span className="text-sm font-medium">
                                    View Reports
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Dashboard;
