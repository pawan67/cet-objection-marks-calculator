"use client";
import FileUploader from "@/components/FileUploader";
import { InstructionsCard } from "@/components/InstructionsCard";
import OverallSummary from "@/components/OverallSummary";
import QuestionsTable from "@/components/QuestionsTable";
import { SubjectSummary } from "@/components/SubjectSummary";
import { ThemeToggle } from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserInfo from "@/components/UserInfo";
import {
  extractNameFromHTML,
  extractRollNumberFromHTML,
  parseObjectionTable,
} from "@/lib/parseObjections";
import { type ParsedQuestion } from "@/lib/subjectSummary";
import { TOverallSummary } from "@/lib/totalSummay";
import { ArrowLeft, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

export function SummaryPreview({
  data,
}: {
  data: {
    roll_number: string;
    name: string;
    questionsData: ParsedQuestion[];
    scores: TOverallSummary;
  };
}) {
  console.log("Preview data:", data);
  const [parsedData, setParsedData] = useState<ParsedQuestion[]>([]);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [name, setName] = useState("");

  const handleFileData = async (html: string) => {
    const parsed = parseObjectionTable(html);

    setParsedData(parsed);
    const extractedName = extractNameFromHTML(html);
    if (extractedName) setName(extractedName);

    const extractedRollNumber = extractRollNumberFromHTML(html);
    if (extractedRollNumber) setIsFileAdded(true);
  };

  return (
    <main className="container mx-auto h-full min-h-screen p-5">
      <div>
        <div className="grid h-full gap-5 md:grid-cols-3">
          <Card>
            <CardHeader className="text-2xl font-bold">
              🧮 Results for : {data.roll_number}
            </CardHeader>
            <CardContent>
              <Link className={buttonVariants()} href="/">
                <ArrowLeft /> Go Back to Home
              </Link>

              <br />
              <div className="mt-5">
                <Link
                  className="mt-5 text-blue-400 underline"
                  href="/leaderboard-and-stats"
                >
                  📊 Click to see the leaderboard and detailed analysis for 2025
                </Link>
              </div>
              <Link
                href="https://www.linkedin.com/in/pawan67/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-muted-foreground"
              >
                Created by{" "}
                <span className="font-semibold text-blue-400 underline">
                  Pawan Tamada :)
                </span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-2xl font-bold">
              Subject Wise Summary
            </CardHeader>
            <CardContent>
              <SubjectSummary data={data.questionsData} />
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader>
              {" "}
              <h2 className="text-2xl font-bold">Summary</h2>
              <div className="absolute right-5 top-3">
                <ThemeToggle />
              </div>
            </CardHeader>
            <CardContent>
              <OverallSummary data={data.questionsData} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <QuestionsTable data={data.questionsData} />
        </div>
      </div>
    </main>
  );
}
