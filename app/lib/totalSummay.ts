type SubjectSummary = {
  subject: string;
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
};

type OverallSummary = {
  totalCorrectAnswers: number;
  totalQuestions: number;
  totalMarks: string;
  percentage: number;
};

export function getOverallMarks(
  subjectSummaries: SubjectSummary[]
): OverallSummary {
  const marksPerQuestion = 2;

  const totalCorrectAnswers = subjectSummaries.reduce(
    (sum, subj) => sum + subj.correct,
    0
  );
  const totalQuestions = subjectSummaries.reduce(
    (sum, subj) => sum + subj.total,
    0
  );

  const correctMarks = totalCorrectAnswers * marksPerQuestion;
  const totalPossibleMarks = totalQuestions * marksPerQuestion;

  return {
    totalCorrectAnswers,
    totalQuestions,
    totalMarks: `${correctMarks} / ${totalPossibleMarks}`,
    percentage: parseFloat(
      ((correctMarks / totalPossibleMarks) * 100).toFixed(2)
    ),
  };
}
