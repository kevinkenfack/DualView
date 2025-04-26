import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-600 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white"></div>
            </div>
            <span className="font-bold text-xl text-zinc-900">ThemeSwitch</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Support
            </a>
            <a
              href="https://github.com/username/theme-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>

          <div className="text-zinc-500 text-sm">© {new Date().getFullYear()} ThemeSwitch. Tous droits réservés.</div>
        </div>
      </div>
    </footer>
  )
}
