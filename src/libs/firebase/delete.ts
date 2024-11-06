import { Logger } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';

const parseFileName = (publicUrl: string) => {
  const urlParts = publicUrl.split('/');
  const fileNameAndQuery = urlParts[urlParts.length - 1];
  const [fileNameWithFolder] = fileNameAndQuery.split('?');
  const [folder, fileName] = decodeURIComponent(fileNameWithFolder).split('/');

  return {
    fileName,
    folder,
  };
};

export const deleteFilesFromFirebase = async (urls: string[]) => {
  const bucket = getStorage().bucket();
  try {
    await Promise.all(
      urls.map(async (item) => {
        try {
          const { fileName, folder } = parseFileName(item);
          const fileDestination = `${folder}/${fileName}`;
          const file = bucket.file(fileDestination);
          await file.delete();
        } catch (e) {
          Logger.error('Error deleting file from Firebase Storage:', e);
          return '';
        }
      }),
    );
    return {
      success: true,
    };
  } catch (error) {
    Logger.error('Error deleting file from Firebase Storage:', error);
    return {
      success: false,
    };
  }
};
