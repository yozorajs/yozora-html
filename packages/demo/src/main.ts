const root = document.querySelector<HTMLElement>('.yozora-markdown')!
const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle')!
const widthButton = document.querySelector<HTMLButtonElement>('#width-toggle')!
const utilitiesButton = document.querySelector<HTMLButtonElement>('#utilities-toggle')!
const mode = document.body.dataset.mode
const utilityClasses = ['[&_h2]:text-xl', '[&_a]:underline', '[&_blockquote]:border-0']

function updatePreview(): void {
  const url = new URL(window.location.href)
  const state = {
    dark: url.searchParams.get('theme') === 'dark',
    narrow: url.searchParams.get('width') === 'narrow',
    utilities: url.searchParams.get('utilities') === 'on',
  }
  document.documentElement.classList.toggle('dark', state.dark)
  document.body.classList.toggle('demo-narrow', state.narrow)
  themeButton.setAttribute('aria-pressed', String(state.dark))
  widthButton.setAttribute('aria-pressed', String(state.narrow))
  utilitiesButton.setAttribute('aria-pressed', String(state.utilities))
  for (const className of utilityClasses) {
    root.classList.toggle(className, mode === 'tailwind' && state.utilities)
  }
  document.querySelector('#root-classes')!.textContent = root.className

  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-mode-link]')) {
    link.search = url.search
    if (link.dataset.modeLink === mode) link.setAttribute('aria-current', 'page')
  }
}

function toggleSetting(
  name: 'theme' | 'width' | 'utilities',
  enabledValue: string,
  disabledValue: string,
): void {
  const url = new URL(window.location.href)
  const enabled = url.searchParams.get(name) === enabledValue
  url.searchParams.set(name, enabled ? disabledValue : enabledValue)
  window.history.replaceState(window.history.state, '', url)
  updatePreview()
}

if (mode === 'standalone') {
  document.querySelector('#mode-label')!.textContent = 'Standalone CSS'
  document.querySelector('#mode-description')!.textContent =
    '独立加载默认样式，不含 Tailwind 或 Preflight。深色主题由此 demo 的 CSS variables 配置。'
}

themeButton.addEventListener('click', () => {
  toggleSetting('theme', 'dark', 'light')
})
widthButton.addEventListener('click', () => {
  toggleSetting('width', 'narrow', 'wide')
})
utilitiesButton.addEventListener('click', () => {
  toggleSetting('utilities', 'on', 'off')
})
window.addEventListener('popstate', updatePreview)
updatePreview()

export {}
