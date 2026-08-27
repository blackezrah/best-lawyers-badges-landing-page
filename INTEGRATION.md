# Instapage Embed Integration Guide

This Next.js project renders the **Best Lawyers badge and logo licensing**
landing page. It is deployed to Vercel at its own HTTPS URL and embedded inside
an Instapage campaign page through an `<iframe>`.

- **Embed route (child document):** `/embed/badge-logo-licensing`
- **Standalone/QA route:** `/` (same experience, without the height reporter)
- The Instapage published page owns the public URL, SEO, and canonical.
- The Vercel embed route is `noindex, nofollow`.

Replace every `YOUR-VERCEL-EMBED-DOMAIN.vercel.app` placeholder below with your
real Vercel deployment domain. **Do not** hard-code an invented production
domain.

---

## 1. Environment variables (Vercel project settings)

| Variable | Purpose | Example |
| --- | --- | --- |
| `ALLOWED_FRAME_ANCESTORS` | Space-separated CSP `frame-ancestors` allowlist. Controls which parent origins may embed the page. Set in `next.config.mjs`. | `https://pages.instapage.com https://your-custom-domain.com` |
| `NEXT_PUBLIC_PARENT_TARGET_ORIGIN` | The exact origin `postMessage` targets. Height + analytics messages are only delivered to this origin. | `https://pages.instapage.com` |

> Until these are set, the code uses permissive development fallbacks
> (`'self' https://pages.instapage.com` and `*`). **Set both before production.**

---

## 2. Iframe markup to paste into Instapage (HTML/embed block)

```html
<iframe
  id="best-lawyers-embed"
  src="https://YOUR-VERCEL-EMBED-DOMAIN.vercel.app/embed/badge-logo-licensing"
  title="Best Lawyers badge and logo licensing"
  style="width:100%; display:block; border:0; overflow:hidden;"
  scrolling="no"
  height="1600"
  loading="lazy"
></iframe>
```

- `height="1600"` is only an initial fallback before the first height message
  arrives. The parent script below takes over.
- Keep `width:100%`, `display:block`, `border:0`, and no internal scrolling.
- Set an accessible `title` (already provided).

---

## 3. Parent-side message listener (paste in Instapage `<head>` or a script block)

Handles **both** the auto-height messages and the analytics events. Update
`ALLOWED_ORIGIN` to your exact Vercel deployment origin.

```html
<script>
  (function () {
    // The EXACT origin of the Vercel embed (scheme + host, no trailing slash).
    var ALLOWED_ORIGIN = "https://YOUR-VERCEL-EMBED-DOMAIN.vercel.app";
    var iframe = document.getElementById("best-lawyers-embed");

    window.addEventListener("message", function (event) {
      // 1) Only accept messages from the approved embed origin.
      if (event.origin !== ALLOWED_ORIGIN) return;

      var data = event.data;
      if (!data || typeof data !== "object") return;

      // 2) Auto-height contract.
      if (data.type === "BEST_LAWYERS_IFRAME_HEIGHT") {
        var h = data.height;
        // Reject invalid / missing / negative / unreasonable heights.
        if (typeof h !== "number" || !isFinite(h) || h < 200 || h > 40000) return;
        if (iframe) iframe.style.height = Math.ceil(h) + "px";
        return;
      }

      // 3) Privacy-safe analytics contract -> dataLayer.
      if (data.type === "BEST_LAWYERS_EMBED_EVENT") {
        var allowed = [
          "cta_click",
          "form_start",
          "form_validation_error",
          "form_submit",
          "form_success",
        ];
        if (allowed.indexOf(data.eventName) === -1) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "best_lawyers_embed",
          embed_event_name: data.eventName,
          embed_location: (data.eventData && data.eventData.location) || undefined,
          embed_option: (data.eventData && data.eventData.option) || undefined,
        });
        return;
      }
    });
  })();
</script>
```

---

## 4. Message contracts (reference)

**Height (child → parent):**

```json
{ "type": "BEST_LAWYERS_IFRAME_HEIGHT", "height": 1234 }
```

**Analytics (child → parent):** never contains PII.

```json
{
  "type": "BEST_LAWYERS_EMBED_EVENT",
  "eventName": "cta_click | form_start | form_validation_error | form_submit | form_success",
  "eventData": { "location": "hero", "option": "Law firm" }
}
```

