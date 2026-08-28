import { LockKeyhole, LogOut, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import DashboardShell from "../components/dashboard/DashboardShell";

export default function Settings({ role = "donor" }) {
    const [alerts, setAlerts] = useState({ availability: true, updates: true, expiry: false });

    if (role !== "ngo") {
        return <DonorSettings alerts={alerts} setAlerts={setAlerts} />;
    }

    return (
        <DashboardShell role="ngo">
            <p className="text-sm font-semibold text-emerald-600">Account preferences</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-500">Manage your NGO account and notification preferences.</p>

            <div className="mt-6 grid max-w-5xl gap-5 xl:grid-cols-2">
                <SettingsCard title="Account Settings" description="Keep your organization contact details up to date.">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Organization Name" value="Hope Foundation Bangladesh" />
                        <Field label="Email Address" value="contact@hopefoundation.org" type="email" />
                        <Field label="Phone Number" value="+880 1XXX-XXXXXX" />
                    </div>
                    <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-600"><Save size={16} /> Save Changes</button>
                </SettingsCard>

                <SettingsCard title="Notification Preferences" description="Choose which updates you want to receive.">
                    <div className="space-y-4">
                        <Toggle label="Donation availability alerts" description="Get notified when new food donations are available nearby." checked={alerts.availability} onChange={() => setAlerts({ ...alerts, availability: !alerts.availability })} />
                        <Toggle label="Pickup request updates" description="Receive updates when your pickup requests are approved or completed." checked={alerts.updates} onChange={() => setAlerts({ ...alerts, updates: !alerts.updates })} />
                        <Toggle label="Expiry reminders" description="Get reminders about upcoming food donation expiry times." checked={alerts.expiry} onChange={() => setAlerts({ ...alerts, expiry: !alerts.expiry })} />
                    </div>
                </SettingsCard>

                <SettingsCard title="Preferences" description="Customize how information is displayed.">
                    <div className="grid gap-4 sm:grid-cols-2"><SelectField label="Language" value="English" options={["English", "Bangla"]} /><SelectField label="Distance Unit" value="Kilometers (km)" options={["Kilometers (km)", "Miles (mi)"]} /></div>
                </SettingsCard>

                <SettingsCard title="Security" description="Update your account password regularly to keep your account secure.">
                    <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"><LockKeyhole size={16} /> Change Password</button>
                </SettingsCard>

                <section className="rounded-3xl border border-rose-100 bg-rose-50/50 p-5 sm:col-span-2">
                    <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 text-rose-500" size={20} /><div><h2 className="font-bold text-gray-900">Account Actions</h2><p className="mt-1 text-sm text-gray-500">These actions affect your account.</p><button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"><LogOut size={16} /> Log Out</button></div></div>
                </section>
            </div>
        </DashboardShell>
    );
}

function SettingsCard({ title, description, children }) {
    return <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-md sm:p-6"><h2 className="text-lg font-bold text-gray-900">{title}</h2><p className="mt-1 text-sm text-gray-500">{description}</p><div className="mt-5">{children}</div></section>;
}

function Field({ label, value, type = "text" }) {
    return <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span><input type={type} defaultValue={value} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" /></label>;
}

function SelectField({ label, value, options }) {
    return <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span><select defaultValue={value} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function Toggle({ label, description, checked, onChange }) {
    return <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-gray-800">{label}</p><p className="mt-1 text-xs leading-5 text-gray-500">{description}</p></div><button type="button" role="switch" aria-checked={checked} onClick={onChange} className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-emerald-500" : "bg-gray-200"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} /></button></div>;
}

function DonorSettings({ alerts, setAlerts }) {
    return (
        <DashboardShell role="donor">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Account Preferences</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-500">Manage your account preferences and notifications.</p>
            <div className="mt-6 grid max-w-5xl gap-5 xl:grid-cols-2">
                <SettingsCard title="Account Information" description="Keep your personal contact details up to date.">
                    <div className="grid gap-4 sm:grid-cols-2"><Field label="Full Name" value="Donor" /><Field label="Email Address" value="donor@example.com" type="email" /><Field label="Phone Number" value="+880 1XXX-XXXXXX" /><Field label="Location" value="Dhaka, Bangladesh" /></div>
                    <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-600"><Save size={16} /> Save Changes</button>
                </SettingsCard>
                <SettingsCard title="Notification Preferences" description="Choose which updates you want to receive.">
                    <div className="space-y-4"><Toggle label="Donation Updates" description="Receive updates about your food donations." checked={alerts.availability} onChange={() => setAlerts({ ...alerts, availability: !alerts.availability })} /><Toggle label="NGO Requests" description="Get notified when an NGO requests your donation." checked={alerts.updates} onChange={() => setAlerts({ ...alerts, updates: !alerts.updates })} /><Toggle label="Expiry Reminders" description="Receive reminders before your food donations expire." checked={alerts.expiry} onChange={() => setAlerts({ ...alerts, expiry: !alerts.expiry })} /><Toggle label="System Notifications" description="Receive important RescueBite updates." checked={true} onChange={() => {}} /></div>
                </SettingsCard>
                <SettingsCard title="Preferences" description="Customize how information is displayed."><div className="grid gap-4 sm:grid-cols-2"><SelectField label="Language" value="English" options={["English", "Bangla"]} /><SelectField label="Distance Unit" value="Kilometers (km)" options={["Kilometers (km)", "Miles (mi)"]} /></div></SettingsCard>
                <SettingsCard title="Security" description="Keep your account secure by regularly updating your password."><button type="button" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"><LockKeyhole size={16} /> Change Password</button></SettingsCard>
                <section className="rounded-3xl border border-rose-100 bg-rose-50/50 p-5 sm:col-span-2"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 text-rose-500" size={20} /><div><h2 className="font-bold text-gray-900">Account Actions</h2><p className="mt-1 text-sm text-gray-500">Manage your account session.</p><button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"><LogOut size={16} /> Log Out</button></div></div></section>
            </div>
        </DashboardShell>
    );
}