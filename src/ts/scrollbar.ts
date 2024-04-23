/* -------------------------------------------------------------------------- */
/*                                 Scrollbars                                 */
/* -------------------------------------------------------------------------- */
import SimpleBar from 'simplebar'

const scrollbarInit = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('.scrollbar-overlay'),
    (el) => new SimpleBar(el, { autoHide: true })
  )
}

export default scrollbarInit
