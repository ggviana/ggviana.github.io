(function (window, document) {
  'use strict'

  window.dataLayer = window.dataLayer || []

  function gtag () { dataLayer.push(arguments) }

  gtag('js', new Date())
  gtag('config', 'UA-163921147-1')

  onEnterViewport(
  '.project-list',
  (element, removeEvent) => {
    removeEvent()
    element.classList.add('showing')
  })

  onEnterViewport(
    'section',
    element => {
      if (window.location.hash !== element.id) {
        window.history.pushState(null, null, `#${element.id}`)
      }
    },
    {
      pixelsAround: 200
    }
  )

  function onEnterViewport (selector, onEnter = () => {}, {
    pixelsAround = 0
  } = {}) {
    const elements = document.querySelectorAll(selector)

    const isOnViewport = element => {
      const rectangle = element.getBoundingClientRect()
      const startPosition = Math.round(rectangle.top + window.scrollY) - pixelsAround
      const endPosition = Math.round(rectangle.bottom + window.scrollY) - pixelsAround
      return window.scrollY >= startPosition && window.scrollY <= endPosition
    }

    const removeEvent = () => window.removeEventListener('scroll', handler)

    function handler () {
      Array.from(elements).filter(isOnViewport).forEach(element => {
        onEnter(element, removeEvent)
      })
    }

    handler()
    window.addEventListener('scroll', handler)
    return removeEvent
  }
})(window, document)
