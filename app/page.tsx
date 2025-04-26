import { Button } from "@/components/ui/button"
import { Github, ArrowRight, Moon, Zap, Layers, Palette } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import Footer from "@/components/footer"
import DemoAnimation from "@/components/demo-animation"
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-600 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-white"></div>
            </div>
            <span className="font-bold text-xl text-zinc-900">ThemeSwitch</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Fonctionnalités
            </a>
            <a href="#demo" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Démo
            </a>
            <a href="#get-started" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Commencer
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="hidden sm:flex">
              <Link href="/app">
                Essayer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-zinc-900 hover:bg-zinc-800">
              <a href="https://github.com/username/theme-switch" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-white -z-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800 bg-clip-text text-transparent">
              Présentez vos designs en mode clair et sombre
            </h1>
            <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto">
              ThemeSwitch est un outil moderne qui vous permet de comparer et présenter vos interfaces en mode clair et
              sombre avec un effet de transition interactif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-zinc-900 hover:bg-zinc-800 px-8 py-6 text-lg rounded-xl">
                <Link href="/app">
                  Essayer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl border-zinc-300">
                <a href="#demo">Voir la démo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Découvrez comment ThemeSwitch peut vous aider à présenter vos designs de manière professionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Moon className="h-6 w-6" />}
              title="Comparaison de thèmes"
              description="Comparez facilement vos designs en mode clair et sombre avec un curseur interactif"
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Interface moderne"
              description="Profitez d'une interface utilisateur intuitive et élégante pour une expérience fluide"
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Arrière-plans personnalisés"
              description="Ajoutez vos propres arrière-plans pour mettre en valeur vos designs"
            />
            <FeatureCard
              icon={<Palette className="h-6 w-6" />}
              title="Présentation professionnelle"
              description="Impressionnez vos clients avec des présentations interactives de haute qualité"
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-zinc-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Voyez ThemeSwitch en action</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Notre outil permet de créer des comparaisons interactives entre vos designs en mode clair et sombre
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <DemoAnimation />
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à améliorer vos présentations ?</h2>
            <p className="text-zinc-300 mb-10 max-w-2xl mx-auto">
              Commencez dès maintenant à utiliser ThemeSwitch pour présenter vos designs de manière professionnelle et
              interactive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-100 px-8 py-6 text-lg rounded-xl"
              >
                <a href="/app">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-xl border-zinc-600 hover:bg-zinc-800"
              >
                <a href="https://github.com/username/theme-switch" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
