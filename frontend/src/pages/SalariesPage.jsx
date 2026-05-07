import { useEffect, useMemo, useState } from "react";
import { api } from "../api";

export function SalariesPage() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({ company: "", role: "", level: "", location: "" });

  const load = async () => {
    const { data } = await api.get("/salaries", { params: { ...filters, sort: "desc" } });
    setRows(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const hasData = useMemo(() => rows.length > 0, [rows]);

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Salary Intelligence Table</h1>
      <p className="mt-2 text-base text-slate-600">Structured compensation by company, role, level, and location.</p>

      <div className="glass-card mt-5 grid gap-3 rounded-2xl border border-slate-200 p-4 sm:grid-cols-2 lg:grid-cols-5">
        {(["company", "role", "level", "location"]).map((name) => (
          <input
            key={name}
            value={filters[name]}
            onChange={(e) => onFilter(name, e.target.value)}
            placeholder={name}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-500"
          />
        ))}
        <button
          onClick={load}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Apply Filters
        </button>
      </div>

      {!hasData ? (
        <div className="glass-card mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No salaries found for these filters.
        </div>
      ) : (
        <div className="glass-card mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Total Compensation</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id || s._id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium">{s.company}</td>
                    <td className="px-4 py-3">{s.role}</td>
                    <td className="px-4 py-3">{s.level}</td>
                    <td className="px-4 py-3">{s.location}</td>
                    <td className="px-4 py-3">{s.experience_years} yrs</td>
                    <td className="px-4 py-3 font-semibold">INR {Number(s.total_compensation).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
