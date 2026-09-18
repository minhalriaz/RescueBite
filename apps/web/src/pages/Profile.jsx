import {
  Building2,
  CheckCircle2,
  Edit3,
  HeartHandshake,
  MapPin,
  Phone,
  Users,
  Package,
  Utensils,
  Handshake,
} from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import SummaryCard from "../components/dashboard/SummaryCard";

import { getStoredUser } from "../lib/auth";

export default function Profile({ role = "donor" }) {
  const storedUser = getStoredUser();
  const resolvedRole = role || storedUser?.role || "donor";

  if (resolvedRole === "ngo") {
    return (
      <DashboardShell role="ngo">
        <p className="text-sm font-semibold text-[#0F9F76]">
          Organization Profile
        </p>
        <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
          NGO Profile
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
          Manage your organization information and contact details.
        </p>

        <section className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-md md:p-7">
          <div className="flex flex-col gap-5 border-b border-[color:var(--color-rescue-border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0F9F76]/20 bg-[#0F9F76]/15 text-[#0F9F76]">
                <Building2 size={34} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">
                  Hope Foundation Bangladesh
                </h2>
                <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                  Non-Governmental Organization
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>

          <div className="grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-2">
            <InfoItem label="Email" value="contact@hopefoundation.org" />
            <InfoItem
              label="Phone"
              value="+880 1XXX-XXXXXX"
              icon={<Phone size={15} />}
            />
            <InfoItem
              label="Location"
              value="Dhanmondi, Dhaka"
              icon={<MapPin size={15} />}
            />
            <InfoItem
              label="Registration Status"
              value="Verified"
              valueClass="text-[#0F9F76]"
              icon={<CheckCircle2 size={15} />}
            />
            <InfoItem label="Member Since" value="January 2026" />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-[color:var(--color-rescue-text)]">
              Organization Impact
            </h2>
            <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
              The difference your organization has made through RescueBite.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <SummaryCard
              title="Food Pickups"
              value="12"
              subtitle="Successful pickups"
              trend="This month"
              color="emerald"
              icon={<HeartHandshake size={22} />}
              compact
            />
            <SummaryCard
              title="Meals Received"
              value="245"
              subtitle="Meals rescued"
              trend="This month"
              color="blue"
              icon={<Building2 size={22} />}
              compact
            />
            <SummaryCard
              title="Families Supported"
              value="86"
              subtitle="Reached through aid"
              trend="Growing"
              color="orange"
              icon={<Users size={22} />}
              compact
            />
          </div>
        </section>
      </DashboardShell>
    );
  }

  if (resolvedRole === "volunteer") {
    return <VolunteerProfile user={storedUser} />;
  }

  return <DonorProfile />;
}

function InfoItem({
  label,
  value,
  icon,
  valueClass = "text-[color:var(--color-rescue-text)]",
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-rescue-text-muted)]">
        {label}
      </p>
      <p
        className={`mt-1 flex items-center gap-1.5 text-sm font-semibold ${valueClass}`}
      >
        {icon}
        {value}
      </p>
    </div>
  );
}

