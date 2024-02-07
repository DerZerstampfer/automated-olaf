import { TwitterApi } from "twitter-api-v2";

import { Redis } from "@upstash/redis";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Config } from "sst/node/config";

export const redis = new Redis({
  url: Config.REDIS_URL,
  token: Config.REDIS_TOKEN,
});

export const twitterClient = new TwitterApi({
  clientId: Config.client_id,
  clientSecret: Config.client_secret,
});

export const twitterV1Client = new TwitterApi({
  appKey: Config.twitter_api_key,
  appSecret: Config.twitter_api_key_secret,
  accessToken: Config.twitter_access_token,
  accessSecret: Config.twitter_access_token_secret,
});

export const callbackUrl = Config.CALLBACK_URL_HOSTNAME + "/callback";

export const twitterAuth = async (_evt: APIGatewayProxyEventV2) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackUrl,
    {
      scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    }
  );

  await redis.set("codeVerifier", codeVerifier);
  await redis.set("state", state);

  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
};

export const twitterCallback = async (_evt: APIGatewayProxyEventV2) => {
  const state = _evt.queryStringParameters?.state as string;
  const code = _evt.queryStringParameters?.code as string;

  const codeVerifier = (await redis.get("codeVerifier")) as string;
  const savedState = (await redis.get("state")) as string;

  if (state !== savedState) {
    return {
      statusCode: 400,
      body: "Stored tokens do not match!",
    };
  }

  const {
    client: loggedClient,
    accessToken,
    refreshToken,
  } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: callbackUrl,
  });

  await redis.set("accessToken", accessToken);
  await redis.set("refreshToken", refreshToken);

  return {
    statusCode: 200,
    body: "Logged in!",
  };
};
