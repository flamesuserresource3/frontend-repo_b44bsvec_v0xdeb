import { useMemo } from "react";

export default function EndpointList({ baseUrl, onSelect }) {
  const endpoints = useMemo(
    () => [
      { method: "GET", path: "/", description: "Root" },
      { method: "GET", path: "/api/hello", description: "Hello message" },
      { method: "GET", path: "/test", description: "Backend & DB status" },
    ],
    []
  );

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-gray-700">Quick Endpoints</h2>
        <span className="text-xs text-gray-400 truncate max-w-[60%]" title={`Base URL: ${baseUrl}`}>
          {baseUrl}
        </span>
      </div>
      <ul className="divide-y rounded-lg border bg-white">
        {endpoints.map((e) => (
          <li key={e.path} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                e.method === "GET"
                  ? "bg-green-100 text-green-700"
                  : e.method === "POST"
                  ? "bg-blue-100 text-blue-700"
                  : e.method === "PUT"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
              }`}>
                {e.method}
              </span>
              <code className="text-xs text-gray-700">{e.path}</code>
            </div>
            <button
              className="text-xs text-blue-600 hover:text-blue-700"
              onClick={() => onSelect(e.method, e.path)}
            >
              Load
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
