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
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-500 px-6 py-8 text-white shadow-xl md:px-9 md:py-10">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-28 h-52 w-52 rounded-full bg-emerald-300/10" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-50 backdrop-blur-sm">
                <Sparkles size={14} />
                RescueBite Volunteer
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight md:text-4xl">
                Welcome back,
                <span className="block text-emerald-100">
                  {user?.name || "Volunteer"}
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-50/90 md:text-base">
                Be part of the movement that connects rescued food with
                communities that need it most. Your volunteer workspace is
                ready for upcoming RescueBite activities.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-sm">
                  <CheckCircle2 size={17} />
                  Account Active
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <ShieldCheck size={17} />
                  Volunteer Access
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                Volunteer Profile
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-emerald-700 shadow">
                  {(user?.name || "V").charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-lg font-bold">
                    {user?.name || "Volunteer"}
                  </p>
                  <p className="truncate text-sm text-emerald-100">
                    {user?.email || "Volunteer account"}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/15 pt-4">
                <div className="flex items-center gap-2 text-sm text-emerald-50">
                  <MapPin size={16} />
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
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Bike size={24} />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Account Type
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">Volunteer</p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <MapPin size={24} />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Service Area
            </p>
            <p className="mt-1 truncate text-xl font-bold text-gray-900">
              {user?.service_area || "Not Set"}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Clock3 size={24} />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Current Status
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              Ready to Help
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <HeartHandshake size={24} />
            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Rescue Network
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              Connected
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mt-7 grid gap-6 xl:grid-cols-3">
          {/* Volunteer Journey */}
          <div className="xl:col-span-2 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Volunteer Journey
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  How volunteering works
                </h2>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 sm:flex">
                <HeartHandshake size={22} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="flex gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Stay connected with RescueBite
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your volunteer account keeps you connected with the
                    RescueBite food-rescue ecosystem.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Receive future volunteer opportunities
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Pickup and rescue assignment features can be integrated
                    here as the RescueBite platform grows.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                  3
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Support successful food rescue
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Volunteers can become an important connection between
                    donors, NGOs, and rescued food.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm md:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <UserRound size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Account Information
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email
                </p>
                <p className="mt-1 break-all font-semibold text-gray-800">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Role
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
                  <CheckCircle2 size={15} />
                  Volunteer
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Access
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  Role protected
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Feature Notice */}
        <section className="mt-7 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Bike size={21} />
            </div>

            <div className="flex-1">
              <p className="font-bold text-emerald-900">
                Volunteer activity features are coming next
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-700">
                Pickup assignments, activity tracking, and rescue history can
                be connected here when those backend modules are implemented.
              </p>
            </div>

            <div className="hidden items-center gap-1 text-sm font-bold text-emerald-700 md:flex">
              RescueBite
              <ArrowRight size={16} />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}