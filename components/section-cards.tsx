"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Copy, Tag, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

type LibraryStats = {
  totalBooks: number;
  availableCopies: number;
  topGenre: string;
  recentAdditions: number;
};

export function SectionCards() {
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get<LibraryStats>('/api/library/stats');
        setStats(data);
      } catch (err) {
        setError(axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '...' : error ? 'Error' : stats?.totalBooks}
          </div>
          <p className="text-xs text-muted-foreground">All books in collection</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Copies</CardTitle>
          <Copy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '...' : error ? 'Error' : stats?.availableCopies}
          </div>
          <p className="text-xs text-muted-foreground">Ready to borrow</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Genre</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '...' : error ? 'Error' : stats?.topGenre}
          </div>
          <p className="text-xs text-muted-foreground">Most popular category</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? '...' : error ? 'Error' : stats?.recentAdditions}
          </div>
          <p className="text-xs text-muted-foreground">New this month</p>
        </CardContent>
      </Card>
    </div>
  );
}
