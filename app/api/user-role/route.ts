import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Fetch user role
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('email', session.user.email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No user found
        return NextResponse.json(
          { role: null },
          { status: 200 }
        );
      }
      console.error('Error fetching user role:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user role' },
        { status: 500 }
      );
    }

    return NextResponse.json({ role: data.role }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create user with role
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { role } = await request.json();

    if (!role || !['candidate', 'recruiter'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('email', session.user.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User role already set', role: existingUser.role },
        { status: 409 }
      );
    }

    // Create new user with role
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        email: session.user.email,
        name: session.user.name,
        role,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, role: data.role }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
