export const lodestar = (element, classname, selector, test) => {
  const items = element.querySelectorAll(selector)
  let flag = false

  items.forEach((item) => {
    const node = item // .parentNode

    if (!item[test]) {
      flag = true
      node.classList.add(classname);
      node.addEventListener('animationend', () => {
        node.classList.remove(classname)
      }, false)
    }
  })

  return flag
}
