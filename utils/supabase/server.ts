import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client instance for server-side usage in Next.js.
 *
 * This function initializes the Supabase client using environment variables for the URL and anon key.
 * It also integrates with Next.js cookies for session management, supporting both reading and setting cookies.
 *
 * @returns {Promise<ReturnType<typeof createServerClient>>} A promise that resolves to the Supabase client instance.
 *
 * @example
 * const supabase = await createClient();
 * const { data, error } = await supabase.from('table').select('*');
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Retrieves all cookies from the current request context.
         * @returns {Array} Array of cookies.
         */
        getAll() {
          return cookieStore.getAll()
        },
        /**
         * Sets multiple cookies in the current response context.
         * @param {Array} cookiesToSet - Array of cookies to set.
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
