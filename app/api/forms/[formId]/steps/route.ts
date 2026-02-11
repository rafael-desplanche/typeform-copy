import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const body = await req.json();
  const step = await prisma.step.create({
    data: {
      formId,
      order: body.order,
      type: body.type,
      fieldType: body.fieldType ?? null,
      label: body.label ?? null,
      required: body.required ?? false,
      endMessage: body.endMessage ?? null,
      ctaLabel: body.ctaLabel ?? null,
      ctaUrl: body.ctaUrl ?? null,
    },
  });

  return NextResponse.json(step, { status: 201 });
}
