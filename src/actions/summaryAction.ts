import { db } from "@/db/drizzle";
import { summaryDataTable } from "@/db/schema";
import { eq } from "drizzle-orm";
type QuestionData = {
  subject: string;
  isCorrect: boolean;
  questionId: string;
  userOption: string;
  correctOption: string;
};

type Scores = {
  percentage: number;
  totalMarks: string;
  totalQuestions: number;
  totalCorrectAnswers: number;
};

type UserSummary = {
  id: number;
  roll_number: string;
  name: string;
  questionsData: QuestionData[];
  scores: Scores;
};

type LeaderboardEntry = {
  id: number;
  rollNumber: string;
  name: string;
  scores: Scores & { percentile: number };
};

type ScoreBuckets = {
  "0-20": number;
  "21-40": number;
  "41-60": number;
  "61-80": number;
  "81-100": number;
};

type SubjectStats = Record<string, { total: number; correct: number }>;
export const insertUserSummary = async (
  rollNumber: string,
  name: string,
  questionsData: any,
  scores: any
) => {
  try {
    // ✅ Check for existing roll number
    const existingUser = await db
      .select()
      .from(summaryDataTable)
      .where(eq(summaryDataTable.roll_number, rollNumber))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, message: "Roll number already exists" };
    }

    // ✅ Insert if roll number not found
    await db.insert(summaryDataTable).values({
      roll_number: rollNumber,
      name,
      questionsData,
      scores,
    });

    return { success: true, message: "Data inserted successfully" };
  } catch (error) {
    console.error("Insert Error:", error);
    return { success: false, message: "Database error" };
  }
};

export const getUserSummary = async (rollNumber: string) => {
  try {
    const userSummary = await db
      .select()
      .from(summaryDataTable)
      .where(eq(summaryDataTable.roll_number, rollNumber))
      .limit(1);

    if (userSummary.length === 0) {
      return { success: false, message: "No data found" };
    }

    return { success: true, data: userSummary[0] };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Database error" };
  }
};

export const getLeaderboardWithPercentiles = async (): Promise<{
  success: boolean;
  data:
    | {
        leaderBoard: LeaderboardEntry[];
        totalUsers: number;
        topScorer: {
          name: string;
          rollNumber: string;
          percentage: number;
          totalCorrectAnswers: number;
        };
        average: {
          percentage: number;
          totalCorrectAnswers: number;
          accuracy: number;
        };
        scoreBuckets: ScoreBuckets;
        subjectStats: SubjectStats;
      }
    | [];
  message?: string;
}> => {
  try {
    const allSummaries: any[] = await db
      .select()
      .from(summaryDataTable);

    if (!allSummaries || allSummaries.length === 0) {
      return { success: false, message: "No data found", data: [] };
    }

    const totalUsers = allSummaries.length;
    let totalPercentage = 0;
    let totalCorrectAnswers = 0;

    const subjectStats: SubjectStats = {};
    const scoreBuckets: ScoreBuckets = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
    };

    const enhancedData: LeaderboardEntry[] = allSummaries.map((user) => {
      const { scores, questionsData } = user;
      const correctAnswers = scores.totalCorrectAnswers;
      const percentage = scores.percentage;

      totalCorrectAnswers += correctAnswers;
      totalPercentage += percentage;

      // Score Buckets
      if (percentage <= 20) scoreBuckets["0-20"]++;
      else if (percentage <= 40) scoreBuckets["21-40"]++;
      else if (percentage <= 60) scoreBuckets["41-60"]++;
      else if (percentage <= 80) scoreBuckets["61-80"]++;
      else scoreBuckets["81-100"]++;

      // Subject Stats
      if (Array.isArray(questionsData)) {
        questionsData.forEach((q) => {
          const subject = q.subject;
          if (!subjectStats[subject]) {
            subjectStats[subject] = { total: 0, correct: 0 };
          }
          subjectStats[subject].total += 1;
          if (q.isCorrect) subjectStats[subject].correct += 1;
        });
      }

      const usersBelow = allSummaries.filter(
        (u) => u.scores.totalCorrectAnswers < correctAnswers
      ).length;

      const percentile = Number(((usersBelow / totalUsers) * 100).toFixed(2));

      return {
        id: user.id,
        rollNumber: user.roll_number,
        name: user.name,
        scores: {
          ...scores,
          percentile,
        },
      };
    });

    const sortedData = enhancedData.sort(
      (a, b) => b.scores.percentage - a.scores.percentage
    );

    const topScorer = sortedData[0];

    const average = {
      percentage: Number((totalPercentage / totalUsers).toFixed(2)),
      totalCorrectAnswers: Number(
        (totalCorrectAnswers / totalUsers).toFixed(2)
      ),
      accuracy: Number(
        (
          (totalCorrectAnswers /
            (totalUsers * (allSummaries[0]?.scores.totalQuestions || 100))) *
          100
        ).toFixed(2)
      ),
    };

    return {
      success: true,
      data: {
        leaderBoard: sortedData,
        totalUsers,
        topScorer: {
          name: topScorer.name,
          rollNumber: topScorer.rollNumber,
          percentage: topScorer.scores.percentage,
          totalCorrectAnswers: topScorer.scores.totalCorrectAnswers,
        },
        average,
        scoreBuckets,
        subjectStats,
      },
    };
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return { success: false, message: "Database error", data: [] };
  }
};
