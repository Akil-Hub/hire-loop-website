'use client'
import StatsCard from '@/Components/dashboard/StatsCard';
import { useSession } from '@/lib/auth-client'
import { FileText, PersonWorker, Briefcase, CircleCheck } from "@gravity-ui/icons";

const stats = [
  { icon: <FileText width={18} height={18} />,     label: "Total Job Posts",   value: "48",    trend: "+3 this week",     trendDir: "up"   },
  { icon: <PersonWorker width={18} height={18} />, label: "Total Applicants",  value: "1,284", trend: "+91 today",         trendDir: "up"   },
  { icon: <Briefcase width={18} height={18} />,    label: "Active Jobs",       value: "18",    trend: "-2 from last week", trendDir: "down" },
  { icon: <CircleCheck width={18} height={18} />,  label: "Jobs Closed",       value: "32",    trend: null,               trendDir: null   },
];
const SeekerDashboardHomePage = () => {
    const {data:session, isPending} = useSession()
    if(isPending){
        return <p>Loading...</p>
    }
    const user = session?.user;

  return (
    <div><h1>Job Seekr Dash board</h1>

        

        <div className="p-8 bg-black min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">
Welcome back, {user?.name}
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default SeekerDashboardHomePage