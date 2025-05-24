import Leaderboard from "@/components/leaderboard";
export const dynamic = "force-dynamic";

// This page is used to display the leaderboard and stats no cache

const LeaderBoardAndStatsPage = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/leaderboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  const data = await res.json();
  if (res.status === 404) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">No data found</h1>
        <p className="text-gray-500">Please check the roll number.</p>
      </div>
    );
  }
  if (res.status === 500) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">No data found</h1>
        <p className="text-gray-500">Please check the roll number.</p>
      </div>
    );
  }
  return <Leaderboard data={data.data} />;
};

export default LeaderBoardAndStatsPage;
