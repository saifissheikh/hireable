import { auth } from '@/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type UserRole = 'candidate' | 'recruiter' | null;

/**
 * Get the role of the currently authenticated user
 * Returns null if user has no role set yet
 */
export async function getUserRole(): Promise<UserRole>;
export async function getUserRole(email: string): Promise<UserRole>;
export async function getUserRole(email?: string): Promise<UserRole> {
  let userEmail = email;
  
  if (!userEmail) {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }
    userEmail = session.user.email;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('email', userEmail)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No user found
        return null;
      }
      console.error('Error fetching user role:', error);
      return null;
    }

    return data.role as UserRole;
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}

/**
 * Create a new user with the specified role
 */
export async function createUserWithRole(role: 'candidate' | 'recruiter'): Promise<boolean>;
export async function createUserWithRole(email: string, name: string, role: 'candidate' | 'recruiter'): Promise<boolean>;
export async function createUserWithRole(emailOrRole: string, nameOrUndefined?: string, roleOrUndefined?: 'candidate' | 'recruiter'): Promise<boolean> {
  let email: string;
  let name: string;
  let role: 'candidate' | 'recruiter';

  if (nameOrUndefined && roleOrUndefined) {
    // Called with all parameters
    email = emailOrRole;
    name = nameOrUndefined;
    role = roleOrUndefined;
  } else {
    // Called with just role - get from session
    const session = await auth();
    if (!session?.user?.email) {
      return false;
    }
    email = session.user.email;
    name = session.user.name || '';
    role = emailOrRole as 'candidate' | 'recruiter';
  }

  try {
    const { error } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        name,
        role,
      });

    if (error) {
      console.error('Error creating user with role:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in createUserWithRole:', error);
    return false;
  }
}
