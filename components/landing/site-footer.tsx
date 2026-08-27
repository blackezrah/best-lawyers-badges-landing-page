import { BrandMark } from './primitives'
import { FOOTER_LINKS } from '@/lib/content'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer data-motion-scene="footer" className="bg-bl-charcoal motion-footer">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <BrandMark tone="light" showDescriptor={false} />
            <p className="mt-4 text-sm leading-relaxed text-bl-light-gray-1">
              Official badge and logo licensing for eligible lawyers and firms
              recognized in Best Lawyers rankings.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                // External destinations should replace the whole browser page
                // (not load inside the iframe). Use _top for real URLs.
                // Placeholder "#" links do not open _top so they never break
                // out of the frame to nowhere.
                target={link.href === '#' ? undefined : '_top'}
                rel={link.href === '#' ? undefined : 'noopener'}
                className="text-sm text-bl-light-gray-1 transition-colors hover:text-bl-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-bl-light-gray-2">
            Best Lawyers® and related marks are trademarks of their respective
            owner. Use of the marks requires express written permission and an
            official license. Recognition is earned through the Best Lawyers
            methodology; licensing authorizes use of the official marks and
            assets only.
          </p>
          <p className="mt-4 text-xs text-bl-light-gray-2">
            © {year} Best Lawyers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
