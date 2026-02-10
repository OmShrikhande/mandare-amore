// Helper function to get Cloudinary URL (client-safe)
export const getCloudinaryUrl = (publicId: string, options: any = {}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn('Cloudinary cloud name not configured');
    return '';
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}`;
  const transformations = [];

  // Add common transformations
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.fetch_format) transformations.push(`f_${options.fetch_format}`);

  const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
  const resourceType = options.resource_type ? `${options.resource_type}/` : 'image/';

  return `${baseUrl}/${resourceType}${transformationString}${publicId}`;
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, width = 800, height = 600) => {
  return getCloudinaryUrl(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
  });
};

// Helper function to get video URL
export const getVideoUrl = (publicId: string) => {
  return getCloudinaryUrl(publicId, {
    resource_type: 'video',
    format: 'mp4',
  });
};

// Helper function to get audio URL
export const getAudioUrl = (publicId: string) => {
  return getCloudinaryUrl(publicId, {
    resource_type: 'video', // Audio files use 'video' resource type in Cloudinary
  });
};