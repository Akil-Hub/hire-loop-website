export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}