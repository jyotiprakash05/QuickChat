import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { success, error } from './shared/response.mjs';

const s3 = new S3Client();
const BUCKET = process.env.ATTACHMENTS_BUCKET;

export const handler = async (event) => {
  try {
    const { fileName, fileType } = JSON.parse(event.body);
    const userId = event.requestContext?.authorizer?.claims?.sub || 'demo-user';
    
    const key = `${userId}/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: fileType
    });
    
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const fileUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`;
    
    return success({ uploadUrl, fileUrl, key });
  } catch (err) {
    return error(err.message);
  }
};

