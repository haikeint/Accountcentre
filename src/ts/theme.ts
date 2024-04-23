import { docReady } from './utils'
import tooltipInit from './tooltip'
import handleNavbarVerticalCollapsed from './navbar-vertical'
import scrollbarInit from './scrollbar'
import searchInit from './search'
import themeControl from './theme-control'

const Init = () => {
  docReady(tooltipInit)
  docReady(handleNavbarVerticalCollapsed)
  docReady(scrollbarInit)
  docReady(searchInit)
  docReady(themeControl)
}
export default Init
