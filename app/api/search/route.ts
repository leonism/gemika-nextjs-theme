import { NextResponse } from "next/server"
import { searchAllContent } from "@/lib/content"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  try {
    const results = await searchAllContent(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}

