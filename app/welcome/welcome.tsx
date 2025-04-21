import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import { InstructionsCard } from "~/components/InstructionsCard";
import OverallSummary from "~/components/OverallSummary";
import QuestionsTable from "~/components/QuestionsTable";
import { SubjectSummary } from "~/components/SubjectSummary";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import UserInfo from "~/components/UserInfo";
import {
  extractNameFromHTML,
  parseObjectionTable,
} from "~/lib/parseObjections";
import type { ParsedQuestion } from "~/lib/subjectSummary";

export function Welcome() {
  const [parsedData, setParsedData] = useState<ParsedQuestion[]>([]);
  const [isFileAdded, setIsFileAdded] = useState(false);
  const [name, setName] = useState("");

  const handleFileData = (html: string) => {
    const parsed = parseObjectionTable(html);
    setParsedData(parsed);
    const extractedName = extractNameFromHTML(html);
    if (extractedName) setName(extractedName);
    setIsFileAdded(true);
  };

  return (
    <main className="container mx-auto h-full min-h-screen p-5">
      <div className="h-full grid md:grid-cols-3 gap-5">
        <Card>
          <CardHeader>CET Exam Score Calculator</CardHeader>
          <CardContent>
            <FileUploader onUpload={handleFileData} />
            {isFileAdded && <UserInfo name={name} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Subject Wise Summary</CardHeader>
          <CardContent>
            <SubjectSummary data={parsedData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Summary</CardHeader>
          <CardContent>
            <OverallSummary data={parsedData} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-5">
        {isFileAdded ? (
          <QuestionsTable data={parsedData} />
        ) : (
          <InstructionsCard />
        )}
      </div>
    </main>
  );
}
