/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
const docReady = (fn: any): void => {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    setTimeout(fn, 1)
  }
}

const resize = (fn: any): void => window.addEventListener('resize', fn)

const isIterableArray = (array: any): boolean => Array.isArray(array) && !!array.length

const camelize = (str: string): string => {
  const text = str.replace(/[-_\s.]+(.)?/g, (match: any, capture: any) => {
    if (capture) {
      return capture.toUpperCase()
    }
    return ''
  })
  return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`
}

const getData = (el: any, data: string): {} => {
  try {
    return JSON.parse(String(el.dataset[camelize(data)]))
  } catch (e) {
    return el.dataset[camelize(data)]
  }
}

/* ----------------------------- Colors function ---------------------------- */

const hexToRgb = (hexValue: string): number[] | null => {
  let hex: string
  hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue)
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(
      shorthandRegex,
      (m: string, r: string, g: string, b: string) => r + r + g + g + b + b
    )
  )
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

const rgbaColor = (color: string = '#fff', alpha: number = 0.5): string =>
  `rgba(${hexToRgb(color)}, ${alpha})`

/* --------------------------------- Colors --------------------------------- */

const getColor = (name: any, dom = document.documentElement): string =>
  getComputedStyle(dom).getPropertyValue(`--falcon-${name}`).trim()

const getColors = (dom: HTMLElement): object => ({
  primary: getColor('primary', dom),
  secondary: getColor('secondary', dom),
  success: getColor('success', dom),
  info: getColor('info', dom),
  warning: getColor('warning', dom),
  danger: getColor('danger', dom),
  light: getColor('light', dom),
  dark: getColor('dark', dom),
  white: getColor('white', dom),
  black: getColor('black', dom),
  emphasis: getColor('emphasis-color', dom)
})

const getSubtleColors = (dom: any): object => ({
  primary: getColor('primary-bg-subtle', dom),
  secondary: getColor('secondary-bg-subtle', dom),
  success: getColor('success-bg-subtle', dom),
  info: getColor('info-bg-subtle', dom),
  warning: getColor('warning-bg-subtle', dom),
  danger: getColor('danger-bg-subtle', dom),
  light: getColor('light-bg-subtle', dom),
  dark: getColor('dark-bg-subtle', dom)
})

const getGrays = (dom: HTMLElement): object => ({
  100: getColor('gray-100', dom),
  200: getColor('gray-200', dom),
  300: getColor('gray-300', dom),
  400: getColor('gray-400', dom),
  500: getColor('gray-500', dom),
  600: getColor('gray-600', dom),
  700: getColor('gray-700', dom),
  800: getColor('gray-800', dom),
  900: getColor('gray-900', dom),
  1000: getColor('gray-1000', dom),
  1100: getColor('gray-1100', dom)
})

const hasClass = (el: HTMLElement, className: string): boolean => {
  !el && false
  return el.classList.value.includes(className)
}

const addClass = (el: HTMLElement, className: string): void => {
  el.classList.add(className)
}

const removeClass = (el: HTMLElement, className: string): void => {
  el.classList.remove(className)
}

const getOffset = (el: HTMLElement): { top: number; left: number } => {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function isScrolledIntoView(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

  return vertInView && horInView
}

const breakpoints: object = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
}

const getBreakpoint = (el: HTMLElement): number | undefined => {
  const classes: string = el && el.classList.value
  if (classes) {
    let classesList: string[] = classes.split(' ')
    classesList = classesList.filter((cls: any) => cls.includes('navbar-expand-'))
    let classPop: string | any = classesList.pop()
    classesList = classPop.split('-')
    classPop = classesList.pop()
    return breakpoints[classPop as keyof object]
    // breakpoint =
    //   breakpoints[
    //     classes
    //       .split(' ')
    //       .filter((cls) => cls.includes('navbar-expand-'))
    //       .pop()
    //       .split('-')
    //       .pop()
    //   ]
  }
  return undefined
}

const getSystemTheme = (): string =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const isDark = (): string | null => {
  const theme = localStorage.getItem('theme')
  return theme === 'auto' ? getSystemTheme() : theme
}
/* --------------------------------- Cookie --------------------------------- */

const setCookie = (name: string, value: string, expire: number): void => {
  const expires = new Date()
  expires.setTime(expires.getTime() + expire)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`
}

const getCookie = (name: string) => {
  const keyValue: RegExpMatchArray | null = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return keyValue ? keyValue[2] : keyValue
}

const settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
}

/* -------------------------- Chart Initialization -------------------------- */

// const newChart = (chart: any, config: any) => {
//   const ctx = chart.getContext('2d')
//   return new window.Chart(ctx, config)
// }

/* ---------------------------------- Store --------------------------------- */

const getItemFromStore = (key: string, defaultValue = undefined, store: Storage = localStorage) => {
  try {
    return JSON.parse(String(store.getItem(key))) || defaultValue
  } catch {
    return store.getItem(key) || defaultValue
  }
}

const setItemToStore = (key: string, payload: string, store = localStorage): void =>
  store.setItem(key, payload)
const getStoreSpace = (store = localStorage) =>
  parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2))

/* get Dates between */

const getDates = (startDate: Date, endDate: Date, interval = 1000 * 60 * 60 * 24): Date[] => {
  const duration: number = endDate.getTime() - startDate.getTime()
  const steps = duration / interval
  return Array.from({ length: steps + 1 }, (v, i) => new Date(startDate.valueOf() + interval * i))
}

const getPastDates = (duration: string | number): Date[] => {
  let days: number

  switch (duration) {
    case 'week':
      days = 7
      break
    case 'month':
      days = 30
      break
    case 'year':
      days = 365
      break

    default:
      days = typeof duration == 'string' ? 0 : duration
  }

  const date = new Date()
  const endDate = date
  const startDate = new Date(new Date().setDate(date.getDate() - (days - 1)))
  return getDates(startDate, endDate)
}

/* Get Random Number */
const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min)

export {
  docReady,
  breakpoints,
  resize,
  isIterableArray,
  camelize,
  getData,
  hasClass,
  addClass,
  hexToRgb,
  rgbaColor,
  getColor,
  getColors,
  getSubtleColors,
  getGrays,
  getOffset,
  isScrolledIntoView,
  getBreakpoint,
  setCookie,
  getCookie,
  // newChart,
  settings,
  getItemFromStore,
  setItemToStore,
  getStoreSpace,
  getDates,
  getPastDates,
  getRandomNumber,
  removeClass,
  getSystemTheme,
  isDark
}
