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
import { useState } from "react";
import { toast } from "sonner";
import { SummaryPreview } from "./Preview";

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

    console.log("Parsed Data:", parsed, data);

    setIsFileAdded(true);
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
                  from it and use it to show your rank on the leaderboard.
                </AlertDescription>
              </Alert>
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
