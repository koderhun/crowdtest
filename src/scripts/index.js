;(function () {
  const container = document.querySelector('#carouselContainer')
  const track = document.querySelector('#carouselTrack')
  const slides = document.querySelectorAll('.carousel__slide')
  const prevBtn = document.querySelector('#prevBtn')
  const nextBtn = document.querySelector('#nextBtn')
  const currentSlideSpan = document.querySelector('#currentSlide')
  const totalSlidesSpan = document.querySelector('#totalSlides')

  const CONFIG = {
    useDots: true,
    showNumbers: true,
    dotsSelector: '.carousel__dots',
    slidesPerView: 3,
  }

  const total = slides.length
  let currentStartIndex = 0
  const slidesPerView = CONFIG.slidesPerView
  if (currentSlideSpan && totalSlidesSpan) {
    if (!CONFIG.showNumbers && CONFIG.useDots) {
      currentSlideSpan.parentElement.style.display = 'none'
    } else if (!CONFIG.showNumbers && !CONFIG.useDots) {
      currentSlideSpan.parentElement.style.display = 'none'
    }
  }

  totalSlidesSpan.textContent = total

  function getSlideWidth() {
    if (!slides.length) return 0
    const slideRect = slides[0].getBoundingClientRect()
    const trackStyle = window.getComputedStyle(track)
    const gap = parseInt(trackStyle.gap) || 24
    return slideRect.width + gap
  }

  function updateDisplay() {
    if (CONFIG.showNumbers && currentSlideSpan) {
      const currentSlide = currentStartIndex + slidesPerView
      currentSlideSpan.textContent = currentSlide
    }

    if (CONFIG.useDots) {
      updateActiveDot()
    }
  }

  function createDots() {
    const dotsContainer = document.querySelector(CONFIG.dotsSelector)
    if (!dotsContainer) {
      console.warn(
        `Контейнер для точек с селектором "${CONFIG.dotsSelector}" не найден`,
      )
      return
    }

    const dotsCount = Math.ceil(total / slidesPerView)
    dotsContainer.innerHTML = ''

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button')
      dot.className = 'carousel__dot'
      dot.setAttribute('data-slide-group', i)
      dot.setAttribute('aria-label', `Перейти к группе слайдов ${i + 1}`)

      dot.addEventListener('click', () => {
        const targetIndex = i * slidesPerView
        const maxIndex = Math.max(0, total - slidesPerView)
        const finalIndex = Math.min(targetIndex, maxIndex)
        scrollToIndex(finalIndex)
      })

      dotsContainer.appendChild(dot)
    }

    updateActiveDot()
  }

  function updateActiveDot() {
    const dotsContainer = document.querySelector(CONFIG.dotsSelector)
    if (!dotsContainer) return

    const dots = dotsContainer.querySelectorAll('.carousel__dot')
    const activeGroup = Math.floor(currentStartIndex / slidesPerView)

    dots.forEach((dot, index) => {
      if (index === activeGroup) {
        dot.classList.add('active')
      } else {
        dot.classList.remove('active')
      }
    })
  }

  function scrollToIndex(index) {
    if (index < 0) index = 0
    if (index > total - slidesPerView) index = total - slidesPerView
    if (index < 0) index = 0

    currentStartIndex = index

    if (!slides.length) return

    const targetSlide = slides[currentStartIndex]
    if (!targetSlide) return

    targetSlide.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })

    updateDisplay()
  }

  function nextSlide() {
    const nextIndex = currentStartIndex + 1
    const maxIndex = Math.max(0, total - slidesPerView)

    if (nextIndex > maxIndex) {
      if (nextBtn) {
        nextBtn.style.transform = 'scale(0.95)'
        setTimeout(() => {
          if (nextBtn) nextBtn.style.transform = ''
        }, 120)
      }
      return
    }

    scrollToIndex(nextIndex)
  }

  function prevSlide() {
    const prevIndex = currentStartIndex - 1

    if (prevIndex < 0) {
      if (prevBtn) {
        prevBtn.style.transform = 'scale(0.95)'
        setTimeout(() => {
          if (prevBtn) prevBtn.style.transform = ''
        }, 120)
      }
      return
    }

    scrollToIndex(prevIndex)
  }

  function init() {
    if (prevBtn) prevBtn.addEventListener('click', prevSlide)
    if (nextBtn) nextBtn.addEventListener('click', nextSlide)

    if (CONFIG.useDots) {
      createDots()
    }

    updateDisplay()
  }

  init()
})()
;(function () {
  function initSlrNav() {
    const radios = Array.from(document.querySelectorAll('input[name="slr"]'))
    if (!radios.length) return

    document.querySelectorAll('.etaps-wrapper').forEach((wrapper) => {
      const prev = wrapper.querySelector('.slr-nav__btn--prev')
      const next = wrapper.querySelector('.slr-nav__btn--next')

      function getCurrentIndex() {
        return radios.findIndex((r) => r.checked)
      }

      function setIndex(i) {
        if (i < 0) i = radios.length - 1
        if (i >= radios.length) i = 0
        radios.forEach((r) => (r.checked = false))
        radios[i].checked = true
      }

      if (prev) {
        prev.addEventListener('click', function (e) {
          e.preventDefault()
          const idx = getCurrentIndex()
          setIndex(idx - 1)
        })
      }

      if (next) {
        next.addEventListener('click', function (e) {
          e.preventDefault()
          const idx = getCurrentIndex()
          setIndex(idx + 1)
        })
      }
    })
  }

  initSlrNav()
})()
