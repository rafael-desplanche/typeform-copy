import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PublicForm from '@/components/public-form';

export default async function PublicFormPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;

  const form = await prisma.form.findUnique({
    where: { publicId },
    include: {
      steps: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!form) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">{form.title}</h1>
      <PublicForm formId={form.id} steps={form.steps} />
    </main>
  );
}
