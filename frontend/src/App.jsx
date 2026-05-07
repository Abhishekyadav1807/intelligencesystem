import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { SalariesPage } from "./pages/SalariesPage";
import { CompanyPage } from "./pages/CompanyPage";
import { ComparePage } from "./pages/ComparePage";

const Nav = () => (
  <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
      <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-900">CompIntel</Link>
      <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
        <Link className="rounded-md px-2 py-1 hover:bg-slate-100" to="/">Salaries</Link>
        <Link className="rounded-md px-2 py-1 hover:bg-slate-100" to="/company">Company View</Link>
        <Link className="rounded-md px-2 py-1 hover:bg-slate-100" to="/compare">Compare</Link>
      </div>
    </div>
  </nav>
);

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
        <Routes>
          <Route path="/" element={<SalariesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
