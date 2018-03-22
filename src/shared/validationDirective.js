function getValidationObject (el, binding) {
  let validationClass = null
  let icon = null

  const modifiers = Object.keys(binding.modifiers)

  if (modifiers.length) {
    validationClass = modifiers.find(m => m.indexOf('icon-') === -1)
    icon = modifiers.find(m => m.indexOf('icon-') > -1)
    if (icon) icon = icon.replace('icon-', '')
  }

  // default validationClass
  if (!validationClass) validationClass = 'error'

  if (!icon) {
    // default icon
    switch (validationClass) {
      case 'error':
        icon = 'clear'
        break
      case 'success':
        icon = 'done'
        break
      case 'info':
        icon = 'info_outline'
        break
      case 'warning':
        icon = 'warning'
        break
    }
  }

  return {
    validation: validationClass,
    class: `has-${validationClass}`,
    icon
  }
}

function validate (el, binding, anotherValidationDirectives) {
  const validation = getValidationObject(el, binding)
  const iconContainer = el.querySelector(`.form-control-feedback.${validation.icon}`)
  const otherIcons = el.querySelectorAll('.form-control-feedback')
  const notValidationIcons = el.querySelectorAll('.form-control-feedback:not(.validation)')
  const messageContainer = el.querySelector('.help-block')

  if (binding.value) {
    if (el.className.indexOf(validation.class) === -1) {
      el.classList.add(validation.class)
    }
    if (otherIcons.length) otherIcons.forEach(i => { i.style.display = 'none' })
    iconContainer.style.display = 'block'
    messageContainer.style.display = 'block'

    // option that passes boolean for directive
    const msg = typeof binding.value === 'string'
      ? binding.value
      : ''

    messageContainer.innerHTML = msg
  } else {
    el.classList.remove(validation.class)

    iconContainer.style.display = 'none'

    // show not validation icons
    if (notValidationIcons.length) notValidationIcons.forEach(i => { i.style.removeProperty('display') })
    // only hide messages if another directives has no value to show
    if (!anotherValidationDirectives ||
      !anotherValidationDirectives.length ||
      !anotherValidationDirectives.some(d => !!d.value)) {
      messageContainer.style.display = 'none'
    }
  }
}

export default {
  bind (el, binding) {
    const validation = getValidationObject(el, binding)
    const input = el.querySelector('input, textarea, select')

    // option for another validation directive on component
    const messageContainer = el.querySelector('.help-block')

    const template = document.createElement('template')
    // use it own icon
    template.innerHTML = `
      <span class="form-control-feedback validation ${validation.icon}" style="display: none">
        <i class="material-icons">${validation.icon}</i>
      </span>
    `
    if (!messageContainer) {
      const msg = typeof binding.value === 'string' && binding.value
        ? binding.value
        : ''

      template.innerHTML += `
        <span class="help-block" style="display: none">${msg}</span>
      `
      input.after(template.content.children[0])
    }

    // when we append after input it removes the node from template content
    input.after(template.content.children[0])

    validate(el, binding)
  },
  update (el, binding, vnode) {
    const anotherValidationDirectives = vnode.data.directives.filter(d =>
      d.name === 'validation' &&
      d !== binding)
    validate(el, binding, anotherValidationDirectives)
  }
}
