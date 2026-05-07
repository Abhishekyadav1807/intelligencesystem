import { useState } from "react";
import { api } from "../api";

export function ComparePage() {
  const [salaryId1, setSalaryId1] = useState("");
  const [salaryId2, setSalaryId2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const compare = async () => {
    try {
      setError("");
      const { data } = await api.get("/compare", { params: { salaryId1, salaryId2 } });
      setResult(data);
    } catch {
      setResult(null);
      setError("Comparison failed. Check salary IDs.");
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Compare Two Salaries</h1>
      <p className="mt-2 text-base text-slate-600">Paste two salary record IDs to compare base, bonus, stock, and total comp.</p>

      <div className="glass-card mt-5 grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-3">
        <input value={salaryId1} onChange={(e) => setSalaryId1(e.target.value)} placeholder="salaryId1" className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm" />
        <input value={salaryId2} onChange={(e) => setSalaryId2(e.target.value)} placeholder="salaryId2" className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm" />
        <button onClick={compare} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Compare</button>
      </div>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      {result && (
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs text-slate-100 sm:text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </section>
  );
}
