import Link from "next/link"

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
            <div className="max-w-lg text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
                <p className="text-6xl font-black text-zinc-700 mb-4">401</p>
                <h2 className="text-2xl font-bold text-white mb-3">
                    Unauthorized
                </h2>
                <p className="text-zinc-400 mb-8">
                    You don't have permission to access this page. Please sign
                    in with the correct account to continue.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        href="/auth/signIn"
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium text-white"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition font-medium text-white"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage

