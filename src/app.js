(function (window, document) {
  'use strict'

  window.dataLayer = window.dataLayer || []
  function gtag () { dataLayer.push(arguments) }
  gtag('js', new Date())

  gtag('config', 'UA-163921147-1')

  onEnterViewport('.project-list', { pixelsAround: 200, once: true })
  updateURLFragmentOnScroll(Array.from(document.querySelectorAll('section')))

  function updateURLFragmentOnScroll (fragments) {
    const fragmentPositions = fragments.map(fragment => ({
      startPosition:
        Math.round(fragment.getBoundingClientRect().top + window.scrollY) - 1,
      fragment: fragment.id
    }))

    const getShowingFragment = () =>
      fragmentPositions.reduce(
        (fragment, fragmentPosition) =>
          window.scrollY >= fragmentPosition.startPos ? fragmentPosition.fragment : fragment,
        fragmentPositions[0].fragment
      )

    const handler = () =>
      window.history.pushState(null, null, `#${getShowingFragment()}`)

    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }

  function onEnterViewport (element, { pixelsAround = 0, toggleClassName = 'showing', once = false }) {
    const showingContainer = document.querySelector(element)
    const rectangle = showingContainer.getBoundingClientRect()

    const isWithinLimits = height =>
      rectangle.top - pixelsAround >= height ||
      rectangle.bottom + pixelsAround <= height

    const handler = () => {
      if (isWithinLimits(window.scrollY)) {
        showingContainer.classList.toggle(toggleClassName)
        if (once) {
          window.removeEventListener('scroll', handler)
        }
      }
    }

    window.addEventListener('scroll', handler)
    handler()
    return () => window.removeEventListener('scroll', handler)
  }
})(window, document)
