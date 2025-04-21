export type ParsedQuestion = {
  questionId: string;
  subject: string;
  correctOption: string;
  userOption: string;
  isCorrect: boolean;
};

type SubjectSummary = {
  subject: string;
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
};

export function getSubjectWiseSummary(
  data: ParsedQuestion[]
): SubjectSummary[] {
  const summaryMap: Record<string, SubjectSummary> = {};

  data.forEach((item) => {
    const { subject, isCorrect } = item;

    if (!summaryMap[subject]) {
      summaryMap[subject] = {
        subject,
        total: 0,
        correct: 0,
        incorrect: 0,
        percentage: 0,
      };
    }

    summaryMap[subject].total += 1;
    if (isCorrect) {
      summaryMap[subject].correct += 1;
    } else {
      summaryMap[subject].incorrect += 1;
    }
  });

  Object.values(summaryMap).forEach((summary) => {
    summary.percentage = parseFloat(
      ((summary.correct / summary.total) * 100).toFixed(2)
    );
  });

  return Object.values(summaryMap);
}
