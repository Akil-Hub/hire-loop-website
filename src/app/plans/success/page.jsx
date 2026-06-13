import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error(
            'Please provide a valid session_id (`cs_test_...`)'
        )
    }

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ['line_items', 'payment_intent'],
        }
    )

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        const subInfo = {
            email:customerEmail,
            planId:metadata.planId
        }

        // update the user tabel
    const result = await createSubscription(subInfo)
    console.log(result)


        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
                <div className="max-w-2xl w-full">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center shadow-xl">
                        
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-full bg-green-500/10">
                                <CheckCircle
                                    size={72}
                                    className="text-green-500"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-white mb-4">
                            Payment Successful 🎉
                        </h1>

                        <p className="text-zinc-400 text-lg mb-8">
                            Thank you for upgrading your plan.
                            Your subscription is now active and
                            ready to use.
                        </p>

                        <div className="bg-zinc-800/50 rounded-2xl p-5 mb-8">
                            <p className="text-zinc-400 text-sm mb-2">
                                Confirmation Email Sent To
                            </p>

                            <p className="text-white font-medium break-all">
                                {customerEmail}
                            </p>
                        </div>

                        <div className="space-y-4 text-left bg-zinc-800/30 rounded-2xl p-6 mb-8">
                            <h3 className="text-white font-semibold">
                                What's Next?
                            </h3>

                            <ul className="space-y-3 text-zinc-400">
                                <li>
                                    ✓ Your subscription has been activated
                                </li>

                                <li>
                                    ✓ Premium features are now available
                                </li>

                                <li>
                                    ✓ A receipt has been sent to your email
                                </li>

                                <li>
                                    ✓ You can manage your subscription anytime
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition"
                            >
                                Go to Dashboard
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/jobs"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-white transition"
                            >
                                Browse Jobs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}