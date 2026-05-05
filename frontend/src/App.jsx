import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { SalariesPage } from "./pages/SalariesPage";
import { CompanyPage } from "./pages/CompanyPage";
import { ComparePage } from "./pages/ComparePage";

const Nav = () => (
  <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link to="/" className="text-lg font-bold tracking-tight text-slate-900">CompIntel</Link>
      <div className="flex gap-4 text-sm font-medium text-slate-600">
        <Link to="/">Salaries</Link>
        <Link to="/company">Company View</Link>
        <Link to="/compare">Compare</Link>
      </div>
    </div>
  </nav>
);

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<SalariesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
