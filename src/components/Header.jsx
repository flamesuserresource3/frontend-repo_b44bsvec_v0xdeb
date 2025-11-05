import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">REST API Studio</h1>
            <p className="text-xs text-gray-500">Quickly explore and test your backend</p>
          </div>
        </div>
        <a
          href="https://fastapi.tiangolo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          FastAPI Docs ↗
        </a>
      </div>
    </header>
  );
}
