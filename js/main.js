import 'intersection-observer'
import Bounds from 'bounds.js'

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box')
  const circle = document.querySelector('.circle')
  const textBoxes = document.querySelectorAll('.text-box')
  const images = document.querySelectorAll('img')

  const windowBound = Bounds({
    margins: { bottom: 100},
  })
  const boxBound = Bounds({
    root: box,
    threshold: 1.0,
  })

  const onImageEnter = (image) => {
    return () => {
      image.src = image.dataset.src
      textBoxes[parseInt(image.dataset.index)].classList.add('show')
      windowBound.unWatch(image)
    }
  }

  const onCircleEnter = () => {
    circle.style['background-color'] = '#ffae00'
  }
  const onCircleLeave = () => {
    circle.style['background-color'] = 'lightgray'
  }

  boxBound.watch(
    circle, onCircleEnter, onCircleLeave
  )
  images.forEach(image => {
    windowBound.watch(image, onImageEnter(image))
  })

  circle.addEventListener('transitionend', () => {
    circle.classList.toggle('move')
  })

  setTimeout(() => {
    circle.classList.toggle('move')
  })
});
