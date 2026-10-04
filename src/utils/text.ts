/** Shortens text to at most `max` characters at a word boundary, for meta descriptions. */
export function summarize(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s—-]+$/, '')}…`;
}
