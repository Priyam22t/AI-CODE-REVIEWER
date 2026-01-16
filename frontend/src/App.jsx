import { useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import {
  ShieldCheck,
  ShieldAlert,
  Zap,
  Copy,
  Check,
  Wand2,
  Sun,
  Moon,
  FileDown,
} from "lucide-react";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

export default function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(null);
  const [security, setSecurity] = useState("");
  const [performance, setPerformance] = useState("");
  const [review, setReview] = useState("");
  const [autofix, setAutofix] = useState("");

  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(true);

  const reviewCode = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setScore(null);
    setReview("");
    setAutofix("");

    try {
      const res = await fetch("http://localhost:3000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();

      setScore(data.score);
      setSecurity(data.security);
      setPerformance(data.performance);
      setReview(data.review);
      setAutofix(data.autofix || "");
    } catch {
      setReview("❌ Failed to generate review. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const copyReview = () => {
    navigator.clipboard.writeText(review);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const applyAutofix = () => {
    if (autofix) setCode(autofix);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(14);
    pdf.text("AI Code Review Report", 10, 10);

    pdf.setFontSize(10);
    pdf.text(`Score: ${score}/100`, 10, 20);
    pdf.text(`Security: ${security}`, 10, 26);
    pdf.text(`Performance: ${performance}`, 10, 32);

    pdf.text("Review:", 10, 42);
    pdf.text(review.replace(/[#*`]/g, ""), 10, 48, { maxWidth: 180 });

    pdf.save("ai-code-review.pdf");
  };

  const scoreColor =
    score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
        {/* LEFT */}
        <div className="w-1/2 p-6 border-r border-zinc-300 dark:border-zinc-700 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">✨ AI Code Reviewer</h1>

            <div className="flex gap-2 items-center">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded"
              >
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>

              <button onClick={() => setDark(!dark)}>
                {dark ? <Sun /> : <Moon />}
              </button>
            </div>
          </div>

          <Editor
            height="75vh"
            theme={dark ? "vs-dark" : "light"}
            language={language}
            value={code}
            onChange={(v) => setCode(v || "")}
          />

          <button
            onClick={reviewCode}
            className="mt-4 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold text-white"
          >
            {loading ? "Reviewing..." : "Review Code"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-6 bg-zinc-200 dark:bg-zinc-800 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">AI Review</h2>

            {review && (
              <div className="flex gap-2">
                <button onClick={copyReview}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button onClick={downloadPDF}>
                  <FileDown size={18} />
                </button>
              </div>
            )}
          </div>

          {/* METRICS */}
          {score !== null && (
            <>
              <div className="mb-4">
                <p className="text-sm mb-1">Code Quality Score</p>
                <div className="w-full bg-zinc-400 dark:bg-zinc-700 rounded h-3">
                  <div
                    className={`${scoreColor} h-3 rounded`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{score}/100</p>
              </div>

              <div className="flex gap-3 mb-6">
                <span className="flex items-center gap-1 bg-zinc-300 dark:bg-zinc-700 px-3 py-1 rounded">
                  {security === "Low Risk" ? (
                    <ShieldCheck className="text-green-400" size={16} />
                  ) : (
                    <ShieldAlert className="text-red-400" size={16} />
                  )}
                  {security}
                </span>

                <span className="flex items-center gap-1 bg-zinc-300 dark:bg-zinc-700 px-3 py-1 rounded">
                  <Zap className="text-blue-400" size={16} />
                  {performance}
                </span>
              </div>
            </>
          )}

          {loading && <p className="animate-pulse">Analyzing with AI…</p>}

          {!loading && review && (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{review}</ReactMarkdown>
            </div>
          )}

          {/* DIFF + AUTOFIX */}
          {autofix && (
            <>
              <h3 className="mt-6 font-semibold">🔍 Code Diff</h3>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <pre className="bg-black text-red-400 p-3 rounded text-xs overflow-x-auto">
                  {code}
                </pre>
                <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
                  {autofix}
                </pre>
              </div>

              <button
                onClick={applyAutofix}
                className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                <Wand2 size={16} />
                Apply Auto-Fix
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
