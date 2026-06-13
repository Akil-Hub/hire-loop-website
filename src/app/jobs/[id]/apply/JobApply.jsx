"use client";

import { useState } from "react";
import {
    Form,
    TextField,
    Input,
    TextArea,
    Label,
    Description,
    FieldError,
    Button,
    toast,
} from "@heroui/react";
import { Link2, User, Phone, Mail, Send, Briefcase, Building2 } from "lucide-react";
import { submitApplication } from "@/lib/actions/applications";
import { useRouter } from "next/navigation";

const fieldCls =
    "bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 focus:outline-none rounded-xl text-sm text-white placeholder:text-white/30 transition-colors w-full";

const inputCls = `${fieldCls} h-11 pl-9 pr-4`;
const labelCls = "text-white/60 text-xs font-medium mb-1.5 block";
const descCls = "text-white/30 text-xs mt-1";
const errorCls = "text-red-400 text-xs mt-1";

const Icon = ({ icon: Ico }) => (
    <Ico size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10" />
);

const JobApply = ({ job, applicant }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const raw = Object.fromEntries(new FormData(e.currentTarget));


        setLoading(true);
        setErrors({});


        try {
            const payload = {
                ...raw,
                jobId: job._id,
                jobTitle: job.title,
                companyId: job.companyId,
                companyName: job.companyName,
                applicantId: applicant.id,
                applicantName: applicant.name,
                applicantEmail: applicant.email,
            };
            const res = await submitApplication(payload)

            if (res.insertedId) {
                toast.success('Application Submitted Successfully.')
                setSubmitted(true);
                router.refresh()

            }
        } catch (err) {
            setErrors({ root: err.message || "Something went wrong. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Send size={22} className="text-emerald-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Application Submitted</h3>
                <p className="text-white/40 text-sm max-w-xs">
                    Your application for <span className="text-white/70">{job?.title}</span> at{" "}
                    <span className="text-white/70">{job?.companyName}</span> has been sent.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <img src={job?.companyLogo} alt={job?.companyName} className="w-7 h-7 object-contain" />
                </div>
                <div>
                    <h2 className="text-white text-lg font-semibold">{job?.title}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Building2 size={12} className="text-white/30" />
                        <span className="text-white/40 text-sm">{job?.companyName}</span>
                        <span className="text-white/20">·</span>
                        <Briefcase size={12} className="text-white/30" />
                        <span className="text-white/40 text-sm">{job?.jobType}</span>
                    </div>
                </div>
            </div>

            <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-5">

                {/* Resume Link */}
                <TextField name="resumeUrl" isRequired className="w-full">
                    <Label className={labelCls}>
                        Resume / CV Link <span className="text-violet-400">*</span>
                    </Label>
                    <div className="relative">
                        <Icon icon={Link2} />
                        <Input type="url" placeholder="https://drive.google.com/your-resume" className={inputCls} />
                    </div>
                    <Description className={descCls}>Paste a public link — Google Drive, Dropbox, or personal website</Description>
                    <FieldError className={errorCls} />
                </TextField>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 border-t border-white/5" />
                    <span className="text-white/20 text-xs">Optional Information</span>
                    <div className="flex-1 border-t border-white/5" />
                </div>

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField name="fullName" className="w-full">
                        <Label className={labelCls}>Full Name</Label>
                        <div className="relative">
                            <Icon icon={User} />
                            <Input placeholder="John Doe" className={inputCls} />
                        </div>
                    </TextField>

                    <TextField name="phone" className="w-full">
                        <Label className={labelCls}>Phone Number</Label>
                        <div className="relative">
                            <Icon icon={Phone} />
                            <Input type="tel" placeholder="+1 234 567 8900" className={inputCls} />
                        </div>
                    </TextField>
                </div>

                {/* Email — prefilled, read only */}
                <TextField name="email" value={applicant?.email || ""} className="w-full">
                    <Label className={labelCls}>Email Address</Label>
                    <div className="relative">
                        <Icon icon={Mail} />
                        <Input
                            type="email"
                            placeholder="john@example.com"
                            className={`${inputCls} ${applicant?.email ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    </div>
                    <Description className={descCls}>
                        {applicant?.email ? "Email is taken from your account" : "We'll use this to send you updates"}
                    </Description>
                </TextField>

                {/* Portfolio */}
                <TextField name="portfolio" className="w-full">
                    <Label className={labelCls}>Portfolio / LinkedIn</Label>
                    <div className="relative">
                        <Icon icon={Link2} />
                        <Input type="url" placeholder="https://linkedin.com/in/yourname" className={inputCls} />
                    </div>
                </TextField>

                {/* Cover Note */}
                <TextField name="coverNote" className="w-full">
                    <Label className={labelCls}>Cover Note</Label>
                    <TextArea
                        rows={4}
                        placeholder="Tell the recruiter why you're a great fit for this role..."
                        className={`${fieldCls} px-4 py-3 resize-none`}
                    />
                    <Description className={descCls}>Keep it concise — 2 to 3 sentences is perfect</Description>
                </TextField>

                {/* Root error */}
                {errors.root && (
                    <p className="text-red-400 text-sm text-center">{errors.root}</p>
                )}

                {/* Submit */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        isDisabled={loading}
                        className="w-full h-11 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={15} />
                                Submit Application
                            </>
                        )}
                    </Button>
                    <p className="text-white/25 text-xs text-center mt-3">
                        Only your resume link is required to apply
                    </p>
                </div>

            </Form>
        </div>
    );
};

export default JobApply;