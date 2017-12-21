export default {
  bind(element, binding, vnode) {
    // let isDraggable = false
    let timeout
    let mouseWillHaveMoved = false
    const willMove = binding.value.followMousemove || false

    const emitPosition = () => {
      const bubble = {}
      bubble.position = element.getBoundingClientRect()
      bubble.position.dinkY = bubble.position.top + bubble.position.height / 2
      bubble.position.dinkX = bubble.position.left + bubble.position.width / 2

      if (binding.value.x) {
        bubble.position.x = binding.value.x
      }

      if (binding.value.y) {
        bubble.position.y = binding.value.y
      }

      vnode.context.$emit('set-bubble-position', bubble.position)
    }

    const emitData = () => {
      vnode.context.$emit('set-bubble-data', binding.value)
    }

    const mouseMove = () => {
      emitPosition()
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        emitData()
      }, 50)
    }

    const mouseDown = () => {
      emitPosition()
      emitData()
      if (willMove === true) {
        element.addEventListener('mousemove', mouseMove)
        mouseWillHaveMoved = true
      }
    }

    const mouseUp = () => {
      if (mouseWillHaveMoved) {
        emitPosition()
        emitData()
      }

      if (willMove === true) {
        element.removeEventListener('mousemove', mouseMove)
        mouseWillHaveMoved = false
      }
    }

    if (element) {
      element.addEventListener('mousedown', mouseDown)
      element.addEventListener('mouseup', mouseUp)
    }
  },
}
