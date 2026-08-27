'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from './primitives'
import {
  PRIMARY_CTA,
  INTENDED_USE_OPTIONS,
  LAWYER_COUNT_OPTIONS,
  INQUIRING_AS_OPTIONS,
} from '@/lib/content'
import { trackEmbedEvent } from '@/lib/embed'
import { cn } from '@/lib/utils'

interface FormState {
  inquiringAs: string
  fullName: string
  email: string
  phone: string
  orgName: string
  country: string
  recognition: string
  edition: string
  intendedUses: string[]
  lawyerCount: string
  details: string
  consent: boolean
}

const initialState: FormState = {
  inquiringAs: '',
  fullName: '',
  email: '',
  phone: '',
  orgName: '',
  country: '',
  recognition: '',
  edition: '',
  intendedUses: [],
  lawyerCount: '',
  details: '',
  consent: false,
}

type Errors = Partial<Record<keyof FormState, string>>

const labelCls = 'block text-sm font-medium text-bl-charcoal'
const inputCls =
  'mt-1.5 w-full rounded-md border border-bl-light-gray bg-bl-white px-3.5 py-2.5 text-sm text-bl-charcoal placeholder:text-bl-light-gray-2 focus:border-bl-gold-on-light focus:outline-none focus:ring-2 focus:ring-bl-gold-on-light/30 aria-[invalid=true]:border-bl-error'

