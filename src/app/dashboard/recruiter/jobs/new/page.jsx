// app/dashboard/recruiter/jobs/new/page.jsx
"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Label,
  FieldError,
  TextField,
  Switch,
} from "@heroui/react";
import {
  Briefcase,
  MapPin,
  CreditCard,
  Calendar,
  ChartBar,
  PersonWorker,
  FileText,
  GeoPin,
  CircleDollar,
  Tag,
  Clock,
  Globe,
  ArrowRight,
} from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";

const JOB_CATEGORIES = [
  "Engineering", "Design", "Marketing", "Sales",
  "Finance", "HR", "Operations", "Customer Support",
  "Legal", "Product", "Data", "Other",
];

const JOB_TYPES = [
  "Full-time", "Part-time", "Remote", "Contract", "Internship",
];

const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "CAD", "AUD"];

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ icon, title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
        <span className="text-zinc-400">{icon}</span>
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ─── Field label ─────────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <label className="text-xs font-medium text-zinc-400 mb-1 block">
      {children}
    </label>
  );
}

// ─── Styled Input wrapper ─────────────────────────────────────────────────────
const inputClass =
  "bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-0 h-11 px-4 text-sm w-full outline-none transition-colors";

const selectClass =
  "bg-zinc-900 border border-zinc-700 rounded-xl text-white text-sm h-11 px-4 w-full outline-none appearance-none transition-colors focus:border-zinc-500 cursor-pointer";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PostJobPage() {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [jobType, setJobType] = useState("Full-time");
  const [category, setCategory] = useState("Engineering");
  const [currency, setCurrency] = useState("USD");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const payload = {
      ...formData,
      jobType,
      category,
      currency,
      isRemote,
      status: "active",
    };

    console.log(payload);

    // await your API call here
    toast.success("Job posted successfully!", {
      description: "Your job is now publicly visible.",
    });
    router.push("/dashboard/recruiter/jobs");
  };

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Fill in the details below. Your job will go live immediately after submission.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

          <Form onSubmit={onSubmit} className="flex flex-col gap-8 p-8">

            {/* ── SECTION 1: JOB INFO ── */}
            <Section icon={<Briefcase width={16} height={16} />} title="Job Info">

              {/* Job Title */}
              <div>
                <FieldLabel>Job Title</FieldLabel>
                <input
                  name="title"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputClass}
                />
              </div>

              {/* Category + Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Job Category</FieldLabel>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={selectClass}
                    >
                      {JOB_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <Tag
                      width={14} height={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>Job Type</FieldLabel>
                  <div className="relative">
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className={selectClass}
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <Briefcase
                      width={14} height={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div>
                <FieldLabel>Salary Range</FieldLabel>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    name="salaryMin"
                    type="number"
                    placeholder="Min"
                    className={inputClass}
                  />
                  <input
                    name="salaryMax"
                    type="number"
                    placeholder="Max"
                    className={inputClass}
                  />
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className={selectClass}
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <CircleDollar
                      width={14} height={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location + Remote toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <FieldLabel>Location</FieldLabel>
                  <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                    <Globe width={13} height={13} className="text-zinc-500" />
                    Remote
                    <input
                      type="checkbox"
                      checked={isRemote}
                      onChange={(e) => setIsRemote(e.target.checked)}
                      className="accent-blue-500 w-4 h-4 rounded"
                    />
                  </label>
                </div>
                <div className="relative">
                  <GeoPin
                    width={15} height={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <input
                    name="location"
                    placeholder="City, Country"
                    disabled={isRemote}
                    className={`${inputClass} pl-9 disabled:opacity-40 disabled:cursor-not-allowed`}
                  />
                </div>
              </div>

              {/* Deadline */}
              <div>
                <FieldLabel>Application Deadline</FieldLabel>
                <div className="relative">
                  <Calendar
                    width={15} height={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                  />
                  <input
                    name="deadline"
                    type="date"
                    required
                    className={`${inputClass} pl-9 [color-scheme:dark]`}
                  />
                </div>
              </div>

            </Section>

            {/* ── SECTION 2: JOB DESCRIPTION ── */}
            <Section icon={<FileText width={16} height={16} />} title="Job Description">

              {/* Responsibilities */}
              <div>
                <FieldLabel>Responsibilities</FieldLabel>
                <textarea
                  name="responsibilities"
                  required
                  rows={4}
                  placeholder="List the key responsibilities for this role..."
                  className={`${inputClass} h-auto py-3 resize-none`}
                />
              </div>

              {/* Requirements */}
              <div>
                <FieldLabel>Requirements</FieldLabel>
                <textarea
                  name="requirements"
                  required
                  rows={4}
                  placeholder="List required skills, experience, and qualifications..."
                  className={`${inputClass} h-auto py-3 resize-none`}
                />
              </div>

              {/* Benefits */}
              <div>
                <FieldLabel>Benefits <span className="text-zinc-600">(optional)</span></FieldLabel>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="e.g. Health insurance, flexible hours, stock options..."
                  className={`${inputClass} h-auto py-3 resize-none`}
                />
              </div>

            </Section>

            {/* ── SECTION 3: COMPANY (auto-filled) ── */}
            <Section icon={<PersonWorker width={16} height={16} />} title="Company">
              <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Briefcase width={16} height={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Auto-filled from your profile</p>
                  <p className="text-xs text-zinc-500">
                    Your registered company will be linked to this job post.
                  </p>
                </div>
                <span className="ml-auto text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                  Approved
                </span>
              </div>
            </Section>

            {/* ── ACTIONS ── */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <Button
                type="submit"
                className="h-11 px-6 bg-white text-black font-semibold rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-colors"
              >
                Post Job
                <ArrowRight width={15} height={15} />
              </Button>
            </div>

          </Form>
        </div>

      </div>
    </div>
  );
}