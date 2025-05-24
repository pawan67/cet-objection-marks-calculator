"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

interface LeaderboardEntry {
  id: number;
  rollNumber: string;
  name: string;
  scores: {
    percentage: number;
    totalMarks: string;
    totalQuestions: number;
    totalCorrectAnswers: number;
    percentile: number;
  };
}

interface LeaderboardData {
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
  scoreBuckets: Record<string, number>;
  subjectStats: Record<string, { total: number; correct: number }>;
}

export default function Leaderboard({ data }: { data: LeaderboardData }) {
  if (!data) return <p className="text-center mt-10">No data found</p>;

  const bucketChartData = Object.entries(data.scoreBuckets).map(
    ([range, count]) => ({
      range,
      count,
    })
  );

  const subjectChartData = Object.entries(data.subjectStats).map(
    ([subject, { total, correct }]) => ({
      subject,
      accuracy: Number(((correct / total) * 100).toFixed(2)),
    })
  );

  const bucketChartConfig = {
    range: {
      label: "Score Range",
    },
    count: {
      label: "Number of Users",
    },
  } satisfies ChartConfig;

  const subjectChartConfig = {
    subject: {
      label: "Subject",
    },
    accuracy: {
      label: "Accuracy",
    },
  } satisfies ChartConfig;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center  font-semibold">
              Leaderboard / Statistics
            </CardTitle>
            <ThemeToggle />
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            View the leaderboard and statistics of all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link className="mt-5 text-blue-400 underline" href="/">
            Go home 🏠
          </Link>
        </CardContent>
      </Card>
      <div className="grid mt-6  gap-6   lg:grid-cols-6">
        {/* Total Users Card */}
        {/* <ThemeToggle /> */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Total Users
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Total number of users who used the app to check their scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2 className="text-5xl font-black">{data.totalUsers}</h2>
          </CardContent>
        </Card>

        {/* Top Scorer Card */}
        <Link
          className="col-span-1 lg:col-span-2"
          href={`/preview/${data.topScorer.rollNumber}`}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Top Scorer
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Highest score in the leaderboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-muted-foreground">
                {data.topScorer.name} ({data.topScorer.rollNumber})
              </p>
              <p className="text-2xl text-green-500 font-black">
                {data.topScorer.percentage}% -{" "}
                {data.topScorer.totalCorrectAnswers} correct
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Average Stats Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Average Stats
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Average score and accuracy of all users
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Percentage: {data.average.percentage}%</p>
            <p>Correct Answers: {data.average.totalCorrectAnswers}</p>
            <p>Accuracy: {data.average.accuracy}%</p>
          </CardContent>
        </Card>

        {/* Score Buckets Chart */}
        <Card className="col-span-1  lg:col-span-3">
          <CardHeader>
            <CardTitle>Score Buckets</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={bucketChartConfig}>
              <BarChart data={bucketChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="range"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Subject-wise Accuracy Chart */}
        <Card className="col-span-1  lg:col-span-3">
          <CardHeader>
            <CardTitle>Subject-wise Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={subjectChartConfig}>
              <BarChart data={subjectChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="subject"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="accuracy"
                  fill="var(--color-primary)"
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className=" mt-5 col-span-full">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="  text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left py-2">Rank</TableHead>
                <TableHead className="text-left py-2">Name</TableHead>
                <TableHead className="text-left py-2">Roll No</TableHead>
                <TableHead className="text-left py-2">% Score</TableHead>
                <TableHead className="text-left py-2">Correct</TableHead>
                <TableHead className="text-left py-2">Percentile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.leaderBoard.map((user, index) => (
                <TableRow key={user.id} className="border-b hover:bg-muted">
                  <TableCell className="py-2">{index + 1}</TableCell>
                  <TableCell className="py-2">
                    <Link href={`/preview/${user.rollNumber}`}>
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell className="py-2">{user.rollNumber}</TableCell>
                  <TableCell className="py-2">
                    {user.scores.percentage}%
                  </TableCell>
                  <TableCell className="py-2">
                    {user.scores.totalCorrectAnswers}
                  </TableCell>
                  <TableCell className="py-2">
                    {user.scores.percentile}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
