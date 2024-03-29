export const APP_URL =
  (typeof process.env.NEXT_PUBLIC_APP_URL === "string"
    ? process.env.NEXT_PUBLIC_APP_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`) ||
  "http://localhost:3000/";

export const APP_TITLE = "Where to watch";
export const APP_DESCRIPTION =
  "Search for movies and see information on where to stream, rent or buy them.";

export {};
