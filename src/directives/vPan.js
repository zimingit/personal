import Vue from 'vue'
export default Vue.directive('pan', {
  isLiteral: true,
  inserted (el, binding) {
    const stopline = binding.value.stopline || -100
    const cantPan = (evt) => (evt.path || []).some(n => n.tagName === 'PRE')
    const touchStartHandler = (e) => {
      if (cantPan(e)) return
      el.dataset.xStart = e.changedTouches[0].clientX
      el.dataset.transform = el.dataset.transform || 0
    }
    const touchMoveHandler = (e) => {
      if (cantPan(e)) return
      const path = parseInt(el.dataset.xStart) - e.changedTouches[0].clientX
      const transform = parseInt(el.dataset.transform) - path
      if (transform <= 0) {
        requestAnimationFrame(() => {
          el.style.transform = `translateX(${parseInt(transform)}px)`
        })
      }
    }
    const touchEndHandler = (e) => {
      if (cantPan(e)) return
      const path = parseInt(el.dataset.xStart) - e.changedTouches[0].clientX
      const transform = parseInt(el.dataset.transform)
      if (parseInt(transform - path) < stopline) {
        el.style.transition = 'transform .3s ease-in-out'
        requestAnimationFrame(() => {
          el.style.transform = `translateX(${stopline}px)`
          el.dataset.transform = stopline
          el.classList.add('pinned')
          clrTrans(el, 300)
        })
      } else {
        el.style.transition = 'transform .1s ease-in-out'
        requestAnimationFrame(() => {
          el.style.transform = 'translateX(0)'
          el.dataset.transform = 0
          el.classList.remove('pinned')
          clrTrans(el, 100)
        })
      }
    }
    const clrTrans = (el, duration) => setTimeout(() => { el.style.transition = 'transform 0s ease-in-out' }, duration)
    el.addEventListener('touchstart', touchStartHandler)
    el.addEventListener('touchmove', touchMoveHandler)
    el.addEventListener('touchend', touchEndHandler)
    el.$destroy = () => {
      el.removeEventListener('touchstart', touchStartHandler)
      el.removeEventListener('touchmove', touchMoveHandler)
      el.removeEventListener('touchend', touchEndHandler)
    }
  },
  unbind (el) {
    el.$destroy()
  }
})
