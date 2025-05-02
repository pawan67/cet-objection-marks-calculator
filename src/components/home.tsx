"use client";
import FileUploader from "@/components/FileUploader";
import { InstructionsCard } from "@/components/InstructionsCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  extractNameFromHTML,
  extractRollNumberFromHTML,
  parseObjectionTable,
} from "@/lib/parseObjections";
import { getSubjectWiseSummary } from "@/subjectSummary";
import { getOverallMarks } from "@/totalSummay";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Home() {
  const router = useRouter();
  const handleFileData = async (html: string) => {
    const parsed = parseObjectionTable(html);

    const extractedName = extractNameFromHTML(html);

    const extractedRollNumber = extractRollNumberFromHTML(html);
    if (extractedRollNumber) console.log("Roll Number:", extractedRollNumber);

    if (!extractedName || !extractedRollNumber) {
      console.error("Error extracting data from HTML");
      return;
    }

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roll_number: extractedRollNumber,
        name: extractedName,
        questionsData: parsed,
        scores: getOverallMarks(getSubjectWiseSummary(parsed)),
      }),
    });
    const data = await res.json();

    console.log("Response data:", data);
    if (res.status === 200) {
      toast.success("Data inserted successfully");
      console.log("Data inserted successfully:", data);
      router.push("/preview" + `/${extractedRollNumber}`);
    }
    if (res.status === 400) {
      toast.error("Roll number already exists");
      router.push("/preview" + `/${extractedRollNumber}`);

      console.error("Error inserting data:", data);
    }
    if (res.status === 500) {
      toast.error("Internal server error");
      console.error("Internal server error:", data);
    }
  };

  return (
    <main className="container mx-auto h-full min-h-screen p-5">
      <div className=" max-w-3xl mx-auto">
        <div className="grid h-full gap-5 ">
          <Card>
            <CardHeader className="text-2xl font-bold">
              CET Exam Score Calculator 🧮
            </CardHeader>
            <CardContent>
              <FileUploader onUpload={handleFileData} />

              <Alert className="mt-3">
                <CircleAlert className="h-4 w-4" />
                <AlertDescription>
                  When you upload your .htm file, the app will extract the data
                  from it and use it to show your rank on the leaderboard.
                </AlertDescription>
              </Alert>
              <div className="mt-5">
                <Link
                  className="mt-5 text-blue-400 underline"
                  href="/leaderboard-and-stats"
                >
                  📊 Click to see the leaderboard and detailed analysis
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <InstructionsCard />
        </div>
      </div>
    </main>
  );
}
