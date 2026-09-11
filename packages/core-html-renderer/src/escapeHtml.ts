export function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll('"', '&quot;')
}
