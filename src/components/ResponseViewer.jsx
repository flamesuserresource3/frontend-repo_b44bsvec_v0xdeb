import { useMemo } from "react";

export default function ResponseViewer({ loading, error, response, data }) {
  const pretty = useMemo(() => {
    try {
      return data ? JSON.stringify(data, null, 2) : "";
    } catch {
      return String(data || "");
    }
  }, [data]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Status:</span>
        <span className={`font-medium ${
          loading
            ? "text-amber-600"
            : error
            ? "text-rose-600"
            : response
            ? "text-green-600"
            : "text-gray-700"
        }`}>
          {loading ? "Loading..." : error ? error : response ? `${response.status} ${response.statusText}` : "—"}
        </span>
      </div>
      <div className="rounded-lg border bg-gray-50 p-3">
        <pre className="max-h-80 overflow-auto text-xs leading-relaxed text-gray-800 whitespace-pre-wrap">
{pretty}
        </pre>
      </div>
    </div>
  );
}
