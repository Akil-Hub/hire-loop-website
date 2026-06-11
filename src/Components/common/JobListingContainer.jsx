"use client";

import { useState, useMemo } from "react";
import JobCard from "@/Components/common/JobCard";
import JobFilters from "@/Components/common/JobFilters";

const JobListingContainer = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName.toLowerCase().includes(search.toLowerCase());

      const matchType = !filters.jobType || job.jobType === filters.jobType;
      const matchCategory = !filters.category || job.category === filters.category;
      const matchCurrency = !filters.currency || job.currency === filters.currency;
      const matchRemote =
        !filters.remote ||
        (filters.remote === "Remote" && job.isRemote) ||
        (filters.remote === "On-site" && !job.isRemote);

      return matchSearch && matchType && matchCategory && matchCurrency && matchRemote;
    });
  }, [jobs, search, filters]);

  return (
    <>
      <div className="mb-8">
        <JobFilters onSearch={setSearch} onFilter={setFilters} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
        {filtered.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-white/30">
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </>
  );
};

export default JobListingContainer;