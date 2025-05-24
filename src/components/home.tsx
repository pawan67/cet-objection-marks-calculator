"use client";
import FileUploader from "@/components/FileUploader";
import { InstructionsCard } from "@/components/InstructionsCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { toast } from "sonner";
import { SummaryPreview } from "./Preview";
import { Button } from "./ui/button";

export function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const handleFileData = async (html: string) => {
    const parsed = parseObjectionTable(html);

    const extractedName = extractNameFromHTML(html);

    const extractedRollNumber = extractRollNumberFromHTML(html);
    if (extractedRollNumber) console.log("Roll Number:", extractedRollNumber);

    if (!extractedName || !extractedRollNumber) {
      console.error("Error extracting data from HTML");
      return;
    }

    setData({
      roll_number: extractedRollNumber,
      name: extractedName,
      questionsData: parsed,
      scores: getOverallMarks(getSubjectWiseSummary(parsed)),
    });
    setIsFileAdded(true);

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

    toast.success("File uploaded successfully!");
  };

  console.log("Data:", data);

  return (
    <div>
      {isFileAdded && data ? (
        <SummaryPreview data={data} />
      ) : (
        <HomePage handleFileData={handleFileData} />
      )}
    </div>
  );
}

function HomePage({ handleFileData }: { handleFileData: any }) {
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
                  from it and show the results and summary.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <InstructionsCard />
        </div>

        <Card className=" mt-5">
          <CardHeader>
            <CardTitle>Experimental Features 🧪</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a experimental feature, it is not yet ready.</p>
            <Button className=" mt-5">
              <Link href="/leaderboard-and-stats">Leaderboard and Stats</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
