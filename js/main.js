import Bounds from '../../bounds.js/src/bounds.js'

document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box')
  const circles = document.querySelectorAll('.circle')
  const onCircleEnter = (circle) => {
    return () => {
      console.log('circle entered')
      circle.classList.add('red')
    }
  }
  const onCircleLeave = (circle) => {
    return () => {
      console.log('circle left')
      circle.classList.remove('red')
    }
  }

  const windowBound = Bounds({
    margins: { bottom: 150},
  })
  const boxBound = Bounds({
    root: box,
    threshold: 1.0,
  })
  console.log(boxBound)

  circles.forEach(circle => {
    boxBound.watch(
      circle, onCircleEnter(circle), onCircleLeave(circle)
    )
    circle.addEventListener('transitionend', () => {
      circle.classList.toggle('move')
    })
  })
});