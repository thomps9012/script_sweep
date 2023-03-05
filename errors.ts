const BASE_URL = "https://thomps9012.github.io/script_sweep/docs";
export const ERRORS = {
  MALFORMED_BODY: {
    status: "BAD REQUEST",
    code: 400,
    message:
      "We couldn't find a 'text' key in your request body. Ensure your request matches the classification and organization models.",
    documentation_link: `${BASE_URL}/endpoints/classify`,
    second_documentation_link: `${BASE_URL}/endpoints/organize`,
  },
  ID_NOT_FOUND: {
    status: "NOT FOUND",
    code: 404,
    message: "No script was found with that ID",
    documentation_link: `${BASE_URL}/endpoints/scripts`,
  },
  UNIMPLEMENTED: {
    status: "NOT IMPLEMENTED",
    code: 501,
    message: "This route or method is currently under construction.",
    documentation_link: `${BASE_URL}/errors`,
  },
  SERVER_ERROR: {
    status: "SERVICE UNAVAILABLE",
    code: 503,
    message:
      "Our servers are currently experiencing an issue, please try again later.",
    documentation_link: `${BASE_URL}/errors`,
  },
  SCRIPT_NOT_FOUND: {
    status: "NOT FOUND",
    code: 404,
    error:
      "We couldn't match this text to any of our known scripts, please check the database results.",
    redirect: "/api/scripts",
    documentation_link: `${BASE_URL}/endpoints/scripts`,
  },
  CLASSIFY_REDIRECT: {
    status: "SEE OTHER",
    code: 303,
    message:
      "You're attempting to organize one word. Please visit the classification endpoint instead to learn more about your text",
    redirect: "/api/classify",
    documentation_link: `${BASE_URL}/endpoints/classify`,
  },
  DUPLICATE_KEY: {
    status: "CONFLICT",
    code: 409,
    message:
      "You've already activated an API key associated with this email, please delete your current API key or use a different email to generate a new one.",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  NO_EMAIL: {
    status: "BAD REQUEST",
    code: 400,
    message: "Please include a valid email address.",
    documentation_link: `${BASE_URL}/errors`,
  },
  NO_FIRST_NAME: {
    status: "BAD REQUEST",
    code: 400,
    message: "Please include a valid first name.",
    documentation_link: `${BASE_URL}/errors`,
  },
  NO_LAST_NAME: {
    status: "BAD REQUEST",
    code: 400,
    message: "Please include a valid last name.",
    documentation_link: `${BASE_URL}/errors`,
  },
  NO_KEY: {
    status: "UNAUTHORIZED",
    code: 401,
    message:
      "You're attempting to access the resource without using an API key, please request one at the redirect",
    redirect: "/api/auth/api_key",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  KEY_NOT_FOUND: {
    status: "UNAUTHORIZED",
    code: 401,
    message:
      "You're attempting to access the resource using an incorrect email, expired or invalid API key, please check your credentials, or request a new API key at the redirect.",
    redirect: "/api/auth/api_key",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  RATE_LIMIT: {
    status: "TOO MANY REQUESTS",
    code: 429,
    message:
      "You've hit the daily limit for API calls associated with this API key, please wait until tomorrow to make further requests.",
    documentation_link: `${BASE_URL}/errors`,
  },
  NO_JWT: {
    status: "FORBIDDEN",
    code: 403,
    message:
      "You're attempting to access the resource without using a json web token. If you need a token follow the redirect below. If you need an API key follow the second redirect below.",
    redirect: "/api/auth/jwt",
    second_redirect: "/api/auth/api_key",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  TOKEN_EXPIRED: {
    status: "FORBIDDEN",
    code: 403,
    message:
      "You're attempting to access the resource using an expired token, please visit the redirect to refresh your token.",
    redirect: "/api/auth/jwt",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  TAMPERED_JWT: {
    status: "FORBIDDEN",
    code: 403,
    message:
      "You're attempting to access the resource using an unauthenticated token, please visit the redirect to refresh your token.",
    redirect: "/api/auth/jwt",
    documentation_link: `${BASE_URL}/endpoints/auth`,
  },
  NO_FILTERED_RESULTS: {
    status: "NOT FOUND",
    code: 404,
    message:
      "We couldn't find any scripts that matched the parameters and filters that you've set. Please broaden your search headers to view results.",
    documentation_link: `${BASE_URL}/endpoints/scripts`
  },
};
