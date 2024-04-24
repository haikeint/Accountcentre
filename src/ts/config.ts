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

const theme: string | null = localStorage.getItem('theme')
const isNavbarVerticalCollapsed: string | null = localStorage.getItem('isNavbarVerticalCollapsed')

Object.keys(CONFIG).forEach((key) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, CONFIG[key])
  }
})

if (isNavbarVerticalCollapsed && JSON.parse(isNavbarVerticalCollapsed)) {
  document.documentElement.classList.add('navbar-vertical-collapsed')
}

if (theme === 'dark') {
  document.documentElement.setAttribute('data-bs-theme', 'dark')
} else if (theme === 'auto') {
  document.documentElement.setAttribute(
    'data-bs-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
}

export default CONFIG
