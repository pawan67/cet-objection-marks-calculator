import { getLeaderboardWithPercentiles } from "@/actions/summaryAction";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const result = await getLeaderboardWithPercentiles();

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}
