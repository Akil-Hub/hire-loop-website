import JobApply from "@/app/jobs/[id]/apply/JobApply"
import { getApplicationByApplicant } from "@/lib/api/applications"
import { getUserSession } from "@/lib/api/core/session"
import { getJobById } from "@/lib/api/jobs"
import { getPlanById } from "@/lib/api/plans"
import Link from "next/link"
import { redirect } from "next/navigation"

const ApplyPage = async ({ params }) => {
    const { id } = await params

    const user = await getUserSession()

    if (!user) {
        redirect(`/auth/signIn?redirect=/jobs/${id}/apply`)
    }

    if (user?.role !== "seeker") {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                <div className="max-w-lg text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Access Restricted
                    </h2>
                    <p className="text-zinc-400">
                        Only job seekers can apply for positions. Please sign in
                        with a seeker account to continue.
                    </p>
                </div>
            </div>
        )
    }

    const alreadyAppliedApplications = await getApplicationByApplicant(user?.id,{cache:'no-store'})
    const job = await getJobById(id)

    const plan = await getPlanById(user?.plan || "seeker_free")

    if (!job) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                <div className="max-w-lg text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Job Not Found
                    </h2>
                    <p className="text-zinc-400">
                        This job may have been removed or is no longer available.
                    </p>
                </div>
            </div>
        )
    }

    const appliedCount = alreadyAppliedApplications.length
    const percentage =
        (appliedCount / plan.maxApplicationPerMonth) * 100

    const limitReached =
        appliedCount >= plan.maxApplicationPerMonth

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Usage Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-zinc-400 text-sm uppercase tracking-wide">
                                Current Plan
                            </p>
                            <h2 className="text-3xl font-bold mt-2">
                                {plan.name} Plan
                            </h2>
                        </div>

                        <div className="text-right">
                            <p className="text-zinc-400">
                                Applications Used
                            </p>
                            <p className="text-4xl font-bold">
                                {appliedCount}
                                <span className="text-zinc-500 text-2xl">
                                    /{plan.maxApplicationPerMonth}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-red-500 transition-all"
                                style={{
                                    width: `${Math.min(percentage, 100)}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Limit Reached */}
                {limitReached && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center mb-10">
                        <h3 className="text-2xl font-semibold text-red-400 mb-3">
                            Application Limit Reached
                        </h3>

                        <p className="text-zinc-300 mb-6">
                            You've used all{" "}
                            {plan.maxApplicationsPerMonth} applications
                            available in your current plan.
                        </p>

                        <Link
                            href="/plans"
                            className="inline-flex items-center px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium"
                        >
                            Upgrade Your Plan
                        </Link>
                    </div>
                )}

                {/* Application Form */}
                {!limitReached && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <JobApply job={job} applicant={user} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ApplyPage