import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing/landing-page'
import { IframeHeightReporter } from '@/components/iframe-height-reporter'

/*
  EMBED ROUTE — /embed/badge-logo-licensing
  ─────────────────────────────────────────
  This is the Instapage-embeddable document. It:
    - contains the complete landing-page experience
    - is marked noindex, nofollow (also enforced via X-Robots-Tag header
      in next.config.mjs)
    - mounts the IframeHeightReporter for cross-origin auto-height
    - is directly testable in a normal browser for QA

  Framing is permitted only for approved parent origins via the CSP
  `frame-ancestors` directive configured in next.config.mjs.

  The public campaign canonical/SEO belongs to the Instapage parent page,
  NOT this embed URL. See INTEGRATION.md.
*/
export const metadata: Metadata = {
  title: 'Best Lawyers badge and logo licensing',
  description:
    'Embedded licensing experience for official Best Lawyers badges and logos.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  // Do NOT set this embed URL as the public campaign canonical.
  // TODO: The final public canonical must be configured on the Instapage page.
}

export default function EmbedBadgeLogoLicensingPage() {
  return (
    <>
      <IframeHeightReporter />
      <LandingPage />
    </>
  )
}
