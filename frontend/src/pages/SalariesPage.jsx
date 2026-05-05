import { useEffect, useMemo, useState } from "react";
import { api } from "../api";

export function SalariesPage() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({ company: "", role: "", level: "", location: "" });

  const load = async () => {
    const { data } = await api.get("/salaries", { params: { ...filters, sort: "desc" } });
    setRows(data);
  };

  useEffect(() => { load(); }, []);

  const onFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const hasData = useMemo(() => rows.length > 0, [rows]);

  return (
    <section>
      <h1 className="text-2xl font-bold text-slate-900">Salary Intelligence Table</h1>
      <p className="mt-1 text-sm text-slate-600">Structured compensation by company, role, level, and location.</p>

      <div className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5">
        {(["company", "role", "level", "location"]).map((name) => (
          <input key={name} value={filters[name]} onChange={(e) => onFilter(name, e.target.value)} placeholder={name} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        ))}
        <button onClick={load} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Apply Filters</button>
      </div>

      {!hasData ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">No salaries found for these filters.</div>
      ) : (
        <div className="mt-5 overflow-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3">Company</th><th>Role</th><th>Level</th><th>Location</th><th>Experience</th><th>Total Compensation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium">{s.company}</td>
                  <td>{s.role}</td><td>{s.level}</td><td>{s.location}</td><td>{s.experience_years} yrs</td><td className="font-semibold">?{s.total_compensation.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
