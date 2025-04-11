// sends the library stats to the dashboard page
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fixBigInts } from '@/lib/utils/fixBigInts';

export async function GET() {
  try {
    // Get total books count
    const totalBooks = await prisma.library.count();

    // Get available copies count
    const availableCopiesResult = await prisma.library.aggregate({
      _sum: {
        Available_Copies: true
      }
    });
    const availableCopies = availableCopiesResult._sum.Available_Copies || 0;

    // Get most popular genre
    const topGenre = await prisma.library.groupBy({
      by: ['Genre'],
      _count: { Genre: true },
      orderBy: { _count: { Genre: 'desc' } },
      take: 1
    }).then((res: {Genre: string | null}[]) => res[0]?.Genre || 'N/A');

    // Get recent additions (last 30 days)
    const recentAdditions = await prisma.library.count({
      where: {
        Book_ID: {
          gt: Number((await prisma.library.aggregate({
            _max: { Book_ID: true }
          }))._max.Book_ID!) - 5
        }
      }
    });

    const response = {
      totalBooks,
      availableCopies,
      topGenre,
      recentAdditions
    };

    return NextResponse.json(fixBigInts(response));

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch library stats';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
