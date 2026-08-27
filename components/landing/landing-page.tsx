import { SiteHeader } from './site-header'
import { Hero } from './hero'
import { RecognitionContext } from './recognition-context'
import { ValueSection } from './value-section'
import { ApprovedUses } from './approved-uses'
import { LicensingProcess } from './licensing-process'
import { LicensingOptions } from './licensing-options'
import { UsageStandards } from './usage-standards'
import { ApprovedLanguage } from './approved-language'
import { MethodologyAuthority } from './methodology-authority'
import { LicensingInquiryForm } from './licensing-inquiry-form'
import { FAQ } from './faq'
import { FinalCTA } from './final-cta'
import { SiteFooter } from './site-footer'
import { MotionController } from './motion-controller'

/**
 * The complete Best Lawyers badge & logo licensing landing page.
 * Shared by the standalone route (/) and the embed route
 * (/embed/badge-logo-licensing). Contains no fixed positioning so it
 * behaves correctly inside a cross-origin Instapage iframe.
 */
export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bl-white">
      <MotionController />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <RecognitionContext />
        <ValueSection />
        <ApprovedUses />
        <LicensingProcess />
        <LicensingOptions />
        <UsageStandards />
        <ApprovedLanguage />
        <MethodologyAuthority />
        <LicensingInquiryForm />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
