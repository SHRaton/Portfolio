export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm gradient-text font-semibold">AV</span>
          <span className="text-slate-600 text-sm">— Alexandre Vittenet</span>
        </div>

        <p className="text-slate-600 text-xs font-mono">
          © {year} · Construit avec Next.js & Tailwind CSS
        </p>

        <a
          href="https://github.com/SHRaton"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-purple-400 transition-colors text-sm font-mono"
        >
          github.com/SHRaton
        </a>
      </div>
    </footer>
  )
}
