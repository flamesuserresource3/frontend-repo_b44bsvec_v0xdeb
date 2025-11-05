import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import EndpointList from "./components/EndpointList.jsx";
import ApiRequestForm from "./components/ApiRequestForm.jsx";
import ResponseViewer from "./components/ResponseViewer.jsx";

function getDefaultBackend() {
  const env = import.meta.env.VITE_BACKEND_URL;
  if (env) return env.replace(/\/$/, "");
  try {
    const url = new URL(window.location.href);
    if (url.port === "3000") {
      url.port = "8000";
    }
    return url.origin;
  } catch {
    return "http://localhost:8000";
  }
}

export default function App() {
  const baseUrl = useMemo(() => getDefaultBackend(), []);
  const [selected, setSelected] = useState({ method: "GET", path: "/api/hello" });
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const send = useCallback(async ({ method, path, body }) => {
    setSelected({ method, path });
    setLoading(true);
    setError("");
    setResp(null);
    setData(null);
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      setResp({ status: res.status, statusText: res.statusText });
      const ct = res.headers.get("content-type") || "";
      const parsed = ct.includes("application/json") ? await res.json() : await res.text();
      setData(parsed);
    } catch (e) {
      setError(e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  const handleSelect = (m, p) => setSelected({ method: m, path: p });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <section className="md:col-span-1 space-y-6">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-semibold">Backend</h2>
            <p className="text-sm text-gray-600">Base URL detected:</p>
            <p className="truncate rounded-md border px-3 py-2 text-sm font-mono" title={baseUrl}>
              {baseUrl}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <EndpointList baseUrl={baseUrl} onSelect={handleSelect} />
          </div>
        </section>

        <section className="md:col-span-2 space-y-6">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-base font-semibold">Request</h2>
            <ApiRequestForm
              baseUrl={baseUrl}
              initialPath={selected.path}
              initialMethod={selected.method}
              onSend={send}
            />
          </div>

          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-semibold">Response</h2>
            <ResponseViewer loading={loading} error={error} response={resp} data={data} />
          </div>
        </section>
      </main>
    </div>
  );
}
