import { Building2, CheckCircle2, Edit3, HeartHandshake, MapPin, Phone, Users, Package, Utensils, Handshake } from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import SummaryCard from "../components/dashboard/SummaryCard";

export default function Profile({ role = "donor" }) {
    if (role !== "ngo") {
        return <DonorProfile />;
    }

    return (
        <DashboardShell role="ngo">
            <p className="text-sm font-semibold text-emerald-600">Organization Profile</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">NGO Profile</h1>
            <p className="mt-2 text-sm text-gray-500">Manage your organization information and contact details.</p>

            <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-md md:p-7">
                <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-50 text-emerald-600">
                            <Building2 size={34} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Hope Foundation Bangladesh</h2>
                            <p className="mt-1 text-sm text-gray-500">Non-Governmental Organization</p>
                        </div>
                    </div>
                    <button type="button" className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                        <Edit3 size={16} /> Edit Profile
                    </button>
                </div>

                <div className="grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-2">
                    <InfoItem label="Email" value="contact@hopefoundation.org" />
                    <InfoItem label="Phone" value="+880 1XXX-XXXXXX" icon={<Phone size={15} />} />
                    <InfoItem label="Location" value="Dhanmondi, Dhaka" icon={<MapPin size={15} />} />
                    <InfoItem label="Registration Status" value="Verified" valueClass="text-emerald-600" icon={<CheckCircle2 size={15} />} />
                    <InfoItem label="Member Since" value="January 2026" />
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-4"><h2 className="text-2xl font-bold text-gray-900">Organization Impact</h2><p className="mt-1 text-sm text-gray-500">The difference your organization has made through RescueBite.</p></div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <SummaryCard title="Food Pickups" value="12" subtitle="Successful pickups" trend="This month" color="emerald" icon={<HeartHandshake size={22} />} compact />
                    <SummaryCard title="Meals Received" value="245" subtitle="Meals rescued" trend="This month" color="blue" icon={<Building2 size={22} />} compact />
                    <SummaryCard title="Families Supported" value="86" subtitle="Reached through aid" trend="Growing" color="orange" icon={<Users size={22} />} compact />
                </div>
            </section>
        </DashboardShell>
    );
}

function InfoItem({ label, value, icon, valueClass = "text-gray-900" }) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
            <p className={`mt-1 flex items-center gap-1.5 text-sm font-semibold ${valueClass}`}>{icon}{value}</p>
        </div>
    );
}

function DonorProfile() {
    return (
        <DashboardShell role="donor">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Personal Account</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="mt-2 text-sm text-gray-500">Manage your personal information and donation activity.</p>

            <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-md md:p-7">
                <div className="flex flex-col gap-5 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-50 text-2xl font-bold text-emerald-700">D</div>
                        <div><h2 className="text-xl font-bold text-gray-900">Donor</h2><p className="mt-1 text-sm text-gray-500">Food Donor</p><span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"><CheckCircle2 size={13} /> Verified</span></div>
                    </div>
                    <button type="button" className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"><Edit3 size={16} /> Edit Profile</button>
                </div>
                <div className="grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-2">
                    <InfoItem label="Full Name" value="Donor" />
                    <InfoItem label="Email Address" value="donor@example.com" />
                    <InfoItem label="Phone Number" value="+880 1XXX-XXXXXX" icon={<Phone size={15} />} />
                    <InfoItem label="Location" value="Dhaka, Bangladesh" icon={<MapPin size={15} />} />
                    <InfoItem label="Member Since" value="January 2026" />
                </div>
            </section>

            <section className="mt-8">
                <div className="mb-4"><h2 className="text-2xl font-bold text-gray-900">Your Impact</h2><p className="mt-1 text-sm text-gray-500">A summary of your contribution to reducing food waste.</p></div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard title="Active Donations" value="8" subtitle="Currently active" trend="+2" color="emerald" icon={<Package size={22} />} />
                    <SummaryCard title="Completed Donations" value="24" subtitle="Successfully delivered" trend="+5" color="blue" icon={<CheckCircle2 size={22} />} />
                    <SummaryCard title="NGOs Reached" value="12" subtitle="Partner organizations" trend="+1" color="violet" icon={<Building2 size={22} />} />
                    <SummaryCard title="Meals Saved" value="420" subtitle="Food rescued" trend="+36" color="orange" icon={<HeartHandshake size={22} />} />
                </div>
            </section>

            <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-md md:p-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <div className="mt-5 divide-y divide-gray-100">
                    <Activity icon={<Utensils size={18} />} title="Donated Chicken Biryani" detail="15 meals · Dhanmondi, Dhaka" />
                    <Activity icon={<CheckCircle2 size={18} />} title="Donation completed" detail="Vegetable Khichuri was successfully delivered" />
                    <Activity icon={<Handshake size={18} />} title="NGO request accepted" detail="Bread and Pastries donation was requested" />
                </div>
            </section>
        </DashboardShell>
    );
}

function Activity({ icon, title, detail }) {
    return <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">{icon}</div><div><p className="text-sm font-semibold text-gray-800">{title}</p><p className="mt-1 text-xs text-gray-500">{detail}</p></div></div>;
}