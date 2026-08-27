import { LandingPage } from '@/components/landing/landing-page'

/*
  Standalone route (/) — the same landing-page experience for direct
  QA/preview. The production embed lives at /embed/badge-logo-licensing,
  which additionally mounts the IframeHeightReporter and is framing-safe.
*/
export default function Page() {
  return <LandingPage />
}
