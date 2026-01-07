export default function EarlyAccessPage({
    searchParams,
  }: {
    searchParams?: { email?: string };
  }) {
    const email = searchParams?.email?.trim();
  
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-20 text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-tight">You’re on the list ✅</h1>
            <p className="mt-3 text-slate-600">
              {email ? (
                <>
                  We’ll contact <span className="font-semibold text-slate-900">{email}</span> when
                  early access opens.
                </>
              ) : (
                <>We’ll email you when early access opens.</>
              )}
            </p>
  
            <a
              href="/"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Back to home
            </a>
  
            <p className="mt-4 text-xs text-slate-500">
              If you entered the wrong email, go back and submit again.
            </p>
          </div>
        </div>
      </main>
    );
  }
  