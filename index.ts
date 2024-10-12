import Bun from "bun";
import app from "./src/app";
import { logger } from "./src/utils/logging";

const startServer = async () => {
  const PORT = Bun.env.PORT || 5503;

  try {
    //   await connectDB();

    app
      .listen(PORT, () => {
        console.log(`Listening on  http://localhost:${PORT}`);
        logger.info(`Listening on  http://localhost:${PORT}`);
      })
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit(1);
      });
  } catch (err) {
    //   logger.error("Error happened: ", err.message);
    process.exit(1);
  }
};

void startServer();
