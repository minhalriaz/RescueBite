import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../api/client";
import DashboardShell from "../components/dashboard/DashboardShell";

const initialForm = {
  food: "",
  quantity: "",
  beneficiary_type: "human",
  pickup_deadline: "",
  address: "",
  description: "",
};

export default function CreateDonation() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(null);

    try {
      const payload = await api.createDonation({
        ...form,
        pickup_deadline: new Date(form.pickup_deadline).toISOString(),
      });
      setSuccess(payload);
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError.message || "Could not create the donation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardShell role="donor">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">Donor workflow</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Create food donation</h1>
          <p className="mt-2 text-sm text-gray-500">Publishing this post immediately creates in-app alerts for eligible NGOs.</p>
        </div>

        {success ? (
          <div className="mt-6 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-semibold">Donation published successfully.</p>
              <p className="text-sm">{success.notifications_created} matching NGO notification{success.notifications_created === 1 ? "" : "s"} created.</p>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">{error}</div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
          <div>
            <label className="text-sm font-semibold text-gray-700">Food</label>
            <input required value={form.food} onChange={update("food")} placeholder="Cooked meals" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <input required value={form.quantity} onChange={update("quantity")} placeholder="Approximately 30 servings" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Pickup deadline</label>
              <input required type="datetime-local" value={form.pickup_deadline} onChange={update("pickup_deadline")} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700">Beneficiary</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {["human", "animal"].map((type) => (
                <label key={type} className={`cursor-pointer rounded-xl border p-4 text-center font-semibold capitalize ${form.beneficiary_type === type ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
                  <input type="radio" name="beneficiary_type" value={type} checked={form.beneficiary_type === type} onChange={update("beneficiary_type")} className="sr-only" />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="text-sm font-semibold text-gray-700">Pickup address</label>
            <input required value={form.address} onChange={update("address")} placeholder="Dhanmondi, Dhaka" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Description <span className="font-normal text-gray-400">(optional)</span></label>
            <textarea value={form.description} onChange={update("description")} rows="4" placeholder="Pickup instructions or food details" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? <LoaderCircle className="animate-spin" size={19} /> : null}
            {submitting ? "Publishing..." : "Publish donation"}
          </button>
        </form>
      </div>
    </DashboardShell>
  );
}
