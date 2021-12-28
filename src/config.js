const ENV = process?.env?.NODE_ENV ?? "devel";

/**
 * General application configurations.
 *
 * @example
 * const { API_URL } = require("./config").CONFIG;
 */
module.exports.CONFIG = {
  test: {
    "API_URL": "http://dev.blog.local/api",
  },
  devel: {
    "API_URL": "http://dev.blog.local/api",
  },
  stage: {
    "API_URL": "https://stage.blog.local/api",
  },
}[ENV];

