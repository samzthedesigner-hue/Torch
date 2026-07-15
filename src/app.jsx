import React, { useState, useEffect, useRef } from 'react';
import { CreateWebWorkerEngine } from '@mlc-ai/web-llm';
import JSZip from 'jszip';
import { Flame, Download, Sparkles, Terminal, Layers, Smartphone } from 'lucide-react';

export default function App() {
  const [engine, setEngine] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [projectName, setProjectName] = useState('my-torch-app');
  const [targetTech, setTargetTech] = useState('React + Node.js');
  const [status, setStatus] = useState('Initializing Core Hardware Interfaces...');
  const [progress, setProgress] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [logs, setLogs] = useState([]);
  const logEndRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      addLog('🚀 Torch PWA is ready for local Android device installation!');
    };
    window.addEventListener('beforeinstallprompt', handler);

    async function initWebLLM() {
      try {
        addLog('⚡ Attaching WebGPU computing layers...');
        const webEngine = await CreateWebWorkerEngine(
          new Worker(new URL('./worker.js', import.meta.url), { type: 'module' }),
          "Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",
          {
            initProgressCallback: (report) => {
              setProgress(Math.round(report.progress * 100));
              setStatus(`Loading AI Intelligence Core: ${Math.round(report.progress * 100)}%`);
            }
          }
        );
        setEngine(webEngine);
        setStatus('Torch System Operational [100% Offline Enabled]');
        addLog('🔥 Model fully cached inside device sandbox storage.');
      } catch (err) {
        setStatus('WebGPU Initialization Failed. Verify Hardware Compatibility.');
        addLog(`❌ Error: ${err.message}`);
      }
    }
    initWebLLM();
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []); // FIXED

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]); // FIXED

  const addLog = (msg) => setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const triggerAndroidInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  const executeCompilation = async () => {
    if (!prompt.trim()) return addLog('⚠️ App requirements input canvas is empty.');
    if (!engine) return addLog('⚠️ AI Engine not loaded yet. Wait for 100%');
    setStatus('Torch Compilation Agent Running...');
    addLog(`🏗️ Spawning environment framework for project: [${projectName}]`);
    addLog(`🛠️ Target technology matrix configured to: [${targetTech}]`);
    try {
      const systemDirective = `You are Torch, an offline full-stack engineering agent.
      Analyze the prompt and generate multiple files covering both the frontend and backend architectures requested.
      You must respond strictly with a valid JSON array of file objects, containing no markdown formatting outside of the JSON structure itself.`;
      addLog('🤖 Sending blueprints into offline WebGPU transformer pipeline...');
      const completion = await engine.chat.completions.create({
        messages: [
          { role: 'system', content: systemDirective },
          { role: 'user', content: `Project Type: ${targetTech}. Application Prompt: ${prompt}` }
        ]
      });
      const cleanResponse = completion.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
      addLog('📦 De-serializing generated files from neural context output...');
      const fileManifest = JSON.parse(cleanResponse);
      addLog('🗜️ Packaging project files into downloadable client archive...');
      const zip = new JSZip();
      fileManifest.forEach((file) => {
        zip.file(file.path, file.content);
        addLog(` -> Generated File: ${file.path}`);
      });
      const contentBlob = await zip.generateAsync({ type: 'blob' });
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = URL.createObjectURL(contentBlob);
      downloadAnchor.download = `${projectName}-torch-build.zip`;
      downloadAnchor.click();
      setStatus('Torch System Operational [100% Offline Enabled]');
      addLog('✅ Operation Successful! Distribution package transferred to file download manager.');
    } catch (err) {
      setStatus('Compilation Fault Triggered');
      addLog(`❌ Fatal parsing structure error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-mono text-sm max-w-5xl mx-auto p-4 md:p-6 selection:bg-orange-500 selection:text-black">
      <header className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          <span className="text-lg font-bold tracking-wider uppercase text-zinc-200">Torch // Local Core</span>
        </div>
        {deferredPrompt && (
          <button onClick={triggerAndroidInstall} className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-black font-bold rounded transition">
            <Smartphone className="w-4 h-4" /> Install to Android
          </button>
        )}
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-[#111217] border border-zinc-800 p-4 rounded-lg space-y-4">
            <h2 className="font-bold text-orange-500 flex items-center gap-2 border-b border-zinc-800 pb-2"><Layers className="w-4 h-4" /> Config</h2>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full bg-[#1c1d24] border-zinc-700 px-3 py-2 rounded" />
            <select value={targetTech} onChange={(e) => setTargetTech(e.target.value)} className="w-full bg-[#1c1d24] border border-zinc-700 px-3 py-2 rounded">
              <option>React + Node.js (Fullstack PWA)</option>
              <option>Python + Flask Server</option>
            </select>
          </div>
          <div className="bg-[#111217] border-zinc-800 p-4 rounded-lg">
            <div className="text-xs text-zinc-500 uppercase mb-1">System State</div>
            <div className="font-bold text-emerald-400">{status}</div>
            <div className="w-full bg-zinc-800 h-1.5 mt-3 rounded-full"><div className="bg-orange-500 h-full" style={{ width: `${progress}%` }}></div></div>
          </div>
        </div>
        <div className="md:col-span-2">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#1c1d24] p-4 rounded min-h-[350px]" />
          <button onClick={executeCompilation} className="w-full mt-4 bg-orange-500 text-black font-bold p-3 rounded">Compile & Package</button>
        </div>
      </main>
      <footer className="mt-6 bg-[#090a0d] border border-zinc-800 rounded-lg p-4">
        <div className="space-y-1 text-xs text-zinc-400 max-h-40 overflow-y-auto">
          {logs.map((log, index) => <div key={index}>{log}</div>)}
          <div ref={logEndRef} />
        </div>
      </footer>
    </div>
  );
      }
