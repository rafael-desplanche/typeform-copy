import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function makePublicId() {
  return Math.random().toString(36).slice(2, 10);
}

export async function GET() {
  const forms = await prisma.form.findMany({
    orderBy: { createdAt: 'desc' },
    include: { steps: { orderBy: { order: 'asc' } } },
  });
  return NextResponse.json(forms);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 });

  const form = await prisma.form.create({
    data: { title, publicId: makePublicId() },
  });

  return NextResponse.json(form, { status: 201 });
}
