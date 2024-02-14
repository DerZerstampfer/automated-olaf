import { Api, Config, Cron, StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
  const REDIS_URL = new Config.Secret(stack, "REDIS_URL");
  const REDIS_TOKEN = new Config.Secret(stack, "REDIS_TOKEN");

  const OLAF_TEAMPILOT_LAUNCHPAD_SLUG = new Config.Secret(
    stack,
    "OLAF_TEAMPILOT_LAUNCHPAD_SLUG"
  );

  const client_id = new Config.Secret(stack, "client_id");
  const client_secret = new Config.Secret(stack, "client_secret");
  const twitter_api_key = new Config.Secret(stack, "twitter_api_key");
  const twitter_api_key_secret = new Config.Secret(
    stack,
    "twitter_api_key_secret"
  );
  const twitter_access_token = new Config.Secret(stack, "twitter_access_token");
  const twitter_access_token_secret = new Config.Secret(
    stack,
    "twitter_access_token_secret"
  );

  const CALLBACK_URL_HOSTNAME = new Config.Secret(
    stack,
    "CALLBACK_URL_HOSTNAME"
  );

  const twitter_bearer_token = new Config.Secret(stack, "twitter_bearer_token");

  const discord_olaf_webhook = new Config.Secret(stack, "discord_olaf_webhook");

  const binds = [
    OLAF_TEAMPILOT_LAUNCHPAD_SLUG,
    REDIS_URL,
    REDIS_TOKEN,
    client_id,
    client_secret,
    twitter_api_key,
    twitter_api_key_secret,
    twitter_access_token,
    twitter_access_token_secret,
    twitter_bearer_token,
    discord_olaf_webhook,
    CALLBACK_URL_HOSTNAME,
  ];

  const api = new Api(stack, "API", {
    routes: {
      // "GET /tweet": {
      //   function: {
      //     handler: "packages/functions/src/tweet.handler",
      //     timeout: "5 minute",
      //     bind: binds,
      //   },
      // },
      "GET /auth": {
        function: {
          handler: "packages/functions/src/auth.handler",
          timeout: "10 second",
          bind: binds,
        },
      },
      "GET /callback": {
        function: {
          handler: "packages/functions/src/callback.handler",
          timeout: "10 second",
          bind: binds,
        },
      },
    },
  });

  new Cron(stack, "automated-olaf", {
    job: {
      function: {
        handler: "packages/functions/src/tweet.handler",
        timeout: "10 minute",
        bind: binds,
      },
    },
    schedule: "cron(0 14 * * ? *)",
  });

  stack.addOutputs({
    APIEndpoint: api.url,
  });
}
