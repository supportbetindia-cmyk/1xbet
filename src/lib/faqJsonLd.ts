/**
 * Builds FAQPage structured data from the same [question, answer] array a page
 * feeds its accordion. Google only honours FAQPage markup whose Q&A is visibly
 * on the page, so deriving it from the rendered list — instead of pasting a
 * second literal — is what keeps the two from drifting apart.
 *
 * Returns a ready-to-embed string with every `<` escaped to its unicode
 * form, per the Next JSON-LD guide — that escape is what makes the result
 * safe for dangerouslySetInnerHTML.
 */
export function faqJsonLd(faqs: readonly (readonly [string, string])[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([name, text]) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text },
    })),
  }).replace(/</g, '\\u003c');
}
