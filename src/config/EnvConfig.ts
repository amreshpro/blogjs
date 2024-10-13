import Bun from "bun";

const BunEnv = Bun.env;

export default {
  NODE_ENV: BunEnv.NODE_ENV,
  PORT: BunEnv.PORT || 4000,
};
