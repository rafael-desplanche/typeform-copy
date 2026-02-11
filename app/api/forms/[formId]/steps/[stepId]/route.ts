import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ formId: string; stepId: string }> }) {
  const { stepId } = await params;
  const body = await req.json();

  const step = await prisma.step.update({
    where: { id: stepId },
    data: {
      order: body.order,
      type: body.type,
      fieldType: body.fieldType,
      label: body.label,
      required: body.required,
      endMessage: body.endMessage,
      ctaLabel: body.ctaLabel,
      ctaUrl: body.ctaUrl,
    },
  });

  return NextResponse.json(step);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ formId: string; stepId: string }> }) {
  const { stepId } = await params;
  await prisma.step.delete({ where: { id: stepId } });
  return NextResponse.json({ ok: true });
}
