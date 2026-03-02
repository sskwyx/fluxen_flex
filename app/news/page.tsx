import Link from "next/link"
import { headers } from "next/headers"

export default async function NewsPage() {
  const h = await headers()
  const host = h.get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news`, {
    cache: "no-store",
  })

  const news = await res.json()

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-6xl font-bold mb-16 font-mono">
        Новости <span className="text-primary">Flex</span>
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
        {news.map((n: any) => (
          <Link
            key={n.id}
            href={`/news/${n.id}`}
            className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-xl hover:border-primary/40 transition"
          >
            <div className="relative h-56">
              <img
                src={n.image}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
              />
            </div>

            <div className="p-7">
              <div className="text-5xl mb-3">{n.icon}</div>

              {/* DATE ADDED */}
              <div className="text-xs font-mono opacity-60 mb-2">{n.date}</div>

              <h2 className="text-2xl font-bold mb-2 font-mono">
                {n.title}
              </h2>

              <p className="opacity-70">
                {n.content.length > 110 ? n.content.slice(0, 110) + "..." : n.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
