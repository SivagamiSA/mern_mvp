import { useState } from "react";
import axios from "axios";

function App() {

  const [stack, setStack] = useState("");
  const [prompt, setPrompt] = useState("");
  const [theme, setTheme] = useState("");
  const [color, setColor] = useState("");
  const [tools, setTools] = useState("");
  const [mode, setMode] = useState("ai");

  const [deployment, setDeployment] = useState("");
  const [auth, setAuth] = useState("");
  const [model, setModel] = useState("");
  const [database, setDatabase] = useState("");

  const [result, setResult] = useState("");

  // ✅ TOOL HANDLER (IMPORTANT)
  

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/generate", {
      prompt,
      ui: { theme, color },
      tools,
      mode,
      deployment,
      auth,
      model,
      stack,
      database
    });

    setResult(res.data.result);
  };

  // ✅ THIS IS WHERE YOUR UI STARTS
 return (
  <div className="min-h-screen bg-[#0b0f0e] text-white flex justify-center items-start pt-16 px-4">

    <div className="w-full max-w-2xl">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-center mb-8 text-green-400">
        AI Prompt Generator
      </h1>

      {/* MAIN CARD */}
      <div className="bg-white/5 backdrop-blur-xl border border-green-400/10 rounded-2xl p-6 shadow-xl">

        {/* PROMPT */}
        <textarea
          placeholder="Describe what you want to build..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-24 p-4 rounded-xl bg-black/40 border border-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 resize-none"
        />

        {/* UI SETTINGS */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-3 rounded-xl bg-black/40 border border-green-400/20"
          >
            <option value="">Theme</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="glass">glass</option>
          </select>

          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-3 rounded-xl bg-black/40 border border-green-400/20"
          >
            <option value="">Color</option>
            <option value="green">Green</option>
            <option value="emerald">Emerald</option>
            <option value="lime">Lime</option>
            <option value="pink">pink</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
          </select>

        </div>

        {/* TOOL */}
        <select
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-black/40 border border-green-400/20"
        >
          <option value="">Tool</option>
          <option value="Gemini">Gemini</option>
          <option value="Claude">Claude</option>
          <option value="Lovable">Lovable</option>
          <option value="Replit">Replit</option>
          <option value="AI Studio">AI Studio</option>
          <option value="Cursor">Cursor</option>
          <option value="Copilot">Copilot</option>
        </select>

        {/* MODE */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode("ai")}
            className={`flex-1 p-3 rounded-xl border ${
              mode === "ai"
                ? "bg-green-500 text-black"
                : "border-green-400/20"
            }`}
          >
            AI Decide
          </button>

          <button
            onClick={() => setMode("customize")}
            className={`flex-1 p-3 rounded-xl border ${
              mode === "customize"
                ? "bg-green-500 text-black"
                : "border-green-400/20"
            }`}
          >
            Customize
          </button>
        </div>

        {/* CUSTOMIZE OPTIONS */}
        {mode === "customize" && (
          <div className="space-y-3 mb-4">

            <select
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-green-400/20"
            >
              <option value="">Stack</option>
              <option value="MEAN">MEAN Stack</option>
              <option value="MERN">MERN Stack</option>
              <option value="LAMP">LAMP Stack</option>
              <option value="JAMstack">JAMstack</option>
              <option value="Full Stack">Full Stack</option>
              <option >NO Idea</option>
            </select>

            <select
              onChange={(e) => setDeployment(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-green-400/20"
            >
              <option value="">Deployment</option>
              <option>Vercel</option>
              <option>Netlify</option>
              <option>AWS</option>
              <option>Render</option>
              <option >No Idea</option>
              <option >Not needed</option>
            </select>

            <select
              onChange={(e) => setAuth(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-green-400/20"
            >
              <option value="">Auth</option>
              <option>JWT</option>
              <option>Firebase</option>
              <option >No Idea</option>
              <option >Not needed</option>
            </select>

            <select
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-green-400/20"
            >
              <option value="">Model</option>
              <option>Gemini</option>
              <option>Claude</option>
              <option>OpenAI</option>
              <option>Llama</option>
              <option >No Idea</option>
              <option >Not needed</option>
            </select>

            <select
              onChange={(e) => setDatabase(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-green-400/20"
            >
              <option value="">Database</option>
              <option>MongoDB</option>
              <option>PostgreSQL</option>
              <option >OracaleDB</option>
              <option >No Idea</option>
            </select>

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-xl font-semibold"
        >
          Generate
        </button>

      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-6 bg-black/40 border border-green-400/20 p-4 rounded-xl">
          <pre className="text-green-200 whitespace-pre-wrap text-sm">
            {result}
          </pre>
        </div>
      )}

    </div>
  </div>
);
}

export default App;