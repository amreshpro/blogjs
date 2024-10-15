import { z } from "zod";
import mongoose from "mongoose";
import { logger } from "../../logging";

// Zod schema to validate post data
export const postValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"), // Minimum 3 characters for title
  content: z.string().min(10, "Content must be at least 10 characters long"), // Minimum 10 characters for content
  imageUrl: z.string().url("Invalid image URL"), // Must be a valid URL for the image
  user: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user ID",
  }), // Custom validation to check if user ID is a valid MongoDB ObjectId
});

// Function to validate post data using Zod
export default function validatePostData(postData: any) {
  const postValidationResult = postValidationSchema.safeParse(postData); // This will throw an error if validation fails
  if (!postValidationResult.success) {
    logger.error(postValidationResult.error);
    return false;
  } else {
    logger.info("Valid Post Data: ", postValidationResult.data);
    return true;
  }
}
