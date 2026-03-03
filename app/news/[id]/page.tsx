import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const h = await headers()
  const host = h.get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news/${params.id}`, { cache: "no-store" })
  const item = await res.json()

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* NAVBAR */}
        <div className="flex items-center gap-3 mb-16">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
        </div>

        {/* BACK */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/30 uppercase hover:text-primary transition mb-16 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
          Все новости
        </Link>

        {/* META */}
        <div className="mb-8">
          <span className="text-5xl">{item.icon}</span>
          <p className="font-mono text-xs tracking-widest text-white/30 uppercase mt-4 mb-3">{item.date}</p>
          <h1 className="text-3xl md:text-5xl font-bold font-mono leading-tight">
            {item.title}
          </h1>
        </div>

        {/* IMAGE */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 mb-12" style={{ height: 360 }}>
          <Image src={item.image} alt={item.title} fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-violet-400/5 to-transparent pointer-events-none" />
          <p className="relative z-10 text-white/70 text-lg leading-relaxed font-light">
            {item.content}
          </p>
        </div>

      </div>
    </section>
  )
}