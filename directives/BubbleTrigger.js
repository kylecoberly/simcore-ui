export default {
  bind(element, binding, vnode) {
    let isDraggable = false

    const setProperties = (shouldBeDraggable) => {
      if (shouldBeDraggable === true || shouldBeDraggable === false) {
        isDraggable = shouldBeDraggable
      }

      if (isDraggable === true) {
        const properties = {}
        properties.position = element.getBoundingClientRect()
        properties.position.dinkY = properties.position.top + properties.position.height / 2
        properties.position.dinkX = properties.position.left + properties.position.width / 2
        properties.visibility = true

        vnode.context.$emit('call-bubble', properties, binding.value)
      }
    }

    if (element) {
      element.addEventListener('mousedown', () => {
        setProperties(true)
        if (binding.value.followMousemove === true) {
          addEventListener('mousemove', () => {
            setProperties(null)
          })
        }
      })

      addEventListener('mouseup', () => {
        setProperties(false)

        element.removeEventListener('mousedown', () => {
          setProperties(true)
        })

        if (binding.value.followMousemove === true) {
          removeEventListener('mousemove', () => {
            setProperties(null)
          })
        }
      })
    }
  },
}
