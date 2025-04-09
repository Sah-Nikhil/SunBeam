import { createClient } from '@/utils/supabase/server';

export default async function Library() {
  const supabase = await createClient();
  const { data: library } = await supabase.from("library").select();

  return <pre>{JSON.stringify(library, null, 2)}</pre>
}
