export default {
  bind(element, binding, vnode) {
    let mouseHasMoved = false
    const mouseWillMove = binding.value.followMousemove || false

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
      emitData()
    }

    const mouseUp = () => {
      if (mouseHasMoved) {
        emitPosition()
        emitData()
      }

      if (mouseWillMove === true) {
        document.removeEventListener('mousemove', mouseMove)
        mouseHasMoved = false
      }

      document.removeEventListener('mouseup', mouseUp)
    }

    element.addEventListener('mousedown', () => {
      if (mouseWillMove === true) {
        document.addEventListener('mousemove', mouseMove)
        mouseHasMoved = true
      }

      document.addEventListener('mouseup', mouseUp)
    })
  },
}
