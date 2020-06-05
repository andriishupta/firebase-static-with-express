import * as admin from 'firebase-admin';
import { GetSignedUrlConfig, GetSignedUrlResponse } from '@google-cloud/storage';

export async function getProfilePhoto(storage: admin.storage.Storage, config: GetSignedUrlConfig) {
  return await storage.bucket().file('profile/profile-photo.jpg')
      .getSignedUrl(config).then((response: GetSignedUrlResponse) => response[0])
}

