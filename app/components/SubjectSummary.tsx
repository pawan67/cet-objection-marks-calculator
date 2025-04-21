import {
  getSubjectWiseSummary,
  type ParsedQuestion,
} from "~/lib/subjectSummary";

export function SubjectSummary({ data }: { data: ParsedQuestion[] }) {
  const summary = getSubjectWiseSummary(data);

  return (
    <ul className="grid grid-cols-2 gap-5">
      {summary.map((s) => (
        <li key={s.subject}>
          <p className="font-semibold">{s.subject}</p>
          <span>
            {s.correct} / {s.total}
          </span>
        </li>
      ))}
    </ul>
  );
}
