import fs from "fs";
import path from "path";
import { logger } from "../logging";

export const saveImageBuffer = (buffer: any | undefined, filename: string) => {
  const filePath = path.join("uploads", filename); // Define the path to save the image
  if (!buffer) {
  }
  // Write the buffer to an image file
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error saving image:", err);
      logger.error("Error saving image:", err);
    } else {
      console.log("Image saved successfully:", filePath);
      logger.info("Image saved successfully:", filePath);
    }
  });

  return filePath;
};
