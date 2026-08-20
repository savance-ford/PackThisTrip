const PRODUCTION_ORIGIN = "https://packthistrip.com";
const PRODUCTION_HOST = "packthistrip.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10_000;

const responseErrors = {
  400: "Bad request. Check the key format and submitted URL payload.",
  403: "Forbidden. Confirm that the IndexNow key is valid and its key file is publicly accessible.",
  422: "Unprocessable request. Confirm every URL belongs to packthistrip.com and matches the key location.",
  429: "Too many requests. Wait before submitting these URLs again."
};

function exitWithError(message) {
  console.error(`IndexNow submission failed: ${message}`);
  process.exit(1);
}

function normalizeUrl(input) {
  let url;

  try {
    url = new URL(input, `${PRODUCTION_ORIGIN}/`);
  } catch {
    throw new Error(`Invalid URL or path: ${input}`);
  }

  if (
    url.origin !== PRODUCTION_ORIGIN ||
    url.hostname !== PRODUCTION_HOST ||
    url.protocol !== "https:" ||
    url.username ||
    url.password
  ) {
    throw new Error(`URL must use ${PRODUCTION_ORIGIN}: ${input}`);
  }

  if (url.search || url.hash) {
    throw new Error(`Submit a canonical path without a query string or fragment: ${input}`);
  }

  if (url.href.length > 2_048) {
    throw new Error(`URL exceeds the 2,048-character IndexNow limit: ${input}`);
  }

  return url.href;
}

const key = process.env.INDEXNOW_KEY?.trim();

if (!key) {
  exitWithError("INDEXNOW_KEY is required in the environment.");
}

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  exitWithError("INDEXNOW_KEY must be 8-128 characters using only letters, numbers, or hyphens.");
}

const argumentsToSubmit = process.argv.slice(2).map((argument) => argument.trim()).filter(Boolean);

if (argumentsToSubmit.length === 0) {
  exitWithError("Provide at least one changed PackThisTrip URL path.");
}

let urlList;

try {
  urlList = [...new Set(argumentsToSubmit.map(normalizeUrl))];
} catch (error) {
  exitWithError(error instanceof Error ? error.message : String(error));
}

if (urlList.length > MAX_URLS_PER_REQUEST) {
  exitWithError(`A single request cannot contain more than ${MAX_URLS_PER_REQUEST.toLocaleString()} URLs.`);
}

const payload = {
  host: PRODUCTION_HOST,
  key,
  keyLocation: `${PRODUCTION_ORIGIN}/${key}.txt`,
  urlList
};

console.log(`Submitting ${urlList.length} URL${urlList.length === 1 ? "" : "s"} to IndexNow:`);
urlList.forEach((url) => console.log(`- ${url}`));

let response;

try {
  response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000)
  });
} catch (error) {
  exitWithError(`Network request could not be completed: ${error instanceof Error ? error.message : String(error)}`);
}

console.log(`IndexNow response: ${response.status} ${response.statusText}`.trim());

if (response.status === 200) {
  console.log("IndexNow accepted the submission.");
  process.exit(0);
}

if (response.status === 202) {
  console.log("IndexNow accepted the submission; key validation is pending.");
  process.exit(0);
}

const responseBody = (await response.text()).trim();
const usefulError = responseErrors[response.status] ?? "The IndexNow endpoint returned an unexpected response.";
const bodyDetails = responseBody ? ` Response body: ${responseBody}` : "";

exitWithError(`${usefulError}${bodyDetails}`);
