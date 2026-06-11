"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes. You can cancel your subscription at any time and keep access until the end of your billing period.",
    },
    {
        question: "Do you offer refunds?",
        answer:
            "Refund requests are reviewed on a case-by-case basis. Contact support within 14 days of purchase.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept Visa, Mastercard, American Express, PayPal, and most major payment providers.",
    },
    {
        question: "Can I switch plans later?",
        answer:
            "Absolutely. Upgrade or downgrade your plan whenever your needs change.",
    },
];

export default function PricingFaq() {
    const [open, setOpen] = useState(null);

    return (
        <section className="py-24 border-t border-zinc-800">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.question}
                            className="border border-zinc-800 rounded-2xl bg-zinc-900"
                        >
                            <button
                                className="w-full flex justify-between items-center p-5"
                                onClick={() =>
                                    setOpen(
                                        open === index
                                            ? null
                                            : index
                                    )
                                }
                            >
                                <span className="font-medium">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    className={`transition ${
                                        open === index
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {open === index && (
                                <div className="px-5 pb-5 text-zinc-400">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}