import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ResponsesPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;

  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: {
      steps: { orderBy: { order: 'asc' } },
      submissions: {
        orderBy: { createdAt: 'desc' },
        include: {
          answers: true,
        },
      },
    },
  });

  if (!form) return notFound();

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Réponses - {form.title}</h1>

      {form.submissions.length === 0 ? (
        <p>Aucune soumission pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {form.submissions.map((submission, index) => (
            <section key={submission.id} className="bg-white border rounded-lg p-4 space-y-2">
              <h2 className="font-medium">Soumission #{form.submissions.length - index}</h2>
              <p className="text-sm text-slate-500">{submission.createdAt.toLocaleString('fr-FR')}</p>
              <ul className="space-y-2">
                {form.steps
                  .filter((step) => step.type === 'QUESTION')
                  .map((step) => {
                    const answer = submission.answers.find((a) => a.stepId === step.id);
                    return (
                      <li key={step.id} className="border rounded p-2">
                        <p className="text-sm font-medium">{step.label}</p>
                        <p className="text-sm">{answer?.value || '—'}</p>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
