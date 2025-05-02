import Leaderboard from "@/components/leaderboard";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const LeaderBoardAndStatsPage = async () => {
  const res = await fetch("http://localhost:3000/api/leaderboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
