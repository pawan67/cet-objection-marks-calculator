import { insertUserSummary } from "@/actions/summaryAction";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(req: Request) {
  try {
    const { roll_number, name, questionsData, scores } = await req.json();

    console.log("Received data:", { roll_number, name, questionsData, scores });

    const result = await insertUserSummary(
      roll_number,
      name,
      questionsData,
      scores
    );

    if (!result.success) {
      return NextResponse.json(
        { roll_number, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
