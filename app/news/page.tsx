import Link from "next/link"
import { headers } from "next/headers"
import { Sparkles, ArrowUpRight } from "lucide-react"

export default async function NewsPage() {
  const h = await headers()
  const host = h.get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news`, { cache: "no-store" })
  const news = await res.json()

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* NAVBAR */}
        <div className="flex items-center gap-3 mb-24">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
        </div>

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">news</p>
          <h1 className="text-4xl md:text-6xl font-bold font-mono leading-tight">
            Новости
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Flex
            </span>
          </h1>
          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Следи за обновлениями.{" "}
            <span className="text-white">Релизы, события и анонсы команды.</span>
          </p>
        </div>

        {/* NEWS GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {news.map((n: any) => (
            <Link
              key={n.id}
              href={`/news/${n.id}`}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/10 to-transparent pointer-events-none z-10" />

              {/* image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={n.image}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-3xl">{n.icon}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-primary transition mt-1 shrink-0" />
                </div>

                <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-2">{n.date}</p>

                <h2 className="font-mono font-bold text-lg text-white mb-2 leading-snug">
                  {n.title}
                </h2>

                <p className="text-sm text-white/40 leading-relaxed">
                  {n.content.length > 110 ? n.content.slice(0, 110) + "..." : n.content}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}