import { ApiHandler } from "sst/node/api";
import { twitterCallback } from "utils/twitter-auth";

export const handler = ApiHandler(async (_evt) => {
  return twitterCallback(_evt);
});
