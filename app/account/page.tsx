import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
  <div className="flex flex-col items-center justify-center w-full h-screen p-4 space-y-4">
    <AccountForm user={user} />
  </div>
  )
}
