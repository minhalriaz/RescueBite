import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardShell from "../components/dashboard/DashboardShell";
import StatusBadge from "../components/admin/StatusBadge";
import { api } from "../api/client";

export default function MyDonations() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.getMyDonations().then((response) => setDonations(response.data || [])).catch((requestError) => setError(requestError.message || "Unable to load donations.")).finally(() => setLoading(false));
    }, []);

    return <DashboardShell role="donor">
        <h1 className="text-3xl font-bold text-[color:var(--color-rescue-text)]">My Donations</h1>
        <p className="mt-2 text-sm text-[color:var(--color-rescue-text-muted)]">Track your posted food and its rescue progress.</p>
        {error && <div className="mt-5 rounded-xl bg-rose-500/10 p-4 text-sm text-rose-600">{error}</div>}
        {loading ? <LoaderCircle className="mx-auto mt-12 animate-spin text-[#0F9F76]" /> : donations.length === 0 ? <p className="mt-10 rounded-2xl border border-[color:var(--color-rescue-border)] p-10 text-center text-sm text-[color:var(--color-rescue-text-muted)]">No donations posted yet.</p> : <div className="mt-6 grid gap-4">{donations.map((donation) => <article key={donation.id} className="rounded-2xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold text-[color:var(--color-rescue-text)]">{donation.food}</h2><p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">{donation.quantity} · {donation.address}</p></div><StatusBadge status={donation.status} /></div><p className="mt-3 text-xs text-[color:var(--color-rescue-text-muted)]">{donation.request_status ? `Request: ${donation.request_status}` : "Waiting for an NGO request"}</p></article>)}</div>}
    </DashboardShell>;
}