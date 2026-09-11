const allowedProtocols = new Set(['http', 'https', 'mailto', 'tel', 'ftp'])

export function sanitizeUrl(value: string): string {
  // Browsers ignore ASCII whitespace/control characters when interpreting schemes.
  // eslint-disable-next-line no-control-regex -- Control characters are deliberately removed for protocol validation.
  const normalized = value.replace(/[\u0000-\u0020\u007f-\u009f]/g, '')
  const protocol = /^([a-z][a-z\d+.-]*):/i.exec(normalized)
  return protocol && !allowedProtocols.has(protocol[1].toLowerCase()) ? '' : value
}