export function LicensingInquiryForm() {
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const startedRef = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  // Campaign / UTM parameters captured from the iframe URL and sent as
  // hidden values. No PII — only marketing attribution params.
  const [campaignParams, setCampaignParams] = useState<Record<string, string>>(
    {},
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const captured: Record<string, string> = {}
    params.forEach((value, key) => {
      if (/^utm_/i.test(key) || key === 'campaign' || key === 'gclid') {
        captured[key] = value
      }
    })
    setCampaignParams(captured)
  }, [])

  // Preselect "inquiring as" when an option-specific CTA is clicked.
  useEffect(() => {
    const onPreselect = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) {
        setValues((v) => ({ ...v, inquiringAs: detail }))
      }
    }
    window.addEventListener('bl:preselect-interest', onPreselect)
    return () =>
      window.removeEventListener('bl:preselect-interest', onPreselect)
  }, [])

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEmbedEvent('form_start', { location: 'inquiry_form' })
    }
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    markStarted()
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleUse = (use: string) => {
    markStarted()
    setValues((v) => ({
      ...v,
      intendedUses: v.intendedUses.includes(use)
        ? v.intendedUses.filter((u) => u !== use)
        : [...v.intendedUses, use],
    }))
    setErrors((e) => ({ ...e, intendedUses: undefined }))
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (!values.inquiringAs) next.inquiringAs = 'Please select an option.'
    if (!values.fullName.trim()) next.fullName = 'Please enter your full name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your work email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.orgName.trim())
      next.orgName = 'Please enter the lawyer or firm name.'
    if (!values.country.trim()) next.country = 'Please enter a country.'
    if (!values.recognition.trim())
      next.recognition = 'Please enter the recognition or publication.'
    if (!values.edition.trim())
      next.edition = 'Please enter the award edition or year.'
    if (values.intendedUses.length === 0)
      next.intendedUses = 'Please select at least one intended use.'
    if (!values.lawyerCount)
      next.lawyerCount = 'Please select an approximate number.'
    if (!values.consent)
      next.consent = 'Please confirm you agree before submitting.'
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      trackEmbedEvent('form_validation_error', { location: 'inquiry_form' })
      // Move focus to the error summary for screen-reader users.
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    trackEmbedEvent('form_submit', { location: 'inquiry_form' })
    setSubmitting(true)

    // ─────────────────────────────────────────────────────────────
    // DEMO SUBMISSION HANDLER
    // Replace this block with a POST to the approved Best Lawyers form
    // endpoint. Send `values` + `campaignParams`. Only fire the
    // form_success event AFTER the request actually succeeds.
    //   const res = await fetch('/api/licensing-inquiry', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...values, ...campaignParams }),
    //   })
    //   if (!res.ok) { /* surface an error state */ return }
    // ─────────────────────────────────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 600))
    console.log('[v0] licensing inquiry (demo):', { ...values, campaignParams })

    setSubmitting(false)
    setSubmitted(true)
    trackEmbedEvent('form_success', { location: 'inquiry_form' })
    requestAnimationFrame(() => successRef.current?.focus())
  }

  return (
    <section id="inquiry" data-motion-scene="form" className="scroll-mt-8 bg-bl-off-white motion-form">
      <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-2xl motion-form-intro">
          <SectionHeading>
            Tell us how you plan to use your recognition.
          </SectionHeading>
          <p className="mt-6 text-base leading-relaxed text-bl-blue-gray">
            Share a few details about the recognition, intended channels, and
            organization. The Best Lawyers team can help identify the
            appropriate licensing path.
          </p>
        </div>

        {submitted ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="mt-10 rounded-lg border border-bl-success/30 bg-bl-white p-8 outline-none"
          >
            <CheckCircle2
              className="size-8 text-bl-success"
              aria-hidden="true"
            />
            <h3 className="mt-4 font-serif text-xl font-semibold text-bl-charcoal">
              Thank you. Your request has been received.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-bl-blue-gray">
              A member of the Best Lawyers team will follow up regarding the
              appropriate licensing path.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-10 rounded-lg border border-bl-light-gray bg-bl-white p-6 sm:p-8 motion-form-card"
          >
            {/* Error summary (assistive) */}
            {Object.keys(errors).length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                className="mb-6 rounded-md border border-bl-error/40 bg-bl-error/5 p-4 text-sm text-bl-error outline-none"
              >
                Please review the highlighted fields and try again.
              </div>
            )}

            <div className="grid gap-6">
              {/* Inquiring as */}
              <fieldset>
                <legend className={labelCls}>I am inquiring as</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INQUIRING_AS_OPTIONS.map((opt) => {
                    const active = values.inquiringAs === opt
                    return (
                      <label
                        key={opt}
                        className={cn(
                          'cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors',
                          active
                            ? 'border-bl-gold-on-light bg-bl-gold/15 text-bl-charcoal'
                            : 'border-bl-light-gray text-bl-blue-gray hover:border-bl-medium-gray-2',
                        )}
                      >
                        <input
                          type="radio"
                          name="inquiringAs"
                          value={opt}
                          checked={active}
                          onChange={() => update('inquiringAs', opt)}
                          className="sr-only"
                        />
                        {opt}
                      </label>
                    )
                  })}
                </div>
                {errors.inquiringAs && (
                  <FieldError id="err-inquiringAs" message={errors.inquiringAs} />
                )}
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="fullName"
                  label="Full name"
                  value={values.fullName}
                  onChange={(v) => update('fullName', v)}
                  error={errors.fullName}
                  autoComplete="name"
                  required
                />
                <Field
                  id="email"
                  label="Work email"
                  type="email"
                  value={values.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="phone"
                  label="Phone number"
                  optional
                  type="tel"
                  value={values.phone}
                  onChange={(v) => update('phone', v)}
                  autoComplete="tel"
                />
                <Field
                  id="orgName"
                  label="Lawyer or firm name"
                  value={values.orgName}
                  onChange={(v) => update('orgName', v)}
                  error={errors.orgName}
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="country"
                  label="Country"
                  value={values.country}
                  onChange={(v) => update('country', v)}
                  error={errors.country}
                  autoComplete="country-name"
                  required
                />
                <Field
                  id="recognition"
                  label="Recognition or publication"
                  value={values.recognition}
                  onChange={(v) => update('recognition', v)}
                  error={errors.recognition}
                  required
                />
              </div>

              <Field
                id="edition"
                label="Award edition or year"
                value={values.edition}
                onChange={(v) => update('edition', v)}
                error={errors.edition}
                required
              />

              {/* Intended uses (multi-select) */}
              <fieldset>
                <legend className={labelCls}>Intended uses</legend>
                <div
                  role="group"
                  aria-describedby={
                    errors.intendedUses ? 'err-intendedUses' : undefined
                  }
                  className="mt-2 grid gap-2 sm:grid-cols-2"
                >
                  {INTENDED_USE_OPTIONS.map((use) => {
                    const active = values.intendedUses.includes(use)
                    return (
                      <label
                        key={use}
                        className={cn(
                          'flex cursor-pointer items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-sm transition-colors',
                          active
                            ? 'border-bl-gold-on-light bg-bl-gold/10 text-bl-charcoal'
                            : 'border-bl-light-gray text-bl-blue-gray hover:border-bl-medium-gray-2',
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleUse(use)}
                          className="size-4 accent-bl-coral"
                        />
                        {use}
                      </label>
                    )
                  })}
                </div>
                {errors.intendedUses && (
                  <FieldError
                    id="err-intendedUses"
                    message={errors.intendedUses}
                  />
                )}
              </fieldset>

              {/* Lawyer count */}
              <div>
                <label htmlFor="lawyerCount" className={labelCls}>
                  Approximate number of recognized lawyers involved
                </label>
                <select
                  id="lawyerCount"
                  value={values.lawyerCount}
                  onChange={(e) => update('lawyerCount', e.target.value)}
                  aria-invalid={!!errors.lawyerCount}
                  aria-describedby={
                    errors.lawyerCount ? 'err-lawyerCount' : undefined
                  }
                  className={inputCls}
                >
                  <option value="">Select an option</option>
                  {LAWYER_COUNT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.lawyerCount && (
                  <FieldError
                    id="err-lawyerCount"
                    message={errors.lawyerCount}
                  />
                )}
              </div>

              {/* Additional details */}
              <div>
                <label htmlFor="details" className={labelCls}>
                  Additional details{' '}
                  <span className="font-normal text-bl-medium-gray-2">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="details"
                  rows={4}
                  value={values.details}
                  onChange={(e) => update('details', e.target.value)}
                  className={cn(inputCls, 'resize-y')}
                />
              </div>

              {/* Consent */}
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'err-consent' : undefined}
                    className="mt-0.5 size-4 accent-bl-coral"
                  />
                  <span className="text-sm leading-relaxed text-bl-blue-gray">
                    I agree that Best Lawyers may use the details I provide to
                    respond to this licensing inquiry.
                  </span>
                </label>
                {errors.consent && (
                  <FieldError id="err-consent" message={errors.consent} />
                )}
              </div>

              {/* Hidden campaign params */}
              {Object.entries(campaignParams).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-bl-gold px-6 py-3.5 text-sm font-medium tracking-wide text-bl-charcoal transition-colors hover:bg-bl-gold-on-light hover:text-bl-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? 'Sending…' : PRIMARY_CTA}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-bl-medium-gray-1">
                  Official assets for eligible recognized lawyers and firms.
                  Licensing scope depends on intended use. No fees are accepted
                  for consideration or inclusion.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-bl-error">
      {message}
    </p>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  required,
  optional,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}{' '}
        {optional && (
          <span className="font-normal text-bl-medium-gray-2">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `err-${id}` : undefined}
        className={inputCls}
      />
      {error && <FieldError id={`err-${id}`} message={error} />}
    </div>
  )
}
