import { ApiHandler } from "sst/node/api";
import { twitterAuth } from "utils/twitter-auth";

export const handler = ApiHandler(async (_evt) => {
  return twitterAuth(_evt);
});
