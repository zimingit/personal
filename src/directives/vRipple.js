const styles = {
  'background': 'white',
  'position': 'absolute',
  'pointer-events': 'none',
  'border-radius': '50%',
  'animation': 'ripple .7s linear infinite',
  'transform': 'translate(-50%, -50%)'
}

const anim = '@keyframes ripple{0%{width:0;height:0;opacity:.5;}100%{width:600px;height:600px;opacity:0;}}'

const ripple = {
  bind (el) {
    if (!document.getElementById('ripple-effect-style')) {
      const rippleStyle = document.createElement('style')
      rippleStyle.innerHTML = anim
      rippleStyle.id = 'ripple-effect-style'
      document.head.appendChild(rippleStyle)
    }
    el.style.overflow = 'hidden'
    el.style.position = 'relative'
    const handler = (e) => {
      const x = e.clientX - e.target.offsetLeft
      const y = e.clientY - e.target.offsetTop
      const ripple = document.createElement('span')
      Object.assign(ripple.style, {
        ...styles,
        top: `${y}px`,
        left: `${x}px`
      })
      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    }
    el.addEventListener('mousedown', handler)
    el.$removeEventListener = () => {
      el.removeEventListener('mousedown', handler)
    }
  },
  unbind (el) {
    el.$removeEventListener()
  }
}

export default {
  install (Vue) {
    Vue.directive('ripple', ripple)
  }
}