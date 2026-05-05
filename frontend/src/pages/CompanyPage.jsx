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
      <h1 className="text-2xl font-bold text-slate-900">Company Compensation View</h1>
      <div className="mt-4 flex gap-3">
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. google" className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button onClick={fetchCompany} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Search</button>
      </div>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      {data && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Median Total Compensation</p>
            <p className="text-2xl font-bold text-slate-900">?{Number(data.median_total_compensation).toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold">Level Distribution</p>
            <div className="flex gap-4 text-sm">{Object.entries(data.level_distribution).map(([level, count]) => <span key={level}>{level}: {String(count)}</span>)}</div>
          </div>
        </div>
      )}
    </section>
  );
}
