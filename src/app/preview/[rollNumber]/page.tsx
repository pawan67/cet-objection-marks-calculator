import { SummaryPreview } from "@/components/Preview";
import Link from "next/link";
import { FC } from "react";
type Params = Promise<{ rollNumber: string }>;

const SummaryPreviewPage = async ({ params }: { params: Params }) => {
  const { rollNumber } = await params;

  const res = await fetch(`http://localhost:3000/api/summary/${rollNumber}`, {
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
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go Back
        </Link>
      </div>
    );
  }
  return <SummaryPreview data={data.data} />;
};

export default SummaryPreviewPage;
