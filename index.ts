import Bun from "bun";
import app from "./src/app";

const startServer = async () => {
  const PORT = Bun.env.PORT || 5503;

  try {
    //   await connectDB();

    app
      .listen(PORT, () => console.log(`Listening on port ${PORT}`))
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
