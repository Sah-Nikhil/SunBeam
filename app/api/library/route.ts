import { prisma } from '@/lib/prisma';
import { LibrarySchema } from '@/lib/schemas/library';
import { NextResponse } from 'next/server';
import { fixBigInts } from '@/lib/utils/fixBigInts';

// Create - POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = LibrarySchema.parse(body);

    const newEntry = await prisma.library.create({
      data: validatedData
    });

    return NextResponse.json(fixBigInts(newEntry), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create library entry" },
      { status: 400 }
    );
  }
}

// Read All - GET
export async function GET() {
  try {
    const entries = await prisma.library.findMany();
    return NextResponse.json(fixBigInts(entries));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch library entries" },
      { status: 500 }
    );
  }
}
