import { z } from "zod";
import { logger } from "../../logging";

// Define Zod schema for User
const userValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.number(),
  createdAt: z.date().default(() => new Date()), // optional, defaults to current date
});

export default function validateUserData(user: any) {
  const userValidationResult = userValidationSchema.safeParse(user);
  if (!userValidationResult.success) {
    logger.info(userValidationResult.error);
    return false;
  } else {
    logger.info("Valid data", userValidationResult.data);
    return true;
  }
}
