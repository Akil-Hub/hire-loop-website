import { getJobById } from "@/lib/api/jobs";
import { MapPin, Briefcase, DollarSign, Clock, Building2, Globe, CalendarDays, CheckCircle2, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  const formatSalary = (min, max, currency) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} – ${formatter.format(max)}/yr`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const listItems = (str) =>
    str
      ?.split(".")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-[#0f0f1a] pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left / Main ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-violet-400 text-xs font-medium bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
                      {job.category}
                    </span>
                    {job.isRemote && (
                      <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                        Remote
                      </span>
                    )}
                    <span className="text-white/40 text-xs font-medium bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                      {job.jobType}
                    </span>
                  </div>
                  <h1 className="text-white text-2xl font-bold leading-snug">
                    {job.title}
                  </h1>
                  <p className="text-white/50 text-sm mt-1">{job.companyName}</p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <DollarSign size={14} className="text-violet-400" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <CalendarDays size={14} className="text-violet-400" />
                  Apply by {formatDate(job.deadline)}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <Clock size={14} className="text-violet-400" />
                  Posted {formatDate(job.createdAt)}
                </span>
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Briefcase size={16} className="text-violet-400" />
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {listItems(job.responsibilities).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                      <CheckCircle2 size={15} className="text-violet-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Star size={16} className="text-violet-400" />
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {listItems(job.requirements).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                      <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-violet-400" />
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {listItems(job.benefits).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                      <CheckCircle2 size={15} className="text-sky-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Right / Sidebar ── */}
          <div className="space-y-5">

            {/* Apply card */}
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 sticky top-28">
              <p className="text-white/40 text-xs mb-1">Deadline</p>
              <p className="text-white font-semibold mb-5">{formatDate(job.deadline)}</p>

              <Link
                href={`/jobs/${id}/apply`}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
              >
                Apply for This Job
              </Link>

              <p className="text-white/30 text-xs text-center mt-3">
                Takes less than 5 minutes
              </p>

              <div className="border-t border-white/5 mt-5 pt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Building2 size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">Company</p>
                    <p className="text-white/70 text-sm">{job.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Briefcase size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">Job Type</p>
                    <p className="text-white/70 text-sm">{job.jobType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <DollarSign size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">Salary</p>
                    <p className="text-white/70 text-sm">
                      {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">Work Mode</p>
                    <p className="text-white/70 text-sm">
                      {job.isRemote ? "Remote" : "On-site"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;