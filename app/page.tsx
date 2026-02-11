import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Mini Typeform Copy</h1>
      <p>Accès interne et liens publics de formulaire.</p>
      <div className="flex gap-3">
        <Link href="/dashboard/forms" className="bg-slate-900 text-white rounded-md px-4 py-2">
          Dashboard
        </Link>
        <Link href="/dashboard/login" className="bg-white border rounded-md px-4 py-2">
          Login
        </Link>
      </div>
    </main>
  );
}
