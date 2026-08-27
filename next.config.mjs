/** @type {import('next').NextConfig} */

/*
  ───────────────────────────────────────────────────────────────
  FRAMING SECURITY — allow embedding ONLY by approved parent origins
  ───────────────────────────────────────────────────────────────
  The embed route (/embed/badge-logo-licensing) is designed to be
  framed by the Instapage published campaign page.

  Configure the allowed parent origin(s) with the environment variable
  ALLOWED_FRAME_ANCESTORS (space-separated list). For example:

    ALLOWED_FRAME_ANCESTORS="https://pages.instapage.com https://your-custom-domain.com"

  We intentionally:
    - DO NOT send X-Frame-Options: DENY
    - DO NOT send X-Frame-Options: SAMEORIGIN
    - DO NOT use a permissive wildcard in production
  and instead rely on the CSP `frame-ancestors` directive below.
*/

// Replace the fallback below with your confirmed Instapage publishing domain.
// Do NOT ship the permissive `'self' https:` fallback to production.
const ALLOWED_FRAME_ANCESTORS =
  process.env.ALLOWED_FRAME_ANCESTORS ??
  "'self' https://pages.instapage.com" // <-- TODO: set the confirmed Instapage domain

const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Apply framing policy to the embed route.
        source: '/embed/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors ${ALLOWED_FRAME_ANCESTORS};`,
          },
          {
            // Keep the embed document out of the public index.
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
