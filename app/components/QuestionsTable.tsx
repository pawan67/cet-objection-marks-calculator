import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import {
  getSubjectWiseSummary,
  type ParsedQuestion,
} from "~/lib/subjectSummary";
import { getOverallMarks } from "~/lib/totalSummay";

export function QuestionsTable({ data }: { data: ParsedQuestion[] }) {
  const overall = getOverallMarks(getSubjectWiseSummary(data));

  return (
    <Table>
      <TableCaption>A total of {data.length} questions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Question ID</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Correct Option</TableHead>
          <TableHead>User Option</TableHead>
          <TableHead>Is Correct</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.questionId}>
            <TableCell className="font-medium">{item.questionId}</TableCell>
            <TableCell>{item.subject}</TableCell>
            <TableCell>{item.correctOption}</TableCell>
            <TableCell>{item.userOption}</TableCell>
            <TableCell>
              {item.isCorrect ? (
                <Button variant="secondary">Yes</Button>
              ) : (
                <Button variant="destructive">No</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {overall.totalCorrectAnswers} / {overall.totalQuestions}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default QuestionsTable;