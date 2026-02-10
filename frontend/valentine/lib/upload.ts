// Upload a file to Cloudinary using unsigned upload preset
export const uploadToCloudinary = async (
  file: File,
  folder: string = 'valentine',
  publicId?: string
): Promise<{ public_id: string; secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'valentine_preset');
    formData.append('folder', folder);

    if (publicId) {
      formData.append('public_id', publicId);
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      reject(new Error('Cloudinary cloud name not configured'));
      return;
    }

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve({
            public_id: data.public_id,
            secure_url: data.secure_url,
          });
        }
      })
      .catch(reject);
  });
};

// Upload multiple files
export const uploadMultipleToCloudinary = async (
  files: File[],
  folder: string = 'valentine'
): Promise<Array<{ public_id: string; secure_url: string }>> => {
  const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};

// Note: Delete functionality requires server-side implementation for security
// This would need to be moved to an API route or server component