/* -------------------------------------------------------------------------- */
/*                              Config                                        */
/* -------------------------------------------------------------------------- */
const CONFIG: any = {
  isNavbarVerticalCollapsed: false,
  theme: 'light',
  isRTL: false,
  isFluid: true,
  navbarStyle: 'transparent',
  //   navbarStyle: 'card',
  navbarPosition: 'vertical'
}

Object.keys(CONFIG).forEach((key) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, CONFIG[key])
  }
})

if (JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed') as string)) {
  document.documentElement.classList.add('navbar-vertical-collapsed')
}

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
} else if (localStorage.getItem('theme') === 'auto') {
  document.documentElement.setAttribute(
    'data-bs-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
}

export default CONFIG
