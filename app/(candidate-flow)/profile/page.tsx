import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ProfileView } from '@/components/profile-view';
import { createClient } from '@supabase/supabase-js';
import { getLocale } from '@/lib/get-locale';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function ProfilePage() {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user?.email) {
    redirect('/');
  }

  // Fetch candidate profile from database
  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('user_id', session.user.email)
    .single();

  if (error || !data) {
    // No profile found, redirect to onboarding
    redirect('/onboarding');
  }

  return <ProfileView candidate={data} user={session.user} locale={locale} />;
}
