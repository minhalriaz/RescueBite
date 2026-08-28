import DashboardShell from "../components/dashboard/DashboardShell";
import { CheckCircle2, Clock3, MapPin, PackageCheck, Truck } from "lucide-react";
import SummaryCard from "../components/dashboard/SummaryCard";

const requests = [
  {
    title: "Cooked Rice and Curry",
    foodType: "Cooked Food",
    quantity: "15 meals",
    location: "Dhanmondi, Dhaka",
    status: "Pending",
    timingLabel: "Requested",
    timing: "Today",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Bread and Snacks",
    foodType: "Bakery",
    quantity: "20 packs",
    location: "Mirpur, Dhaka",
    status: "Approved",
    timingLabel: "Pickup",
    timing: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Vegetable Khichuri",
    foodType: "Cooked Food",
    quantity: "30 meals",
    location: "Mohammadpur, Dhaka",
    status: "Completed",
    timingLabel: "Completed",
    timing: "Yesterday",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const statusIcons = {
  Pending: Clock3,
  Approved: Truck,
  Completed: CheckCircle2,
};

const summaryCards = [
  { title: "Pending", value: "1", subtitle: "1 request", trend: "Needs action", color: "orange", icon: <Clock3 size={19} /> },
  { title: "Approved", value: "1", subtitle: "1 request", trend: "Scheduled", color: "blue", icon: <Truck size={19} /> },
  { title: "Completed", value: "1", subtitle: "1 request", trend: "Delivered", color: "emerald", icon: <PackageCheck size={19} /> },
];

export default function NGORequests() {
  return (
    <DashboardShell role="ngo">
      <p className="text-sm font-semibold text-emerald-600">Pickup coordination</p>
      <h1 className="mt-1 text-3xl font-bold text-gray-900">My Pickup Requests</h1>
      <p className="mt-2 text-sm text-gray-500">Track your food pickup requests and their current status.</p>

      <section className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => <SummaryCard key={card.title} {...card} compact />)}
      </section>

      <section className="mt-8 grid w-[calc(100%+1rem)] grid-cols-1 gap-5 md:w-[calc(100%+1.5rem)] md:grid-cols-2 lg:w-[calc(100%+2rem)] xl:grid-cols-3">
        {requests.map((request) => (
          <article key={request.title} className="flex min-h-[190px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <div className="w-32 shrink-0 bg-emerald-50 sm:w-40">
              <img src={request.image} alt={request.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">{request.foodType}</p>
                  <h2 className="mt-1 text-lg font-bold leading-tight text-gray-900">{request.title}</h2>
                </div>
                <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[request.status]}`}>
                  {(() => { const StatusIcon = statusIcons[request.status]; return <StatusIcon size={12} />; })()}
                  {request.status}
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                <p><span className="font-semibold text-gray-700">Quantity:</span> {request.quantity}</p>
                <p className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-500" />{request.location}</p>
                <p><span className="font-semibold text-gray-700">{request.timingLabel}:</span> {request.timing}</p>
              </div>
              <button type="button" className="mt-auto w-fit rounded-xl border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50">View Details</button>
            </div>
          </article>
        ))}
      </section>
    </DashboardShell>
  );
}
