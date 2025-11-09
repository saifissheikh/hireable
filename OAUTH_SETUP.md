# OAuth Setup Guide for Hireable

OAuth authentication has been successfully integrated! Follow these steps to complete the setup:

## 🔐 What's Been Set Up

- ✅ NextAuth.js v5 (Auth.js) installed
- ✅ Google OAuth provider configured
- ✅ LinkedIn OAuth provider configured
- ✅ Landing page with OAuth login buttons
- ✅ Dashboard page for authenticated users
- ✅ Protected routes
- ✅ Session management

## 📋 Setup Instructions

### 1. Generate AUTH_SECRET

Run this command to generate a secure secret:

\`\`\`bash
openssl rand -base64 32
\`\`\`

Copy the output and replace `your-secret-here-generate-with-openssl-rand-base64-32` in `.env.local`

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen (add your app name, email, etc.)
6. Application type: **Web application**
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy **Client ID** and **Client Secret** to `.env.local`:
   \`\`\`
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   \`\`\`

### 3. Set Up LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **Create app**
3. Fill in the app details:
   - App name: `Hireable`
   - LinkedIn Page: Select or create a LinkedIn page
   - App logo: Upload a logo (optional)
   - Legal agreement: Check the box
4. Click **Create app**
5. Go to the **Auth** tab
6. Add authorized redirect URLs:
   - `http://localhost:3000/api/auth/callback/linkedin` (for development)
   - `https://yourdomain.com/api/auth/callback/linkedin` (for production)
7. Under **Auth** tab, you'll find:
   - **Client ID**
   - **Client Secret** (click "Show" to reveal)
8. Go to **Products** tab and request access to:
   - **Sign In with LinkedIn using OpenID Connect** (recommended)
   - Alternatively: **Sign In with LinkedIn** (legacy)
9. Copy credentials to `.env.local`:
   \`\`\`
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   \`\`\`

### 4. Restart Development Server

After updating `.env.local`, restart your development server:

\`\`\`bash
npm run dev
\`\`\`

## 🎯 Testing OAuth Login

1. Navigate to `http://localhost:3000`
2. Click on **Google** or **LinkedIn** button in the login card
3. Authorize the application
4. You'll be redirected to the dashboard at `/dashboard`
5. Click **Sign Out** to return to the landing page

## 📁 Files Created/Modified

### New Files:
- `auth.ts` - NextAuth configuration
- `app/api/auth/[...nextauth]/route.ts` - Auth API route
- `app/dashboard/page.tsx` - Protected dashboard page
- `.env.local` - Environment variables (DO NOT commit this!)

### Modified Files:
- `app/page.tsx` - Updated with OAuth functionality
- `next.config.ts` - Added image domains for user avatars

## 🔒 Security Notes

- Never commit `.env.local` to version control (already in `.gitignore`)
- Use different OAuth apps for development and production
- Rotate secrets regularly
- For production, set `NEXTAUTH_URL` to your production domain

## 🚀 Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform
2. Update OAuth redirect URIs to production domain
3. Set `NEXTAUTH_URL` to your production domain
4. Ensure `AUTH_SECRET` is a strong random value

## 📚 Additional Features You Can Add

- Email/Password authentication
- More OAuth providers (Microsoft, Apple, etc.)
- Role-based access control
- User profile management
- Database session storage
- LinkedIn profile data import

## 🐛 Troubleshooting

**"Configuration" error:**
- Make sure all environment variables are set in `.env.local`
- Restart the development server after changing `.env.local`

**OAuth redirect error:**
- Verify redirect URIs match exactly in OAuth provider settings
- Check that you're using the correct client ID and secret

**Session not persisting:**
- Clear browser cookies
- Check browser console for errors
- Verify `AUTH_SECRET` is set

**LinkedIn specific issues:**
- Ensure you've requested access to "Sign In with LinkedIn" products
- Wait for LinkedIn to approve your product access (usually instant)
- Check that your LinkedIn Page is properly set up

## 📖 Resources

- [NextAuth.js Documentation](https://authjs.dev/)
- [Google OAuth Setup Guide](https://support.google.com/cloud/answer/6158849)
- [LinkedIn OAuth Documentation](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [LinkedIn Developers Portal](https://www.linkedin.com/developers/)
