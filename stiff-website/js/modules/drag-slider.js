export function dragSlider() {
    
     let dragImg = document.querySelector(".drag")
     let dragLoop = gsap.timeline({
          repeat: -1,
     })
     dragLoop.to(dragImg, {
          x: -50,
          scale: .9,
          rotate: -10,
          duration: .75,
          ease: "back"
     })
     dragLoop.to(dragImg, {
          x: 50,
          scale: .9,
          rotate: 10,
          duration: .75,
          ease: "back"
     })
     dragLoop.to(dragImg, {
          x: 0,
          scale: 1,
          rotate: 0,
          duration: .75,
          ease: "back"
     })
     
    const wrapper = document.querySelector(".drag-slider");
    const boxes = gsap.utils.toArray(".drag-slider .drag-item");

    /*--------------------
     Vars
     --------------------*/
     const $menu = document.querySelector('.drag-slider')
     const $items = document.querySelectorAll('.drag-item')
     let menuWidth = $menu.clientWidth
     let itemWidth = $items[0].clientWidth
     let wrapWidth = $items.length * itemWidth

     let scrollSpeed = 0
     let oldScrollY = 0
     let scrollY = 0
     let y = 0


     /*--------------------
     Lerp
     --------------------*/
     const lerp = (v0, v1, t) => {
     return v0 * ( 1 - t ) + v1 * t
     }


     /*--------------------
     Dispose
     --------------------*/
     const dispose = (scroll) => {
     gsap.set($items, {
     x: (i) => {
          return i * itemWidth + scroll
     },
     modifiers: {
          x: (x, target) => {
          const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
          return `${s}px`
          }
     }
     })
     } 
     dispose(0)


     /*--------------------
     Wheel
     --------------------*/
     // const handleMouseWheel = (e) => {
     //      scrollY -= e.deltaY * 0.9
     // }


     /*--------------------
     Touch
     --------------------*/
     let touchStart = 0
     let touchX = 0
     let isDragging = false
     const handleTouchStart = (e) => {
          touchStart = e.clientX || e.touches[0].clientX
          isDragging = true
          $menu.classList.add('is-dragging')
          dragImg.classList.add('hide')
     }
     const handleTouchMove = (e) => {
          if (!isDragging) return
               touchX = e.clientX || e.touches[0].clientX
               scrollY += (touchX - touchStart) * 2.5
               touchStart = touchX

     }
     const handleTouchEnd = () => {
          isDragging = false
          $menu.classList.remove('is-dragging')
          dragImg.classList.remove('hide')
     }


     /*--------------------
     Listeners
     --------------------*/
     // $menu.addEventListener('mousewheel', handleMouseWheel)

     $menu.addEventListener('touchstart', handleTouchStart)
     $menu.addEventListener('touchmove', handleTouchMove)
     $menu.addEventListener('touchend', handleTouchEnd)


     $menu.addEventListener('mousedown', handleTouchStart)
     $menu.addEventListener('mousemove', handleTouchMove)
     $menu.addEventListener('mouseleave', handleTouchEnd)
     $menu.addEventListener('mouseup', handleTouchEnd)

     $menu.addEventListener('selectstart', () => { return false })



     /*--------------------
     Resize
     --------------------*/
     window.addEventListener('resize', () => {
          menuWidth = $menu.clientWidth
          itemWidth = $items[0].clientWidth
          wrapWidth = $items.length * itemWidth
     })


     /*--------------------
     Render
     --------------------*/
     const render = () => {
     requestAnimationFrame(render)
     y = lerp(y, scrollY, .1)
     dispose(y)
     
     scrollSpeed = y - oldScrollY
     oldScrollY = y
     
     gsap.to($items, {
          skewX: -scrollSpeed * .2,
          rotate: scrollSpeed * .01,
          scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
     })
     }
     render()


}