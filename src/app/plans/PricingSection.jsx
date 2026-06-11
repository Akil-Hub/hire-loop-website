"use client";

import PricingCard from "@/Components/common/PricingCard";
import { useState } from "react";

const seekerPlans = [
    {
        name: "Free",
        id:'seeker_free',
        price: "$0",
        period: "/forever",
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
    },
    {
        name: "Pro",
        id:'seeker_pro',

        price: "$19",
        period: "/month",
        featured: true,
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
    },
    {
        name: "Premium",
        id:'seeker_premium',

        price: "$39",
        period: "/month",
        features: [
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
    },
];

const recruiterPlans = [
    {
        name: "Free",
        id:'recruiter_free',

        price: "$0",
        period: "/forever",
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
            "Perfect for first-year hiring",
        ],
    },
    {
        name: "Growth",
        id:'recruiter_growth',

        price: "$49",
        period: "/month",
        featured: true,
        features: [
            "Up to 10 active job posts",
            "Applicant tracking",
            "Basic analytics",
            "Email support",
        ],
    },
    {
        name: "Enterprise",
        id:'recruiter_enterprise',

        price: "$149",
        period: "/month",
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured job listings",
            "Team collaboration",
            "Custom branding",
            "Priority support",
        ],
    },
];

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState("seeker");

    const plans =
        activeTab === "seeker"
            ? seekerPlans
            : recruiterPlans;

    return (
        <>
            <div className="flex justify-center mb-14">
                <div className="bg-zinc-900 p-1 rounded-xl flex border border-zinc-800">
                    <button
                        onClick={() => setActiveTab("seeker")}
                        className={`px-6 py-3 rounded-lg transition ${
                            activeTab === "seeker"
                                ? "bg-violet-600 text-white"
                                : "text-zinc-400"
                        }`}
                    >
                        For Job Seekers
                    </button>

                    <button
                        onClick={() => setActiveTab("recruiter")}
                        className={`px-6 py-3 rounded-lg transition ${
                            activeTab === "recruiter"
                                ? "bg-violet-600 text-white"
                                : "text-zinc-400"
                        }`}
                    >
                        For Recruiters
                    </button>
                </div>
            </div>


<div className="text-center mb-16">
   <span className="text-violet-500">
      Trusted by thousands of job seekers and recruiters
   </span>
</div>
            <div className="grid lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PricingCard
                        key={plan.name}
                        plan={plan}
                    />
                ))}
            </div>
        </>
    );
}