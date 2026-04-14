import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [theme, setTheme] = useState("");
  const [color, setColor] = useState("");
  const [tools, setTools] = useState("");
  const [mode, setMode] = useState("ai");
  const [stack, setStack] = useState("");
  const [deployment, setDeployment] = useState("");
  const [auth, setAuth] = useState("");
  const [model, setModel] = useState("");
  const [database, setDatabase] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  
  const handleCopy = () => {
  navigator.clipboard.writeText(result);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 1500);
};

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
        ui: { theme, color },
        tools,
        mode,
        deployment,
        auth,
        model,
        stack,
        database,
      });

      setTimeout(() => {
        setResult(res.data.result);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setLoading(false);
      setResult("Error generating prompt");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-white to-blue-200 flex justify-center items-start pt-16 px-4">
      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
          AI Prompt Generator
        </h1>

        {/* CARD */}
        <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">

          {/* PROMPT */}
          <textarea
            placeholder="Describe what you want to build..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-24 p-4 rounded-xl border mb-4 transition-all duration-300 focus:ring-2 focus:ring-blue-400"
          />

          {/* THEME + COLOR */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-3 rounded-xl border transition-all duration-300 hover:shadow-md"
            >
              <option value="">Theme</option>
              <option>Dark</option>
              <option>Light</option>
              <option>Glass</option>
            </select>

            <input
              list="colorOptions"
              type="text"
              placeholder="Enter color..."
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="p-3 rounded-xl border transition-all duration-300 hover:shadow-md"
            />

            <datalist id="colorOptions">
              <option value="blue-orange" />
              <option value="neon" />
              <option value="pastel" />
            </datalist>
          </div>

          {/* TOOL */}
          <select
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl border transition-all duration-300 hover:shadow-md"
          >
            <option value="">Tool</option>
            <option>Gemini</option>
            <option>Claude</option>
            <option>Cursor</option>
          </select>

          {/* MODE */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setMode("ai")}
              className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                mode === "ai"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              AI Decide
            </button>

            <button
              onClick={() => setMode("customize")}
              className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                mode === "customize"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Customize
            </button>
          </div>

          {/* CUSTOMIZE */}
          {mode === "customize" && (
            <div className="space-y-3 mb-4">
              {[["Stack", setStack, ["MERN", "MEAN"]],
                ["Deployment", setDeployment, ["Vercel", "Netlify"]],
                ["Auth", setAuth, ["JWT", "Firebase"]],
                ["Model", setModel, ["Gemini", "Claude"]],
                ["Database", setDatabase, ["MongoDB", "PostgreSQL"]]
              ].map(([label, setter, options], i) => (
                <select
                  key={i}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-3 rounded-xl border transition-all duration-300 hover:shadow-md"
                >
                  <option value="">{label}</option>
                  {options.map((opt, idx) => (
                    <option key={idx}>{opt}</option>
                  ))}
                </select>
              ))}
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || loading}
            className={`w-full p-3 rounded-xl text-white transition-all duration-300 ${
              !prompt.trim()
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-orange-500 hover:scale-105 shadow-md"
            }`}
          >
            {loading ? "Generating..." : "Generate MVP Prompt"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* RESULT */}
        {result && (
  <div className="mt-6 bg-white p-4 pt-10 rounded-xl shadow relative animate-fadeIn">

    {/* COPY BUTTON */}
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-blue-600 hover:bg-orange-500 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300"
    >
      Copy
    </button>

    {/* POPUP */}
    {copied && (
      <div className="absolute top-2 left-2 text-gray px-3 py-1 rounded-lg text-sm shadow-md">
        Copied 
      </div>
    )}

    <pre className="whitespace-pre-wrap">{result}</pre>
  </div>
)}

      </div>
    </div>
  );
}

export default App;