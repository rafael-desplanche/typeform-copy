'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError('Mot de passe invalide');
      return;
    }

    router.push(search.get('next') || '/dashboard/forms');
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-xl font-semibold mb-4">Connexion interne</h1>
      <form onSubmit={onSubmit} className="space-y-3 bg-white border rounded-lg p-4">
        <label className="block space-y-1">
          <span>Mot de passe interne</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="bg-slate-900 text-white">
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </main>
  );
}
