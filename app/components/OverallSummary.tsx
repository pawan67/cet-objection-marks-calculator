import {
  getSubjectWiseSummary,
  type ParsedQuestion,
} from "~/lib/subjectSummary";
import { getOverallMarks } from "~/lib/totalSummay";

export function OverallSummary({ data }: { data: ParsedQuestion[] }) {
  const summary = getOverallMarks(getSubjectWiseSummary(data));

  return (
    <ul className="grid grid-cols-2 gap-5">
      <li>
        <h3 className="font-semibold">Total Marks</h3>
        <p>{summary.totalMarks}</p>
      </li>
      <li>
        <h3 className="font-semibold">Percentage</h3>
        <p>{summary.percentage}%</p>
      </li>
      <li>
        <h3 className="font-semibold">Correct Answers</h3>
        <p>{summary.totalCorrectAnswers}</p>
      </li>
      <li>
        <h3 className="font-semibold">Total Questions</h3>
        <p>{summary.totalQuestions}</p>
      </li>
    </ul>
  );
}

export default OverallSummary;