---

## 5. Passing campaign / UTM parameters into the iframe

The child form automatically captures `utm_*`, `campaign`, and `gclid` from its
own URL query string and stores them as hidden values. To forward the parent
page's query string to the iframe **without duplicating parameters**, add this
to Instapage:

```html
<script>
  (function () {
    var iframe = document.getElementById("best-lawyers-embed");
    if (!iframe) return;
    var parentParams = new URLSearchParams(window.location.search);
    if (![...parentParams].length) return;

    var url = new URL(iframe.src);
    parentParams.forEach(function (value, key) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    });
    iframe.src = url.toString();
  })();
</script>
```

---

## 6. Framing security

Configured in `next.config.mjs` for the `/embed/*` route:

- Sends `Content-Security-Policy: frame-ancestors <ALLOWED_FRAME_ANCESTORS>;`
- **Does not** send `X-Frame-Options: DENY` or `SAMEORIGIN`.
- **No** permissive wildcard in production — set `ALLOWED_FRAME_ANCESTORS`.

To allow a new parent domain, add it (space-separated) to
`ALLOWED_FRAME_ANCESTORS` and redeploy.

---

## 7. SEO & canonical

- The embed route is `noindex, nofollow` (metadata + `X-Robots-Tag` header).
- **Do not** set the Vercel embed URL as the public campaign canonical.
- Configure the following on the **Instapage parent page**:
  - Page title & meta description
  - Open Graph / social metadata
  - **Canonical URL** (the public campaign URL)
  - Campaign-level analytics / tracking

---

## 8. Analytics wiring

1. Ensure the parent listener (section 3) is installed.
2. Confirm `window.dataLayer` pushes appear in your tag manager on:
   `cta_click`, `form_start`, `form_validation_error`, `form_submit`,
   `form_success`.
3. `form_success` fires **only** after a successful submission.
4. No names, emails, phone numbers, or free-text content are ever transmitted.

> Connect the real form endpoint in
> `components/landing/licensing-inquiry-form.tsx` (see the `DEMO SUBMISSION
> HANDLER` comment). Keep `form_success` after the successful response only.

---

## 9. Testing checklist

Test at **Instapage desktop**, **tablet**, and **mobile** widths (down to
**320px**), on **Safari (macOS/iOS)**, **Chrome**, and **Firefox**:

- [ ] No nested/second scrollbar inside the iframe.
- [ ] No horizontal overflow at any width.
- [ ] Iframe height matches child content on first paint.
- [ ] Height recalculates after **fonts load** (Optima/Gentleman).
- [ ] Height recalculates when an **FAQ accordion** expands/collapses.
- [ ] Height recalculates on **form validation errors** (long messages included).
- [ ] Height recalculates on the **form success** state.
- [ ] Keyboard focus outlines are never clipped.
- [ ] Browser zoom (up to 200%) does not break layout.
- [ ] `prefers-reduced-motion` disables entrance/scroll animation.
- [ ] Works on parent pages **with and without** query parameters.
- [ ] Option CTAs preselect the matching "I am inquiring as" value.

---

## 10. Troubleshooting

| Symptom | Fix |
| --- | --- |
| **Nested scrollbar** | Ensure `scrolling="no"` and `overflow:hidden` on the iframe, and that the parent listener updates `height` in px. |
| **Blocked framing / blank frame** | Add the parent origin to `ALLOWED_FRAME_ANCESTORS` and redeploy. Confirm no `X-Frame-Options` header is being added by a proxy/CDN. |
| **Height wrong / too short** | Verify `event.origin === ALLOWED_ORIGIN` in the parent script and that `NEXT_PUBLIC_PARENT_TARGET_ORIGIN` matches the Instapage origin. |
| **Height jumps after load** | Expected once when fonts settle; the reporter re-measures on `document.fonts.ready`. |
| **Missing fonts** | Add licensed `Optima`/`Gentleman` WOFF2 files to `/public/fonts` and uncomment the `@font-face` blocks in `app/globals.css`. |
| **Analytics not firing** | Confirm the parent listener is installed and `NEXT_PUBLIC_PARENT_TARGET_ORIGIN` is set (not `*`) in production. |
