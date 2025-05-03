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
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  return (
    <main className="max-w-3xl mx-auto  h-full min-h-screen p-5">
      <div>
        <div className="grid h-full gap-5 md:grid-cols-2 ">
          <Card className=" col-span-2">
            <CardHeader className="text-2xl font-bold">
              🧮 Results for : {data.name}
            </CardHeader>
            <CardContent>
              <Alert variant="default">
                <CircleAlert className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Reload the page to upload a new file.
                </AlertDescription>
              </Alert>

          

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
              <div className="absolute right-5 top-5">
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
