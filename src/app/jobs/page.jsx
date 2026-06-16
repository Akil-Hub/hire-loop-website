import JobListingContainer from "@/Components/common/JobListingContainer";
import { getJobs } from "@/lib/api/jobs";

const JobsPage = async () => {
  const jobs = await getJobs();

  return (
    <section className="min-h-screen bg-[#0f0f1a] px-4 py-12 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Latest Jobs</h1>
          <p className="text-white/40 text-sm">{jobs.length} positions available</p>
        </div>

        <JobListingContainer jobs={jobs} />
      </div>
    </section>
  );
};

export default JobsPage;