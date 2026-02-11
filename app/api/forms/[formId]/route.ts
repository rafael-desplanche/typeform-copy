import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const form = await prisma.form.findUnique({
    where: { id: formId },
    include: { steps: { orderBy: { order: 'asc' } } },
  });

  if (!form) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(form);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const { title } = await req.json();
  const form = await prisma.form.update({
    where: { id: formId },
    data: { title },
  });
  return NextResponse.json(form);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  await prisma.form.delete({ where: { id: formId } });
  return NextResponse.json({ ok: true });
}
