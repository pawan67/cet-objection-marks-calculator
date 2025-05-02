import { getUserSummary } from "@/actions/summaryAction";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export const dynamic = "force-static";

// GET /api/summary?rollNumber=12345
export async function GET(
  request: Request,
  { params }: { params: Promise<{ rollNumber: string }> }
) {
  try {
    const { rollNumber } = await params;

    console.log("Received roll number:", rollNumber);

    const result = await getUserSummary(rollNumber);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 404 });
    }

    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
