import { LockKeyhole, LogOut, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import DashboardShell from "../components/dashboard/DashboardShell";
import { getStoredUser } from "../lib/auth";

export default function Settings({ role = "donor" }) {
  const [alerts, setAlerts] = useState({
    availability: true,
    updates: true,
    expiry: false,
  });
  const storedUser = getStoredUser();
  const resolvedRole = role || storedUser?.role || "donor";

  if (resolvedRole === "ngo") {
    return (
      <DashboardShell role="ngo">
        <p className="text-sm font-semibold text-[#0F9F76]">
          Account preferences
        </p>
        <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
          Manage your NGO account and notification preferences.
        </p>

        <div className="mt-6 grid max-w-5xl gap-5 xl:grid-cols-2">
          <SettingsCard
            title="Account Settings"
            description="Keep your organization contact details up to date."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Organization Name"
                value="Hope Foundation Bangladesh"
              />
              <Field
                label="Email Address"
                value="contact@hopefoundation.org"
                type="email"
              />
              <Field label="Phone Number" value="+880 1XXX-XXXXXX" />
            </div>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#0C8562]"
            >
              <Save size={16} /> Save Changes
            </button>
          </SettingsCard>

          <SettingsCard
            title="Notification Preferences"
            description="Choose which updates you want to receive."
          >
            <div className="space-y-4">
              <Toggle
                label="Donation availability alerts"
                description="Get notified when new food donations are available nearby."
                checked={alerts.availability}
                onChange={() =>
                  setAlerts({ ...alerts, availability: !alerts.availability })
                }
              />
              <Toggle
                label="Pickup request updates"
                description="Receive updates when your pickup requests are approved or completed."
                checked={alerts.updates}
                onChange={() =>
                  setAlerts({ ...alerts, updates: !alerts.updates })
                }
              />
              <Toggle
                label="Expiry reminders"
                description="Get reminders about upcoming food donation expiry times."
                checked={alerts.expiry}
                onChange={() =>
                  setAlerts({ ...alerts, expiry: !alerts.expiry })
                }
              />
            </div>
          </SettingsCard>

          <SettingsCard
            title="Preferences"
            description="Customize how information is displayed."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Language"
                value="English"
                options={["English", "Bangla"]}
              />
              <SelectField
                label="Distance Unit"
                value="Kilometers (km)"
                options={["Kilometers (km)", "Miles (mi)"]}
              />
            </div>
          </SettingsCard>

          <SettingsCard
            title="Security"
            description="Update your account password regularly to keep your account secure."
          >
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
            >
              <LockKeyhole size={16} /> Change Password
            </button>
          </SettingsCard>

          <section className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 sm:col-span-2">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 text-rose-500" size={20} />
              <div>
                <h2 className="font-bold text-[color:var(--color-rescue-text)]">
                  Account Actions
                </h2>
                <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                  These actions affect your account.
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          </section>
        </div>
      </DashboardShell>
    );
  }

  if (resolvedRole === "volunteer") {
    return (
      <VolunteerSettings
        alerts={alerts}
        setAlerts={setAlerts}
        user={storedUser}
      />
    );
  }

  return (
    <DonorSettings alerts={alerts} setAlerts={setAlerts} user={storedUser} />
  );
}

function SettingsCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5 shadow-md sm:p-6">
      <h2 className="text-lg font-bold text-[color:var(--color-rescue-text)]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, value, type = "text" }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-rescue-text-muted)]">
        {label}
      </span>
      <input
        type={type}
        defaultValue={value}
        className="mt-2 w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-bg)] px-3 py-2.5 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
      />
    </label>
  );
}

