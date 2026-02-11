import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function FormsPage() {
  const forms = await prisma.form.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Formulaires</h1>
        <form action="/api/auth/logout" method="post">
          <button className="bg-white border">Se déconnecter</button>
        </form>
      </div>

      <div className="bg-white border rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Titre</th>
              <th className="p-3">Lien public</th>
              <th className="p-3">Réponses</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-b last:border-b-0">
                <td className="p-3">{form.title}</td>
                <td className="p-3">
                  <Link href={`/f/${form.publicId}`} className="text-blue-600 underline">
                    /f/{form.publicId}
                  </Link>
                </td>
                <td className="p-3">
                  <Link href={`/dashboard/forms/${form.id}/responses`} className="text-blue-600 underline">
                    Voir les soumissions
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
