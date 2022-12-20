import { storage } from '@/utils/altogic';

const FileService = {
  uploadFile: async (file, fileName) =>
    storage.bucket('root').upload(fileName, file),
  deleteFile: async (url) => storage.deleteFile(url),
};
export default FileService;
