import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const age = parseInt(formData.get('age') as string);
    const nationality = formData.get('nationality') as string;
    const location = formData.get('location') as string;
    const phone = formData.get('phone') as string;
    const yearsOfExperience = parseInt(formData.get('yearsOfExperience') as string);
    const skillsString = formData.get('skills') as string;
    const skills = skillsString ? skillsString.split(',').map(s => s.trim()) : [];
    const bio = formData.get('bio') as string;
    const resumeFile = formData.get('resume') as File | null;
    const profilePictureFile = formData.get('profilePicture') as File | null;

    let resumeUrl = null;
    let resumeFilename = null;
    let profilePictureUrl = null;

    // Upload profile picture to Supabase Storage if provided
    if (profilePictureFile) {
      const fileExt = profilePictureFile.name.split('.').pop();
      const fileName = `${session.user.email}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from('profile-pictures')
        .upload(fileName, profilePictureFile, {
          contentType: profilePictureFile.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Profile picture upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload profile picture' },
          { status: 500 }
        );
      }

      // Get public URL for the uploaded profile picture
      const { data: urlData } = supabaseAdmin
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      profilePictureUrl = urlData.publicUrl;
    }

    // Upload resume to Supabase Storage if provided
    if (resumeFile) {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${session.user.email}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from('resumes')
        .upload(fileName, resumeFile, {
          contentType: resumeFile.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload resume' },
          { status: 500 }
        );
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabaseAdmin
        .storage
        .from('resumes')
        .getPublicUrl(fileName);

      resumeUrl = urlData.publicUrl;
      resumeFilename = resumeFile.name;
    }

    // Insert candidate data into database
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .insert({
        user_id: session.user.email,
        email: session.user.email,
        full_name: fullName,
        age,
        nationality,
        location,
        phone,
        years_of_experience: yearsOfExperience,
        skills,
        bio,
        resume_url: resumeUrl,
        resume_filename: resumeFilename,
        profile_picture_url: profilePictureUrl,
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save candidate data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Verify user is authenticated
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch candidate data for the logged-in user
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('user_id', session.user.email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return NextResponse.json(
          { exists: false },
          { status: 404 }
        );
      }
      console.error('Database query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch candidate data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ exists: true, data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    
    // Extract editable fields
    const bio = formData.get('bio') as string;
    const skillsString = formData.get('skills') as string;
    const skills = skillsString ? skillsString.split(',').map(s => s.trim()).filter(Boolean) : [];
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const yearsOfExperience = formData.get('yearsOfExperience') as string;
    const resumeFile = formData.get('resume') as File | null;

    // Prepare update object
    const updateData: {
      bio: string;
      skills: string[];
      phone: string;
      location: string;
      years_of_experience: number;
      resume_url?: string;
      resume_filename?: string;
    } = {
      bio,
      skills,
      phone,
      location,
      years_of_experience: parseInt(yearsOfExperience),
    };

    // Handle resume upload if new file provided
    if (resumeFile && resumeFile.size > 0) {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${session.user.email}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabaseAdmin
        .storage
        .from('resumes')
        .upload(fileName, resumeFile, {
          contentType: resumeFile.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload resume' },
          { status: 500 }
        );
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabaseAdmin
        .storage
        .from('resumes')
        .getPublicUrl(fileName);

      updateData.resume_url = urlData.publicUrl;
      updateData.resume_filename = resumeFile.name;
    }

    // Update candidate data in database
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .update(updateData)
      .eq('user_id', session.user.email)
      .select()
      .single();

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Failed to update candidate data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