function SelectField({ label, value, options }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-rescue-text-muted)]">
        {label}
      </span>
      <select
        defaultValue={value}
        className="mt-2 w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-bg)] px-3 py-2.5 text-sm text-[color:var(--color-rescue-text)] outline-none transition focus:border-[#0F9F76] focus:ring-2 focus:ring-[#0F9F76]/20"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[color:var(--color-rescue-text)]">
          {label}
        </p>
        <p className="mt-1 text-xs leading-5 text-[color:var(--color-rescue-text-muted)]">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-[#0F9F76]" : "bg-[color:var(--color-rescue-border)]"}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}

function DonorSettings({ alerts, setAlerts, user }) {
  const fullName = user?.name || "Donor";
  const email = user?.email || "donor@example.com";
  return (
    <DashboardShell role="donor">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0F9F76]">
        Account Preferences
      </p>
      <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
        Settings
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
        Manage your account preferences and notifications.
      </p>
      <div className="mt-6 grid max-w-5xl gap-5 xl:grid-cols-2">
        <SettingsCard
          title="Account Information"
          description="Keep your personal contact details up to date."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={fullName} />
            <Field label="Email Address" value={email} type="email" />
            <Field label="Phone Number" value="+880 1XXX-XXXXXX" />
            <Field label="Location" value="Dhaka, Bangladesh" />
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#0C8562]"
          >
            <Save size={16} /> Save Changes
          </button>
        </SettingsCard>
        <SettingsCard
          title="Notification Preferences"
          description="Choose which updates you want to receive."
        >
          <div className="space-y-4">
            <Toggle
              label="Donation Updates"
              description="Receive updates about your food donations."
              checked={alerts.availability}
              onChange={() =>
                setAlerts({ ...alerts, availability: !alerts.availability })
              }
            />
            <Toggle
              label="NGO Requests"
              description="Get notified when an NGO requests your donation."
              checked={alerts.updates}
              onChange={() =>
                setAlerts({ ...alerts, updates: !alerts.updates })
              }
            />
            <Toggle
              label="Expiry Reminders"
              description="Receive reminders before your food donations expire."
              checked={alerts.expiry}
              onChange={() => setAlerts({ ...alerts, expiry: !alerts.expiry })}
            />
            <Toggle
              label="System Notifications"
              description="Receive important RescueBite updates."
              checked={true}
              onChange={() => {}}
            />
          </div>
        </SettingsCard>
        <SettingsCard
          title="Preferences"
          description="Customize how information is displayed."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Language"
              value="English"
              options={["English", "Bangla"]}
            />
            <SelectField
              label="Distance Unit"
              value="Kilometers (km)"
              options={["Kilometers (km)", "Miles (mi)"]}
            />
          </div>
        </SettingsCard>
        <SettingsCard
          title="Security"
          description="Keep your account secure by regularly updating your password."
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
          >
            <LockKeyhole size={16} /> Change Password
          </button>
        </SettingsCard>
        <section className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 sm:col-span-2">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 text-rose-500" size={20} />
            <div>
              <h2 className="font-bold text-[color:var(--color-rescue-text)]">
                Account Actions
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                Manage your account session.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

function VolunteerSettings({ alerts, setAlerts, user }) {
  const fullName = user?.name || "Volunteer";
  const email = user?.email || "Not set";
  const phone = user?.phone || "Not set";
  const location = user?.location || "Not set";

  return (
    <DashboardShell role="volunteer">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0F9F76]">
        Volunteer Preferences
      </p>
      <h1 className="mt-1 text-3xl font-bold text-[color:var(--color-rescue-text)]">
        Settings
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">
        Manage your volunteer account and rescue notifications.
      </p>
      <div className="mt-6 grid max-w-5xl gap-5 xl:grid-cols-2">
        <SettingsCard
          title="Account Information"
          description="Keep your volunteer profile details current."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={fullName} />
            <Field label="Email Address" value={email} type="email" />
            <Field label="Phone Number" value={phone} />
            <Field label="Location" value={location} />
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F9F76] px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-[#0C8562]"
          >
            <Save size={16} /> Save Changes
          </button>
        </SettingsCard>
        <SettingsCard
          title="Notification Preferences"
          description="Choose which volunteer updates you want to receive."
        >
          <div className="space-y-4">
            <Toggle
              label="Pickup Task Updates"
              description="Receive updates when pickup tasks change or are reassigned."
              checked={alerts.availability}
              onChange={() =>
                setAlerts({ ...alerts, availability: !alerts.availability })
              }
            />
            <Toggle
              label="Assignment Updates"
              description="Stay informed about your assigned rescue routes and timing."
              checked={alerts.updates}
              onChange={() =>
                setAlerts({ ...alerts, updates: !alerts.updates })
              }
            />
            <Toggle
              label="Rescue Opportunities"
              description="Get alerted when new pickup opportunities become available."
              checked={alerts.expiry}
              onChange={() => setAlerts({ ...alerts, expiry: !alerts.expiry })}
            />
            <Toggle
              label="System Notifications"
              description="Receive important RescueBite updates and account notices."
              checked={true}
              onChange={() => {}}
            />
          </div>
        </SettingsCard>
        <SettingsCard
          title="Preferences"
          description="Customize how information is displayed."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Language"
              value="English"
              options={["English", "Bangla"]}
            />
            <SelectField
              label="Distance Unit"
              value="Kilometers (km)"
              options={["Kilometers (km)", "Miles (mi)"]}
            />
          </div>
        </SettingsCard>
        <SettingsCard
          title="Security"
          description="Keep your volunteer account secure."
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0F9F76]/30 px-4 py-2.5 text-sm font-semibold text-[#0F9F76] transition hover:bg-[#0F9F76]/10"
          >
            <LockKeyhole size={16} /> Change Password
          </button>
        </SettingsCard>
        <section className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-5 sm:col-span-2">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 text-rose-500" size={20} />
            <div>
              <h2 className="font-bold text-[color:var(--color-rescue-text)]">
                Account Actions
              </h2>
              <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
                Manage your volunteer account session.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
