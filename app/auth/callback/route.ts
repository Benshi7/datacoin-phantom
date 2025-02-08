import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
      const supabase = createClient()
      await supabase.auth.exchangeCodeForSession(code)
    }

    // Redirect to dashboard after successful authentication
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Auth callback error:", error)
    // Redirect to sign in page if there's an error
    return NextResponse.redirect(new URL("/signin", request.url))
  }
}

