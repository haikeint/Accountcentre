import { setItemToStore, getData, getItemFromStore, getSystemTheme } from './utils'
import DomNode from './node'
import CONFIG from './config'

/* -------------------------------------------------------------------------- */
/*                                Theme Control                               */
/* -------------------------------------------------------------------------- */
const initialDomSetup = (element: Element) => {
  if (!element) return
  handleThemeDropdownIcon(String(getItemFromStore('theme')))
  const dataUrlDom = element.querySelector('[data-theme-control = "navbarPosition"]') as HTMLElement
  const hasDataUrl = dataUrlDom ? getData(dataUrlDom, 'page-url') : null

  element.querySelectorAll('[data-theme-control]').forEach((el) => {
    const inputDataAttributeValue = getData(el as HTMLElement, 'theme-control')
    const localStorageValue = getItemFromStore(String(inputDataAttributeValue))
    const htmlInputEl = el as HTMLInputElement
    if (
      inputDataAttributeValue === 'navbarStyle' &&
      !hasDataUrl &&
      (getItemFromStore('navbarPosition') === 'top' ||
        getItemFromStore('navbarPosition') === 'double-top')
    ) {
      el.setAttribute('disabled', String(true))
    }

    if (htmlInputEl.type === 'select-one' && inputDataAttributeValue === 'navbarPosition') {
      htmlInputEl.value = String(localStorageValue)
    }
    if (htmlInputEl.type === 'checkbox') {
      if (inputDataAttributeValue === 'theme') {
        if (
          localStorageValue === 'auto' ? getSystemTheme() === 'dark' : localStorageValue === 'dark'
        ) {
          htmlInputEl.setAttribute('checked', 'true')
        }
      } else {
        localStorageValue && htmlInputEl.setAttribute('checked', 'true')
      }
    } else if (htmlInputEl.type === 'radio') {
      const isChecked = localStorageValue === htmlInputEl.value
      isChecked && htmlInputEl.setAttribute('checked', 'true')
    } else {
      const isActive = localStorageValue === htmlInputEl.value
      isActive && htmlInputEl.classList.add('active')
    }
  })
}

const changeTheme = (element: Element) => {
  element.querySelectorAll('[data-theme-control = "theme"]').forEach((el) => {
    const inputDataAttributeValue = getData(el as HTMLElement, 'theme-control')
    const localStorageValue = getItemFromStore(String(inputDataAttributeValue))
    const hhtmlInputEl = el as HTMLInputElement

    if (hhtmlInputEl.type === 'checkbox') {
      if (localStorageValue === 'auto') {
        getSystemTheme() === 'dark' ? (hhtmlInputEl.checked = true) : (hhtmlInputEl.checked = false)
      } else {
        localStorageValue === 'dark'
          ? (hhtmlInputEl.checked = true)
          : (hhtmlInputEl.checked = false)
      }
    } else if (hhtmlInputEl.type === 'radio') {
      localStorageValue === hhtmlInputEl.value
        ? (hhtmlInputEl.checked = true)
        : (hhtmlInputEl.checked = false)
    } else {
      localStorageValue === hhtmlInputEl.value
        ? hhtmlInputEl.classList.add('active')
        : hhtmlInputEl.classList.remove('active')
    }
  })
}

const handleThemeDropdownIcon = (value: string) => {
  document.querySelectorAll('[data-theme-dropdown-toggle-icon]').forEach((el: Element) => {
    el.classList.toggle(
      'd-none',
      value !== getData(el as HTMLElement, 'theme-dropdown-toggle-icon')
    )
  })
}

const themeControl = () => {
  const themeController = new DomNode(document.body as HTMLInputElement)

  const navbarVertical = document.querySelector('.navbar-vertical')
  initialDomSetup(themeController.node)

  themeController.on('click', (e: MouseEvent) => {
    const target = new DomNode(e.target as HTMLInputElement)
    const eventTarget: HTMLInputElement = e.target as HTMLInputElement

    if (target.data('theme-control')) {
      const control = target.data('theme-control')
      let value = eventTarget[eventTarget.type === 'checkbox' ? 'checked' : 'value'] as string

      if (control === 'theme') {
        typeof value === 'boolean' && (value = value ? 'dark' : 'light')
      }
      if (control !== 'navbarPosition') {
        Object.prototype.hasOwnProperty.call(CONFIG, control) && setItemToStore(control, value)
        switch (control) {
          case 'theme': {
            document.documentElement.setAttribute(
              'data-bs-theme',
              value === 'auto' ? getSystemTheme() : value.toString()
            )
            const clickControl = new CustomEvent('clickControl', {
              detail: { control, value }
            })
            if (e.currentTarget) e.currentTarget.dispatchEvent(clickControl)
            changeTheme(themeController.node)
            break
          }
          case 'navbarStyle': {
            navbarVertical?.classList.remove('navbar-card')
            navbarVertical?.classList.remove('navbar-inverted')
            navbarVertical?.classList.remove('navbar-vibrant')
            if (value !== 'transparent') {
              navbarVertical?.classList.add(`navbar-${value}`)
            }
            break
          }
          case 'reset': {
            Object.keys(CONFIG).forEach((key) => {
              localStorage.setItem(key, CONFIG[key])
            })
            window.location.reload()
            break
          }
          default:
            window.location.reload()
        }
      }
    }
  })

  // control navbar position
  themeController.on('change', (e: any) => {
    const target = new DomNode(e.target)

    if (target.data('theme-control') === 'navbarPosition') {
      Object.prototype.hasOwnProperty.call(CONFIG, 'navbarPosition') &&
        setItemToStore('navbarPosition', e.target.value)
      // const pageUrl = getData(target.node.selectedOptions[0], 'page-url')
      const pageUrl = getData(target.node.value, 'page-url')
      pageUrl
        ? window.location.replace(pageUrl)
        : window.location.replace(window.location.href.split('#')[0])
    }
  })

  themeController.on('clickControl', ({ detail: { control, value } }: { detail: any }) => {
    if (control === 'theme') {
      handleThemeDropdownIcon(value)
    }
  })
}

export default themeControl
