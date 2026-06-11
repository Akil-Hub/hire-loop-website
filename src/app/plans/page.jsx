import PricingSection from "@/app/plans/PricingSection";
import PricingFaq from "@/Components/common/PricingFaq";

export default function PricingPage() {
    return (
        <main className="bg-zinc-950 min-h-screen text-white">
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4">
                            Simple Pricing
                        </h1>

                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Whether you're looking for your next opportunity or
                            hiring top talent, choose a plan that fits your
                            goals.
                        </p>
                    </div>

                    <PricingSection />
                </div>
            </section>

            <PricingFaq />
        </main>
    );
}