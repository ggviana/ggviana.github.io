(function (window, document) {
  'use strict'

  const $ = selector => Array.from(document.querySelectorAll(selector))

  const sections = $('section').map(section => ({
    startPos:
      Math.round(section.getBoundingClientRect().top + window.scrollY) - 1,
    fragment: section.id
  }))

  const getCurrentFragment = () =>
    sections.reduce(
      (fragment, section) =>
        window.scrollY >= section.startPos ? section.fragment : fragment,
      sections[0].fragment
    )

  ;(function ChangeFragmentOnScroll () {
    const handler = () =>
      window.history.pushState(null, null, `#${getCurrentFragment()}`)

    window.addEventListener('scroll', handler)
    handler()
  })()

  ;(function AnimateProjectList () {
    const showingContainer = document.querySelector('.project-list')
    const pixelsAround = 200
    const rectangle = showingContainer.getBoundingClientRect()
    const isWithinLimits = height =>
      rectangle.top - pixelsAround >= height ||
      rectangle.bottom + pixelsAround <= height

    const handler = () => {
      if (isWithinLimits(window.scrollY)) {
        showingContainer.classList.toggle('showing')
        window.removeEventListener('scroll', handler)
      }
    }

    window.addEventListener('scroll', handler)
    handler()
  })()
})(window, document)
