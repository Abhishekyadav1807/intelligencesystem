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
      <h1 className="text-2xl font-bold text-slate-900">Compare Two Salaries</h1>
      <div className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <input value={salaryId1} onChange={(e) => setSalaryId1(e.target.value)} placeholder="salaryId1" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input value={salaryId2} onChange={(e) => setSalaryId2(e.target.value)} placeholder="salaryId2" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button onClick={compare} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Compare</button>
      </div>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      {result && <pre className="mt-4 overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
