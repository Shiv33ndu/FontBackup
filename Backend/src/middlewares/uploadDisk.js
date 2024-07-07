// uploadDiskMiddleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Utility to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disk storage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/temp'); // specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const uploadDisk = multer({ storage: diskStorage });

export default uploadDisk;
