// Carousel Script
;(function () {
  const container = document.getElementById('carouselContainer')
  const track = document.getElementById('carouselTrack')
  const slides = document.querySelectorAll('.carousel__slide')
  const prevBtn = document.getElementById('prevBtn')
  const nextBtn = document.getElementById('nextBtn')
  const currentSlideSpan = document.getElementById('currentSlide')
  const totalSlidesSpan = document.getElementById('totalSlides')

  const total = slides.length
  let currentStartIndex = 0
  const slidesPerView = 3

  totalSlidesSpan.textContent = total

  function getSlideWidth() {
    if (!slides.length) return 0
    const slideRect = slides[0].getBoundingClientRect()
    const trackStyle = window.getComputedStyle(track)
    const gap = parseInt(trackStyle.gap) || 24
    return slideRect.width + gap
  }

  function updateDisplay() {
    const currentSlide = currentStartIndex + slidesPerView
    currentSlideSpan.textContent = currentSlide
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
      nextBtn.style.transform = 'scale(0.95)'
      setTimeout(() => {
        if (nextBtn) nextBtn.style.transform = ''
      }, 120)
      return
    }

    scrollToIndex(nextIndex)
  }

  function prevSlide() {
    const prevIndex = currentStartIndex - 1

    if (prevIndex < 0) {
      prevBtn.style.transform = 'scale(0.95)'
      setTimeout(() => {
        if (prevBtn) prevBtn.style.transform = ''
      }, 120)
      return
    }

    scrollToIndex(prevIndex)
  }

  function init() {
    if (prevBtn) prevBtn.addEventListener('click', prevSlide)
    if (nextBtn) nextBtn.addEventListener('click', nextSlide)

    updateDisplay()
  }

  init()
})()
