import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fixBigInts } from '@/lib/utils/fixBigInts';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = Number(params.id);
    const entry = await prisma.library.findUnique({
      where: { Book_ID: bookId }
    });
    return NextResponse.json(fixBigInts(entry));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch book';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = Number(params.id);
    const body = await request.json();
    const updatedEntry = await prisma.library.update({
      where: { Book_ID: bookId },
      data: body
    });
    return NextResponse.json(fixBigInts(updatedEntry));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update book';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.library.delete({
      where: { Book_ID: Number(params.id) }
    });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete book';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
