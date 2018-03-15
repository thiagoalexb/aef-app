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

function validate (el, binding) {
  const validation = getValidationObject(el, binding)
  const iconContainer = el.querySelector('.form-control-feedback')
  const messageContainer = el.querySelector('.help-block')

  if (binding.value) {
    if (el.className.indexOf(validation.class) === -1) {
      el.classList.add(validation.class)
    }
    iconContainer.style.display = 'block'
    messageContainer.style.display = 'block'
    messageContainer.innerHTML = binding.value
  } else {
    el.classList.remove(validation.class)
    iconContainer.style.display = 'none'
    messageContainer.style.display = 'none'
  }
}

export default {
  bind (el, binding) {
    const validation = getValidationObject(el, binding)
    const input = el.querySelector('input, textarea, select')
    const template = document.createElement('template')
    template.innerHTML = `
    <span class="form-control-feedback" style="display: none">
      <i class="material-icons">${validation.icon}</i>
    </span>
    <span class="help-block" style="display: none">${binding.value || ''}</span>
    `

    // when we append after input it removes the node from template content
    input.after(template.content.children[0])
    input.after(template.content.children[0])

    validate(el, binding)
  },
  update (el, binding) {
    validate(el, binding)
  }
}
