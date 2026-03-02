import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const id = params.id

  const h = await headers()
  const host = h.get("host")
  const protocol = host?.includes("localhost") ? "http" : "https"

  const res = await fetch(`${protocol}://${host}/api/news/${id}`, {
    cache: "no-store",
  })

  const item = await res.json()

  return (
    <div className="container mx-auto py-24">
      <Link href="/news" className="text-primary font-mono underline">
        ← Назад ко всем новостям
      </Link>

      <div className="text-7xl mt-8">{item.icon}</div>
      <h1 className="text-6xl font-bold font-mono mt-4">{item.title}</h1>

      {/* DATE */}
      <p className="opacity-60 mt-2">{item.date}</p>

      <div className="relative w-full h-[480px] rounded-3xl overflow-hidden mt-14">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>

      <p className="text-2xl opacity-80 leading-relaxed max-w-4xl mt-14">
        {item.content}
      </p>
    </div>
  )
}
