;(function (window, document) {
  "use strict"

  const queryAll = (selector) => Array.from(document.querySelectorAll(selector))

  const sections = queryAll('section')
    .map(section => ({
      startPos: Math.round(section.getBoundingClientRect().top + window.scrollY) - 1,
      fragment: section.id
    }))

  function getCurrentFragment () {
    var fragment = sections[0].fragment

    sections.forEach(section => {
      if (window.scrollY >= section.startPos) {
        fragment = section.fragment
      }
    })

    return fragment
  }

  ;(function ChangeFragmentOnScroll() {

    function handler (event) {
      history.pushState(null, null, `#${getCurrentFragment()}`)
    }

    window.addEventListener('scroll', handler)
    handler()
  }())

  ;(function AnimateProjectList () {

    const showingContainer = document.querySelector('.project-list')
    const pixelsBefore = 400
    const limit = showingContainer.getBoundingClientRect().top - pixelsBefore

    function handler () {
      if (window.scrollY >= limit) {
        showingContainer.classList.toggle('showing')
        window.removeEventListener('scroll', handler)
      }
    }

    window.addEventListener('scroll', handler)
    handler()
  }())

  ;(function SmoothScroll () {

    //const body = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
    const body = document.body
    const DURATION = 900

    queryAll('.move-to')
      .map(link => 
        link.addEventListener('click', event => {
          var startTime
          var startPos = body.scrollTop
          var fragment = /[^#]+$/.exec(event.target.href)[0]
          var endPos = document.getElementById(fragment).getBoundingClientRect().top
          var maxScroll = body.scrollHeight - window.innerHeight
          var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos
          function scroll (timestamp) {
            startTime = startTime || timestamp
            var elapsed = timestamp - startTime
            var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, DURATION)
            body.scrollTop = progress
            elapsed < DURATION && window.requestAnimationFrame(scroll)
          }
          window.requestAnimationFrame(scroll)
          event.preventDefault()
        })
      )

    function easeInOutCubic (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b
      return c/2*((t-=2)*t*t + 2) + b
    }
  }())
}(window, document));