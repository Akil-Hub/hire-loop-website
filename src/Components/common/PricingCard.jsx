import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingCard({ plan }) {
    return (
        <div
            className={`rounded-3xl border p-8 transition hover:-translate-y-2 ${plan.featured
                    ? "border-violet-500 bg-zinc-900"
                    : "border-zinc-800 bg-zinc-900/50"
                }`}
        >
            {plan.featured && (
                <div className="inline-block mb-5 px-3 py-1 rounded-full text-xs bg-green-500/20 text-violet-400">
                    Most Popular
                </div>
            )}

            <h3 className="text-2xl font-bold mb-2">
                {plan.name}
            </h3>

            <div className="mb-8">
                <span className="text-5xl font-bold">
                    {plan.price}
                </span>

                <span className="text-zinc-400">
                    {plan.period}
                </span>
            </div>

            <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                    <li
                        key={feature}
                        className="flex gap-3 items-start"
                    >
                        <Check
                            size={18}
                            className="text-violet-500 mt-1"
                        />
                        <span className="text-zinc-300">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                    <button type="submit" role="link" className={`w-full py-3 rounded-xl font-medium transition ${plan.featured
                            ? "bg-violet-600 hover:bg-violet-700"
                            : "bg-zinc-800 hover:bg-zinc-700"
                        }`}>
                        Checkout
                    </button>
                </section>
            </form>
          
        </div>
    );
}