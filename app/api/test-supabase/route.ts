import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
    }

    const supabase = await createClient()
    
    // Test the connection by getting the current timestamp from Supabase
    const { error } = await supabase
      .from('_dummy')
      .select('*')
      .limit(1)
    
    // If the table doesn't exist, the connection is still working
    if (error && (error.message.includes('does not exist') || error.message.includes('Could not find'))) {
      return NextResponse.json({
        success: true,
        message: 'Supabase connection successful! ✅',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        note: 'The error about table not existing is expected - connection is working fine!',
      })
    }

    // Any other error means there's a real problem
    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Query error',
        error: error.message,
        hint: error.hint || 'No hint available',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    const stack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      {
        success: false,
        message: 'Supabase connection failed',
        error: message,
        stack: stack,
        env: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        }
      },
      { status: 500 }
    )
  }
}
