import { useEffect, useMemo, useState } from "react";
import { Check, LoaderCircle, Search, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { api } from "../../api/client";

function formatStatus(status) {
  if (!status) return "Pending";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ManagementPage({
  title,
  description,
  initialRows = [],
  type,
}) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(type === "ngo" || type === "volunteer" || type === "donor");
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const isApproval = type === "ngo" || type === "volunteer";

  useEffect(() => {
    if (!isApproval && type !== "donor") {
      return;
    }

    let cancelled = false;

    async function loadRecords() {
      setLoading(true);
      setError("");

      try {
        const response = type === "ngo"
          ? await api.getAdminNgos()
          : type === "volunteer"
            ? await api.getAdminVolunteers()
            : await api.getAdminDonors();

        if (cancelled) return;

        const records = type === "ngo"
          ? response.ngos || []
          : type === "volunteer"
            ? response.volunteers || []
            : response.donors || [];

        setRows(records);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || `Unable to load ${type} records.`
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRecords();

    return () => {
      cancelled = true;
    };
  }, [type, isApproval]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return rows;

    return rows.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search)
    );
  }, [rows, query]);

  async function updateStatus(id, status) {
    if (!isApproval) return;

    setActionLoading(`${status}-${id}`);
    setError("");

    try {
      let response;

      if (type === "ngo") {
        response =
          status === "approved"
            ? await api.approveNgo(id)
            : await api.rejectNgo(id);
      } else {
        response =
          status === "approved"
            ? await api.approveVolunteer(id)
            : await api.rejectVolunteer(id);
      }

      const updatedRecord =
        type === "ngo" ? response.ngo : response.volunteer;

      setRows((current) =>
        current.map((row) =>
          row.id === id
            ? {
                ...row,
                ...updatedRecord,
              }
            : row
        )
      );
    } catch (err) {
      setError(
        err.message ||
          `Unable to ${status === "approved" ? "approve" : "reject"} ${type}.`
      );
    } finally {
      setActionLoading(null);
    }
  }

  const headers =
    type === "donor"
      ? ["Donor", "Email", "Donations", "Status", "Action"]
      : ["Name", "Contact", "Area", "Status", "Action"];

  return (
    <AdminLayout>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F9F76]">
          Management
        </p>

        <h1 className="mt-2 text-3xl font-black">
          {title}
        </h1>

        <p className="mt-1 text-sm text-[color:var(--color-rescue-text-muted)]">
          {description}
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--color-rescue-text-muted)]"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type}s...`}
            className="w-full rounded-xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] py-3 pl-10 pr-4 text-sm text-[color:var(--color-rescue-text)] outline-none focus:border-[#0F9F76]"
          />
        </div>

        <span className="text-xs font-semibold text-[color:var(--color-rescue-text-muted)]">
          {filtered.length} records
        </span>
      </div>

      <AdminTable headers={headers}>
        {loading ? (
          <tr>
            <td
              colSpan={headers.length}
              className="px-5 py-12 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[color:var(--color-rescue-text-muted)]">
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Loading {type}s...
              </div>
            </td>
          </tr>
        ) : filtered.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              className="px-5 py-12 text-center text-sm text-[color:var(--color-rescue-text-muted)]"
            >
              No {type}s found.
            </td>
          </tr>
        ) : (
          filtered.map((row) => {
            const status = row.approval_status || row.status || "pending";
            const formattedStatus = formatStatus(status);

            return (
              <tr
                key={row.id}
                className="hover:bg-[color:var(--color-rescue-bg)]"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-bold">
                    {row.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[color:var(--color-rescue-text-muted)]">
                    {row.email || row.contact || "No email"}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-[color:var(--color-rescue-text-muted)]">
                  {row.email || row.contact || "N/A"}
                </td>

                <td className="px-5 py-4 text-sm">
                  {type === "donor" ? `${row.donations_count || 0} donations` : row.service_area || row.area || "N/A"}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={formattedStatus} />
                </td>

                <td className="px-5 py-4">
                  {isApproval ? (
                    <div className="flex gap-2">
                      {status !== "approved" && (
                        <button
                          disabled={
                            actionLoading === `approved-${row.id}`
                          }
                          onClick={() =>
                            updateStatus(row.id, "approved")
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-[#0F9F76] px-3 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {actionLoading ===
                          `approved-${row.id}` ? (
                            <LoaderCircle
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Check size={14} />
                          )}

                          {actionLoading ===
                          `approved-${row.id}`
                            ? "Approving..."
                            : "Approve"}
                        </button>
                      )}

                      {status !== "rejected" && (
                        <button
                          disabled={
                            actionLoading === `rejected-${row.id}`
                          }
                          onClick={() =>
                            updateStatus(row.id, "rejected")
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {actionLoading ===
                          `rejected-${row.id}` ? (
                            <LoaderCircle
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <X size={14} />
                          )}

                          {actionLoading ===
                          `rejected-${row.id}`
                            ? "Rejecting..."
                            : "Reject"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <button className="rounded-lg border border-[color:var(--color-rescue-border)] px-3 py-2 text-xs font-bold hover:border-[#0F9F76]/50">
                      View details
                    </button>
                  )}
                </td>
              </tr>
            );
          })
        )}
      </AdminTable>
    </AdminLayout>
  );
}