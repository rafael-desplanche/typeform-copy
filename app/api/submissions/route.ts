import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^\+?[0-9\s().-]{6,20}$/.test(value);
}

export async function POST(req: NextRequest) {
  const { formId, answers } = await req.json();

  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: { steps: true },
  });

  if (!form) return NextResponse.json({ error: 'form not found' }, { status: 404 });

  const questionSteps = form.steps.filter((s) => s.type === 'QUESTION');

  for (const step of questionSteps) {
    const answer = answers.find((a: { stepId: string; value: string }) => a.stepId === step.id);
    const value = answer?.value?.trim() || '';

    if (step.required && !value) {
      return NextResponse.json({ error: `step required: ${step.id}` }, { status: 400 });
    }

    if (value && step.fieldType === 'EMAIL' && !isValidEmail(value)) {
      return NextResponse.json({ error: `invalid email: ${step.id}` }, { status: 400 });
    }

    if (value && step.fieldType === 'PHONE' && !isValidPhone(value)) {
      return NextResponse.json({ error: `invalid phone: ${step.id}` }, { status: 400 });
    }
  }

  const submission = await prisma.submission.create({
    data: {
      formId,
      answers: {
        create: questionSteps.map((step) => {
          const answer = answers.find((a: { stepId: string; value: string }) => a.stepId === step.id);
          return {
            stepId: step.id,
            value: answer?.value ?? '',
          };
        }),
      },
    },
    include: { answers: true },
  });

  return NextResponse.json(submission, { status: 201 });
}
