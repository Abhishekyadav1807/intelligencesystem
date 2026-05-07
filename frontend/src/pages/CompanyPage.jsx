import { useState } from "react";
import { api } from "../api";

export function CompanyPage() {
  const [company, setCompany] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchCompany = async () => {
    try {
      setError("");
      const response = await api.get(`/company/${encodeURIComponent(company)}`);
      setData(response.data);
    } catch {
      setData(null);
      setError("Company not found.");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Company Compensation View</h1>
      <div className="glass-card mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. google"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
        />
        <button onClick={fetchCompany} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          Search
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      {data && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Median Total Compensation</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900">INR {Number(data.median_total_compensation).toLocaleString()}</p>
          </div>

          <div className="glass-card rounded-2xl border border-slate-200 p-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">Level Distribution</p>
            <div className="flex flex-wrap gap-2 text-sm">
              {Object.entries(data.level_distribution).map(([level, count]) => (
                <span key={level} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  {level}: {String(count)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
