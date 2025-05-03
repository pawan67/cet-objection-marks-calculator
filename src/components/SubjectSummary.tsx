import {
  getSubjectWiseSummary,
  type ParsedQuestion,
} from "@/lib/subjectSummary";

export function SubjectSummary({ data }: { data: ParsedQuestion[] }) {
  const summary = getSubjectWiseSummary(data);
  console.log("Subject Summary:", summary);

  return (
    <ul className="grid grid-cols-2 gap-5">
      {summary.map((s) => (
        <li key={s.subject}>
          <p className=" font-medium text-sm">{s.subject}</p>
          <span className=" text-sm text-muted-foreground">
            {s.correct} / {s.total}
          </span>
        </li>
      ))}
    </ul>
  );
}
