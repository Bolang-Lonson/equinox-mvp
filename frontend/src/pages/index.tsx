export default function OverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Open dockets</p>
          <p className="mt-2 text-3xl font-bold">24</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-600">Upcoming renewals (90d)</p>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}


