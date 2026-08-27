/*
  Typed content arrays for the Best Lawyers badge & logo licensing
  landing page. All copy is sourced verbatim from the approved brief.
  Keep copy edits here rather than inline in components.
*/

export const PRIMARY_CTA = 'Request Licensing Options'
export const SECONDARY_CTA = 'Review Approved Uses'
export const FORM_ANCHOR = '#inquiry'
export const USES_ANCHOR = '#approved-uses'

export const NAV_LINKS = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'Approved Uses', href: '#approved-uses' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Guidelines', href: '#guidelines' },
  { label: 'FAQ', href: '#faq' },
] as const

export const CREDIBILITY_POINTS = [
  {
    title: 'Earned distinction',
    body: 'Recognition is based on Best Lawyers’ peer-review methodology.',
  },
  {
    title: 'Official assets',
    body: 'Licensed marks provide an authorized way to display that recognition.',
  },
  {
    title: 'Clear usage standards',
    body: 'Guidelines help firms publish recognition accurately and consistently.',
  },
] as const

export const VALUE_MODULES = [
  {
    index: '01',
    title: 'Strengthen first impressions',
    body: 'Present recognized status clearly on high-intent pages and client-facing materials.',
  },
  {
    index: '02',
    title: 'Create consistency across channels',
    body: 'Use approved assets and language across web, email, social, and marketing communications.',
  },
  {
    index: '03',
    title: 'Protect brand integrity',
    body: 'Display the marks in their authorized form, colors, and context.',
  },
  {
    index: '04',
    title: 'Simplify internal execution',
    body: 'Give marketing teams a defined licensing and approval framework instead of relying on improvised graphics or language.',
  },
] as const

export const APPROVED_USES = [
  {
    title: 'Lawyer or firm website',
    body: 'Display recognition on profile, biography, practice-area, recognition, or about pages. Link the asset to the lawyer’s Best Lawyers profile or to bestlawyers.com.',
  },
  {
    title: 'Email messages',
    body: 'Use the licensed asset in an email signature or approved email template when the message originates from the listed lawyer.',
  },
  {
    title: 'Social media',
    body: 'Share recognition across social platforms using accurate award language. Tagging Best Lawyers is encouraged.',
  },
  {
    title: 'Marketing brochures',
    body: 'Include licensed recognition in brochures that comply with applicable legal advertising rules.',
  },
  {
    title: 'Print and online advertisements',
    body: 'Submit advertisements containing the Best Lawyers name or marks to Best Lawyers for approval before production or public release.',
  },
  {
    title: 'Large-format media',
    body: 'Billboards, outdoor advertising, and television use require an additional large-format license.',
  },
] as const

export const LICENSING_STEPS = [
  {
    index: '01',
    title: 'Confirm eligibility',
    body: 'The lawyer and/or law firm must appear in the print or online Best Lawyers rankings.',
  },
  {
    index: '02',
    title: 'Define intended use',
    body: 'Identify where the badge or logo will appear, including websites, email, social media, brochures, advertisements, or large-format media.',
  },
  {
    index: '03',
    title: 'Secure the appropriate license',
    body: 'Licensing scope varies based on the recognition, market, intended use, and organization.',
  },
  {
    index: '04',
    title: 'Publish with approved language',
    body: 'Use the official asset without alteration, include appropriate recognition language, and obtain approval where required.',
  },
] as const

export const LICENSING_OPTIONS = [
  {
    id: 'individual',
    title: 'Individual lawyer licensing',
    body: 'For a recognized lawyer seeking approved use on personal biography pages, eligible email communications, social announcements, and applicable marketing materials.',
    cta: 'Request Individual Options',
    interest: 'Individual lawyer',
  },
  {
    id: 'firm',
    title: 'Law firm licensing',
    body: 'For firms coordinating licensed recognition across multiple lawyers, firm-owned channels, practice pages, office pages, and centralized communications.',
    cta: 'Request Firm Options',
    interest: 'Law firm',
  },
  {
    id: 'expanded',
    title: 'Expanded media licensing',
    body: 'For campaigns involving billboards, outdoor placements, television, or other large-format media requiring additional licensing review.',
    cta: 'Discuss Expanded Use',
    interest: 'Agency or representative',
  },
] as const

export const USAGE_REQUIRED = [
  'Maintain the approved form and colors',
  'Include appropriate recognition language',
  'Link website displays to the relevant profile or bestlawyers.com',
  'Submit applicable advertisements for approval',
  'Follow all relevant legal advertising rules',
  'Observe the applicable embargo period',
] as const

export const USAGE_NOT_PERMITTED = [
  'Altering, recoloring, redrawing, cropping, or distorting the official mark',
  'Using an expired or unlicensed asset',
  'Describing someone as “a Best Lawyer”',
  'Implying endorsement of a service or product',
  'Publicizing an unreleased award during the embargo period',
  'Using the mark outside the licensed scope',
] as const

