import { useState, useEffect } from "react";
import { Send } from "lucide-react";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function ApiRequestForm({ baseUrl, initialPath = "/api/hello", initialMethod = "GET", onSend }) {
  const [method, setMethod] = useState(initialMethod);
  const [path, setPath] = useState(initialPath);
  const [body, setBody] = useState("{\n  \"message\": \"Hello API\"\n}");

  useEffect(() => {
    setPath(initialPath);
    setMethod(initialMethod);
  }, [initialPath, initialMethod]);

  const submit = (e) => {
    e.preventDefault();
    let parsed;
    if (method !== "GET" && body.trim()) {
      try {
        parsed = JSON.parse(body);
      } catch (err) {
        alert("Request body is not valid JSON");
        return;
      }
    }
    onSend({ method, path, body: parsed });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-28 rounded-md border bg-white px-2 py-2 text-sm"
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <div className="flex-1">
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="/api/hello"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Send className="h-4 w-4" /> Send
        </button>
      </div>

      {method !== "GET" && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">JSON Body</label>
          <textarea
            className="h-40 w-full resize-none rounded-md border px-3 py-2 font-mono text-xs"
            spellCheck={false}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      )}

      <p className="text-xs text-gray-500">
        Sending to: <span className="font-medium text-gray-700">{baseUrl}{path}</span>
      </p>
    </form>
  );
}
