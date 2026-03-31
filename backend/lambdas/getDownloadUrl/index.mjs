import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { success, error } from './shared/response.mjs';

const s3 = new S3Client();
const BUCKET = process.env.ATTACHMENTS_BUCKET;

export const handler = async (event) => {
  try {
    const key = event.queryStringParameters?.key;
    
    if (!key) {
      return error(400, 'Missing key query parameter');
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });

    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour

    return success({ downloadUrl });
  } catch (err) {
    console.error('GetDownloadUrl error:', err);
    return error(500, 'Failed to generate download URL');
  }
};
