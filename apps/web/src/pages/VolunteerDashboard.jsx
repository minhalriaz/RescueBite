import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import { getStoredUser } from "../lib/auth";

export default function VolunteerDashboard() {
  const user = getStoredUser();

  return (
    <DashboardShell role="volunteer">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section - charcoal/black with green accent */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a0f15] via-[#080b0d] to-[#0c121a] px-6 py-8 text-white shadow-xl md:px-9 md:py-10">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-[#0F9F76]/10" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F9F76]/15 border border-[#0F9F76]/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#34D399] backdrop-blur-sm">
                <Sparkles size={14} />
                RescueBite Volunteer
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Welcome back,
                <span className="block text-[#34D399]">
                  {user?.name || "Volunteer"}
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-base">
                Be part of the movement that connects surplus food with
                communities that need it most. Your volunteer workspace is
                ready for upcoming RescueBite activities.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#0F9F76]/25">
                  <CheckCircle2 size={17} />
                  Account Active
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-[#0F9F76]/30 bg-[#0F9F76]/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                  <ShieldCheck size={17} className="text-[#34D399]" />
                  Volunteer Access
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 text-[color:var(--color-rescue-text)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F9F76]">
                Volunteer Profile
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#0F9F76] bg-[#0F9F76]/15 font-black text-[#0F9F76]">
                  {(user?.name || "V").charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-[color:var(--color-rescue-text)]">
                    {user?.name || "Volunteer"}
                  </p>
                  <p className="truncate text-sm text-[color:var(--color-rescue-text-muted)]">
                    {user?.email || "Volunteer account"}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-[color:var(--color-rescue-border)] pt-4">
                <div className="flex items-center gap-2 text-sm text-[color:var(--color-rescue-text-muted)]">
                  <MapPin size={16} className="text-[#0F9F76]" />
                  <span>
                    {user?.service_area || "Service area not configured"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            icon={<Bike size={24} />}
            iconBox="bg-[#0F9F76]/15 text-[#0F9F76]"
            label="Account Type"
            value="Volunteer"
          />
          <OverviewCard
            icon={<MapPin size={24} />}
            iconBox="bg-[#0F9F76]/15 text-[#0F9F76]"
            label="Service Area"
            value={user?.service_area || "Not Set"}
          />
          <OverviewCard
            icon={<Clock3 size={24} />}
            iconBox="bg-[#0F9F76]/15 text-[#0F9F76]"
            label="Current Status"
            value="Ready to Help"
          />
          <OverviewCard
            icon={<HeartHandshake size={24} />}
            iconBox="bg-[#0F9F76]/15 text-[#0F9F76]"
            label="Rescue Network"
            value="Connected"
          />
        </section>

        {/* Main Content */}
        <section className="mt-7 grid gap-6 xl:grid-cols-3">
          {/* Volunteer Journey */}
          <div className="xl:col-span-2 rounded-[2rem] border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 shadow-sm md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F9F76]">
                  Volunteer Journey
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[color:var(--color-rescue-text)]">
                  How volunteering works
                </h2>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#0F9F76]/15 text-[#0F9F76] sm:flex">
                <HeartHandshake size={22} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
            <JourneyStep step={1} title="Stay connected with RescueBite">
                Your volunteer account keeps you connected with the
                RescueBite food-rescue ecosystem.
              </JourneyStep>

              <JourneyStep step={2} title="Receive future volunteer opportunities">
                Pickup and rescue assignment features can be integrated
                here as the RescueBite platform grows.
              </JourneyStep>

              <JourneyStep step={3} title="Support successful food rescue">
                Volunteers can become an important connection between
                donors, NGOs, and rescued food.
              </JourneyStep>
            </div>
          </div>

          {/* Account Information */}
          <div className="rounded-[2rem] border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 shadow-sm md:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F9F76]/15 text-[#0F9F76]">
              <UserRound size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[color:var(--color-rescue-text)]">
              Account Information
            </h2>

            <div className="mt-6 space-y-5">
              <InfoItem label="Full Name" value={user?.name || "Not available"} />
              <InfoItem label="Email" value={user?.email || "Not available"} />

              <div className="border-t border-[color:var(--color-rescue-border)] pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-rescue-text-muted)]">
                  Role
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0F9F76]/15 px-3 py-1.5 text-sm font-bold text-[#0F9F76]">
                  <CheckCircle2 size={15} />
                  Volunteer
                </div>
              </div>

              <div className="border-t border-[color:var(--color-rescue-border)] pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-rescue-text-muted)]">
                  Access
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--color-rescue-text)]">
                  <ShieldCheck size={17} className="text-[#0F9F76]" />
                  Role protected
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Feature Notice */}
        <section className="mt-7 rounded-3xl border border-[#0F9F76]/25 bg-[color:var(--color-rescue-surface)] p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F9F76]/15 text-[#0F9F76]">
              <Bike size={21} />
            </div>

            <div className="flex-1">
              <p className="font-bold text-[color:var(--color-rescue-text)]">
                Volunteer activity features are coming next
              </p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--color-rescue-text-muted)]">
                Pickup assignments, activity tracking, and rescue history can
                be connected here when those backend modules are implemented.
              </p>
            </div>

            <div className="hidden items-center gap-1 text-sm font-bold text-[#0F9F76] md:flex">
              RescueBite
              <ArrowRight size={16} />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function OverviewCard({ icon, iconBox, label, value }) {
  return (
    <div className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBox}`}>
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-[color:var(--color-rescue-text-muted)]">
        {label}
      </p>
      <p className="mt-1 truncate text-xl font-bold text-[color:var(--color-rescue-text)]">
        {value}
      </p>
    </div>
  );
}

function JourneyStep({ step, title, children }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-[color:var(--color-rescue-accent-soft)] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F9F76] font-bold text-white">
        {step}
      </div>
      <div>
        <p className="font-bold text-[color:var(--color-rescue-text)]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[color:var(--color-rescue-text-muted)]">
          {children}
        </p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-rescue-text-muted)]">
        {label}
      </p>
      <p className="mt-1 break-all font-semibold text-[color:var(--color-rescue-text)]">
        {value}
      </p>
    </div>
  );
}
