import { MapPin, Briefcase, DollarSign, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const JobCard = ({ job }) => {
    const {
        _id,
        title,
        companyName,
        companyLogo,
        jobType,
        isRemote,
        category,
        currency,
        salaryMin,
        salaryMax,
        deadline,
    } = job;

    const formatSalary = (min, max, curr) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: curr || "USD",
            maximumFractionDigits: 0,
        });
        return `${formatter.format(min)} – ${formatter.format(max)}/yr`;
    };

    const formatDeadline = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="group relative bg-[#1a1a2e] border mx-w-sm border-white/10 rounded-2xl p-6  hover:border-violet-500/50 hover:shadow-[0_0_32px_rgba(139,92,246,0.12)] transition-all duration-300 cursor-pointer h-70">
            {/* Top: Company + Status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                        <img
                            src={companyLogo}
                            alt={companyName}
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-white/50 text-xs">{companyName}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5">
                            {category}
                        </span>
                    </div>
                </div>
                {isRemote && (
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-1">
                        Remote
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="text-white text-lg font-semibold leading-snug mb-4 group-hover:text-violet-300 transition-colors">
                {title}
            </h3>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-5">
                <span className="flex items-center gap-1.5 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-1.5">
                    <Briefcase size={12} />
                    {jobType}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-1.5">
                    <DollarSign size={12} />
                    {formatSalary(salaryMin, salaryMax, currency)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-1.5">
                    <Clock size={12} />
                    Apply by {formatDeadline(deadline)}
                </span>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 mb-4" />

            {/* Apply button */}
            <Link href={`/jobs/${_id}`}
                className="flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors group/btn">

                Apply Now
                <ArrowRight
                    size={15}
                    className="group-hover/btn:translate-x-1 transition-transform"
                />
            </Link>


        </div>
    );
};

export default JobCard;