export const APPROVED_LANGUAGE = [
  'Amelia June was included in the 2027 edition of The Best Lawyers in America® for Personal Injury Litigation - Plaintiffs and Product Liability Litigation - Plaintiffs.',
  'Robert Brown was named the Best Lawyers® 2027 Family Law “Lawyer of the Year” in Atlanta.',
  'Hibbens & McKay, LLC is proud to have 14 lawyers recognized by Best Lawyers® in 2027 in America.',
  'Smith & McClean has been named a Tier 1 firm in Los Angeles for Appellate Practice in the 2027 edition of Best Law Firms®.',
] as const

export const NOT_APPROVED_LANGUAGE = [
  'Richard Brown is a Best Lawyer.',
  'Richard Brown is listed in Best Lawyers.',
  'Richard Brown has been named a Texas Best Lawyer.',
] as const

export const AUTHORITY_STATS = [
  {
    figure: '4 decades+',
    body: 'Best Lawyers has used peer review as the foundation of its recognition methodology for more than four decades.',
  },
  {
    figure: '18M+',
    body: 'More than 18 million confidential evaluations are collected worldwide each year.',
  },
  {
    figure: '~5% / ~3%',
    body: 'Approximately 5% of lawyers in the United States and 3% globally are recognized.',
  },
  {
    figure: '30M+',
    body: 'For the 2027 edition of The Best Lawyers in America®, more than 30 million evaluations were analyzed.',
  },
  {
    figure: '6M+',
    body: 'The 2027 Best Lawyers: Ones to Watch® in America recognitions were determined using more than 6 million evaluations.',
  },
  {
    figure: 'No fees',
    body: 'No fees are accepted for consideration or inclusion.',
  },
] as const

export const FAQ_ITEMS = [
  {
    q: 'Who is eligible to license a Best Lawyers badge or logo?',
    a: 'A lawyer and/or law firm must appear in the print or online Best Lawyers rankings. Eligibility and available assets depend on the applicable recognition.',
  },
  {
    q: 'How long does a license remain active?',
    a: 'Permission begins on the date of purchase and lasts either 12 months or until the next rankings publication is released in the applicable country.',
  },
  {
    q: 'Can I change the color or layout of the logo or badge?',
    a: 'No. Licensed assets must be used in the approved form and colors without modification or alteration.',
  },
  {
    q: 'Can I use the asset on my website?',
    a: 'Yes, within the applicable license and guidelines. Website use should link to the lawyer’s Best Lawyers profile or to bestlawyers.com.',
  },
  {
    q: 'Can I place the asset in an email signature?',
    a: 'Licensed email use is permitted when the message originates from the listed lawyer and the use follows the applicable guidelines.',
  },
  {
    q: 'Do advertisements require approval?',
    a: 'Print and online advertisements containing the Best Lawyers name or marks must be submitted to Best Lawyers for approval before production or public release.',
  },
  {
    q: 'Can I use a badge on a billboard or in a television advertisement?',
    a: 'Those uses require an additional large-format license.',
  },
  {
    q: 'Can I announce a new recognition immediately?',
    a: 'No. New awards may not be publicly promoted or disclosed during the embargo period before the official release date for the applicable country.',
  },
  {
    q: 'Does Best Lawyers verify compliance with bar advertising rules?',
    a: 'No. The lawyer or firm remains responsible for compliance with applicable state, provincial, national, and local legal advertising requirements.',
  },
  {
    q: 'Can I say that someone “is a Best Lawyer”?',
    a: 'No. Use language stating that the person was recognized, included, selected, named, or awarded in a specific Best Lawyers edition, country, practice area, or category.',
  },
] as const

// Footer links — replace "#" placeholders with confirmed destinations.
// Do not invent authoritative-looking internal routes that do not exist.
export const FOOTER_LINKS = [
  { label: 'Publicizing Guidelines', href: '#' }, // TODO: confirmed URL
  { label: 'Methodology', href: '#' }, // TODO: confirmed URL
  { label: 'Timeline / Embargo Dates', href: '#' }, // TODO: confirmed URL
  { label: 'Privacy', href: '#' }, // TODO: confirmed URL
  { label: 'Terms', href: '#' }, // TODO: confirmed URL
  { label: 'Contact / Sales', href: '#' }, // TODO: confirmed URL
] as const

export const INTENDED_USE_OPTIONS = [
  'Website',
  'Email',
  'Social media',
  'Marketing brochure',
  'Print advertisement',
  'Online advertisement',
  'Billboard or outdoor',
  'Television',
  'Other',
] as const

export const LAWYER_COUNT_OPTIONS = ['1', '2-5', '6-15', '16-50', '51+'] as const

export const INQUIRING_AS_OPTIONS = [
  'Individual lawyer',
  'Law firm',
  'Agency or representative',
] as const
