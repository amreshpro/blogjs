import multer from "multer";
import path from "path";
import createError from "http-errors";

// Configure Multer to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    cb(null, uploadPath); // Define the upload path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Create unique filename
    cb(null, uniqueSuffix); // Save file with timestamp and extension
  },
});

// Multer configuration for file uploads
export const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allowed file types
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      // Pass the error to the next middleware
      cb(createError(400, "Only image files (jpeg, jpg, png) are allowed"));
    }
  },
});
