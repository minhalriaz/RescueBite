import { Bell, ArrowRight } from "lucide-react";
import NotificationItem from "./NotificationItem";

const notifications = [
    {
        id: 1,
        ngo: "Green Hope NGO",
        message: "Requested pickup for your food donation.",
        time: "5 mins ago",
        color: "bg-emerald-500",
    },
    {
        id: 2,
        ngo: "Food Bank Dhaka",
        message: "Accepted Donation #RB-1204.",
        time: "25 mins ago",
        color: "bg-blue-500",
    },
    {
        id: 3,
        ngo: "Smile Foundation",
        message: "Needs emergency meals nearby.",
        time: "1 hour ago",
        color: "bg-orange-500",
    },
];

export default function NotificationSection() {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">

                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-emerald-600" />

                    <h2 className="text-lg font-semibold text-gray-800">
                        NGO Notifications
                    </h2>
                </div>

                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                    View All
                </button>

            </div>

            {/* Notification List */}
            <div className="divide-y divide-gray-100">

                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        {...notification}
                    />
                ))}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 flex justify-center">

                <button className="flex items-center gap-2 font-semibold text-emerald-600 hover:text-emerald-700 transition">

                    See All Notifications

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>
    );
}