# Cloudinary Setup Guide

This guide will help you set up Cloudinary for hosting your Valentine's Day website media files.

## 1. Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com) and sign up for a free account
2. Verify your email and log into your dashboard

## 2. Get Your Credentials

In your Cloudinary dashboard:

1. Go to **Account** → **Settings** → **Access Keys**
2. Copy your **Cloud name**, **API Key**, and **API Secret**

## 3. Create an Upload Preset

1. Go to **Settings** → **Upload** in your dashboard
2. Click **Add upload preset**
3. Set the following:
   - **Name**: `valentine_preset` (or whatever you set in `.env.local`)
   - **Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `valentine/` (optional, for organization)
   - **Allowed formats**: `jpg,png,jpeg,mp4,mp3` (or your preferred formats)
4. Save the preset

## 4. Configure Environment Variables

Update your `.env.local` file with your actual credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=valentine_preset
```

## 5. Upload Your Media Files

### Option 1: Upload via Cloudinary Dashboard

1. Go to **Media Library** in your dashboard
2. Create folders: `valentine/photos/`, `valentine/videos/`, `valentine/audio/`
3. Upload your files with these public IDs:
   - Photos: `valentine/photos/memory-1`, `valentine/photos/memory-2`, etc.
   - Videos: `valentine/videos/romantic-moment`, `valentine/videos/love-story`
   - Audio: `valentine/audio/romantic-background`

### Option 2: Upload Programmatically

You can create an admin page to upload files directly from your website. The upload utilities are already set up in `lib/upload.ts`.

## 6. Update Public IDs in Components

In your components, replace the placeholder public IDs with your actual uploaded file IDs:

- `VideoMemories.tsx`: Update `videoPublicId` and `thumbnailPublicId`
- `AlbumSection.tsx`: Update `imagePublicId`
- `BackgroundMusic.tsx`: Update the public ID in the `getCloudinaryUrl` call

## 7. Deploy

Once everything is configured and your media is uploaded:

1. Commit your changes
2. Push to your repository
3. Netlify will automatically redeploy

## Troubleshooting

- **404 Errors**: Make sure your public IDs match exactly (case-sensitive)
- **Upload Errors**: Check your upload preset permissions
- **Environment Variables**: Ensure they're properly set in Netlify's environment settings

## Benefits of Using Cloudinary

- **Fast Delivery**: Global CDN for quick loading
- **Automatic Optimization**: Images and videos are optimized automatically
- **Responsive Images**: Different sizes generated automatically
- **No Storage Limits**: On the free tier
- **Easy Management**: Web-based dashboard for uploads</content>
</xai:function_call">Created new file: c:\xampp\htdocs\mandare-amore.com\frontend\valentine\CLOUDINARY_SETUP.md