function DonorProfile() {
  const user = getStoredUser();
  const fullName = user?.name || "Donor";
  const email = user?.email || "donor@example.com";

  return (
    <DashboardShell role="donor">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0F9F76]">
        Personal Account
      </p>
      <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
        My Profile
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
        Manage your personal information and donation activity.
      </p>

      <section className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-md md:p-7">
        <div className="flex flex-col gap-5 border-b border-[color:var(--color-rescue-border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0F9F76]/20 bg-[#0F9F76]/15 text-2xl font-bold text-[#0F9F76]">
              D
            </div>
            <div>
              <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">
                {fullName}
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                Food Donor
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0F9F76]/15 px-2.5 py-1 text-xs font-semibold text-[#0F9F76]">
                <CheckCircle2 size={13} /> Verified
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
        <div className="grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-2">
          <InfoItem label="Full Name" value={fullName} />
          <InfoItem label="Email Address" value={email} />
          <InfoItem
            label="Phone Number"
            value="+880 1XXX-XXXXXX"
            icon={<Phone size={15} />}
          />
          <InfoItem
            label="Location"
            value="Dhaka, Bangladesh"
            icon={<MapPin size={15} />}
          />
          <InfoItem label="Member Since" value="January 2026" />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[color:var(--color-rescue-text)]">
            Your Impact
          </h2>
          <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
            A summary of your contribution to reducing food waste.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Active Donations"
            value="8"
            subtitle="Currently active"
            trend="+2"
            color="emerald"
            icon={<Package size={22} />}
          />
          <SummaryCard
            title="Completed Donations"
            value="24"
            subtitle="Successfully delivered"
            trend="+5"
            color="blue"
            icon={<CheckCircle2 size={22} />}
          />
          <SummaryCard
            title="NGOs Reached"
            value="12"
            subtitle="Partner organizations"
            trend="+1"
            color="violet"
            icon={<Building2 size={22} />}
          />
          <SummaryCard
            title="Meals Saved"
            value="420"
            subtitle="Food rescued"
            trend="+36"
            color="orange"
            icon={<HeartHandshake size={22} />}
          />
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-md md:p-6">
        <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">
          Recent Activity
        </h2>
        <div className="mt-5 divide-y divide-[color:var(--color-rescue-border)]">
          <Activity
            icon={<Utensils size={18} />}
            title="Donated Chicken Biryani"
            detail="15 meals · Dhanmondi, Dhaka"
          />
          <Activity
            icon={<CheckCircle2 size={18} />}
            title="Donation completed"
            detail="Vegetable Khichuri was successfully delivered"
          />
          <Activity
            icon={<Handshake size={18} />}
            title="NGO request accepted"
            detail="Bread and Pastries donation was requested"
          />
        </div>
      </section>
    </DashboardShell>
  );
}

function VolunteerProfile({ user }) {
  const fullName = user?.name || "Volunteer";
  const email = user?.email || "Not set";
  const phone = user?.phone || "Not set";
  const location = user?.location || "Not set";

  return (
    <DashboardShell role="volunteer">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0F9F76]">
        Volunteer Account
      </p>
      <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
        Volunteer Profile
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
        Manage your volunteer details and rescue availability.
      </p>

      <section className="mt-6 rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-md md:p-7">
        <div className="flex flex-col gap-5 border-b border-[color:var(--color-rescue-border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0F9F76]/20 bg-[#0F9F76]/15 text-2xl font-bold text-[#0F9F76]">
              V
            </div>
            <div>
              <h2 className="text-xl font-bold text-[color:var(--color-rescue-text)]">
                {fullName}
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                Volunteer
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#0F9F76]/15 px-2.5 py-1 text-xs font-semibold text-[#0F9F76]">
                <CheckCircle2 size={13} /> Active
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        </div>
        <div className="grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-2">
          <InfoItem label="Full Name" value={fullName} />
          <InfoItem label="Email Address" value={email} />
          <InfoItem
            label="Phone Number"
            value={phone}
            icon={<Phone size={15} />}
          />
          <InfoItem
            label="Location"
            value={location}
            icon={<MapPin size={15} />}
          />
          <InfoItem
            label="Availability"
            value="Open for pickups"
            valueClass="text-[#0F9F76]"
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[color:var(--color-rescue-text)]">
            Volunteer Impact
          </h2>
          <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
            Your recent food rescue activity and route progress.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Assigned Pickups"
            value="3"
            subtitle="Current routes"
            trend="Today"
            color="emerald"
            icon={<Package size={22} />}
          />
          <SummaryCard
            title="Completed Pickups"
            value="12"
            subtitle="Rescued successfully"
            trend="This month"
            color="blue"
            icon={<CheckCircle2 size={22} />}
          />
          <SummaryCard
            title="Meals Delivered"
            value="282"
            subtitle="Meals moved"
            trend="Growing"
            color="violet"
            icon={<HeartHandshake size={22} />}
          />
          <SummaryCard
            title="Active Routes"
            value="5"
            subtitle="Available this week"
            trend="Live"
            color="orange"
            icon={<MapPin size={22} />}
          />
        </div>
      </section>
    </DashboardShell>
  );
}

function Activity({ icon, title, detail }) {
  return (
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F9F76]/15 text-[#0F9F76]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-[color:var(--color-rescue-text)]">
          {title}
        </p>
        <p className="mt-1 text-xs text-[color:var(--color-rescue-text-muted)]">
          {detail}
        </p>
      </div>
    </div>
  );
}
