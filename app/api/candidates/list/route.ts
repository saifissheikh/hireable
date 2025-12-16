import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CANDIDATES_PER_PAGE = 12;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = parseInt(searchParams.get("offset") || "0");
  const searchQuery = searchParams.get("search") || "";

  try {
    // Build query with optimized field selection
    let query = supabaseAdmin
      .from("candidates")
      .select(
        "id, full_name, bio, location, years_of_experience, skills, profile_picture_url",
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + CANDIDATES_PER_PAGE - 1);

    // Server-side search
    if (searchQuery) {
      query = query.or(
        `full_name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,skills.cs.{${searchQuery}}`
      );
    }

    const { data: candidates, error, count } = await query;

    if (error) {
      console.error("Error fetching candidates:", error);
      return NextResponse.json(
        { error: "Failed to fetch candidates" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      candidates: candidates || [],
      totalCount: count || 0,
      hasMore: offset + CANDIDATES_PER_PAGE < (count || 0),
    });
  } catch (error) {
    console.error("Error in candidates list API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
