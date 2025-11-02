export function footerBtn() {

     let btn = document.querySelector(".contact-btn"),
     buttonTop = btn.querySelector("img:first-of-type"),
     star1 = btn.querySelector("img:nth-of-type(3)"),
     star2 = btn.querySelector("img:nth-of-type(4)")
     
     let xTo = gsap.quickTo(btn, "x", {duration: 0.4, ease: "power3"})
     let yTo = gsap.quickTo(btn, "y", {duration: 0.4, ease: "power3"});
     let mouseX = 0
     let mouseY = 0
     let centerPos

     

     if(!isMobile()) {
          gsap.set(btn, {rotateZ: 45});
          // STARS /////
          gsap.set([star1, star2], {
               scale: 0,
               rotate:"random([-35, 35, -25, 15, -15, 25, -7, 7])",
               y: 20
          })
          let sTl = gsap.timeline({paused: true})
          sTl.to([star1, star2], {
               scale: 1.5,
               y: -20,
               rotate: "random([-35, 35, -25, 15, -15, 25, -7, 7])",
               duration: .2,
               ease: "power1.in"
          })
          sTl.to([star1, star2], {
               scale: 0,
               y: -60,
               rotate: "random([-65, 65, -55, 45, -45, 55, -37, 37])",
               duration: .4,
               ease: "power1.out"
          })

          // ANGLING THE BUTTON //////////////////////////////////////////////////////////////////
          window.addEventListener("mousemove", e => {
               mouseX = e.x;
               mouseY = e.y; 

               xTo(e.clientX / 25);
               yTo(e.clientY / 20);
               
               centerPos = (window.innerWidth / 2) - mouseX
               gsap.to(btn, {
                    rotateZ: ((100 / window.innerWidth) * centerPos)  / 5 * -1,
               })
          });


          btn.addEventListener("mouseenter", function() {
               btn.classList.add("active")
               gsap.to(buttonTop, {
                    y: 5,
                    duration: .3,
                    ease: "power4"
               })
          })
          
          // PRESSING THE BUTTON /////////////////////////////////////////////////////////////////
          btn.addEventListener("mousedown", function() {
               gsap.to(buttonTop, {
                    y: 20,
                    duration: .3,
                    ease: "power4"
               })
               if(!sTl.isActive()) {
                    sTl.restart()
               }
          })
          btn.addEventListener("mouseup", function() {
               gsap.to(buttonTop, {
                    y: 0,
                    duration: .3,
                    ease: "power4"
               })
          })
          btn.addEventListener("mouseleave", function() {
               btn.classList.remove("active")
               gsap.to(buttonTop, {
                    y: 0,
                    duration: .3,
                    ease: "power4"
               })

          })

     }

     // open modal /////////////////////////////////////////////////////////////////////////////////////////////
     const modal = document.querySelector("#footer-modal")
     const btnClose = document.querySelector(".modal-close")
     let el = gsap.utils.toArray("#footer-modal > *:not(#lottie-bg, .modal-close)")

     let bg = document.querySelector('#lottie-bg')
     modalLottie = bodymovin.loadAnimation({
          container: bg, // the dom element that will contain the animation
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '../js/lottie/bg.json',
          rendererSettings: {
               preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
               progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
               hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
               className: ''
          }
     });

     // FORCE LOTTIE ASPECT //////////////////////////////
     modalLottie.addEventListener('DOMLoaded', function () {
          const svg = document.querySelector('#lottie-bg svg');
          if (svg) {
               // Step 1: Force SVG to ignore aspect ratio
               svg.setAttribute('preserveAspectRatio', 'none');
               // Step 2: Make sure it's styled directly
               svg.style.width = '100%';
               svg.style.height = '100%';
          }
     });

     // OPEN MODAL
     let modalAnim = gsap.timeline()
     function modalOpen() {
          if(!isMobile()) {
               smoother.paused(true)
          } else if(isMobile()) {
              disableScroll()
          }
          modalLottie.setDirection(1)
          modalLottie.setSpeed(1.5)
          modal.classList.add("visible")


          modalAnim.to("#smooth-content", {
               duration: .7,
               opacity: .25,
               ease: "power4",
               pointerEvents: "none",
               onStart: ()=> {
                    modalLottie.play()
                    gsap.to("#menu", {opacity: 0, duration: .3, ease: "power3", pointerEvents: "none"})
               }
          })
          modalAnim.to(el, {
               y: 0,
               rotateZ: 0,
               x: 0,
               scale: 1,
               opacity: 1,
               stagger: {
                    amount: .25
               },
               ease: "power4"
          })
          modalAnim.to(".modal-close", {
               opacity: 1,
               ease: "power4",
          }, "<")
          modal.style.pointerEvents = "auto"
     }
     //CLOSE MODAL
     function modalClose() {
          modal.classList.remove("visible")
          if(!isMobile()) {
               smoother.paused(false)
          } else if(isMobile()) {
               enableScroll()
          }
          modalLottie.setDirection(-1)
          modalLottie.setSpeed(1.5)
          modalLottie.play()
          gsap.to(el, {
               y: 50,
               rotateZ: 5,
               x: 50,
               scale: .8,
               opacity: 0,
               duration: .5,
               ease: "power4"
          })
          gsap.to(".modal-close", {
               opacity: 0,
               duration: .5,
               ease: "power4",
               onComplete: ()=> {
                    gsap.to("#smooth-content", {
                         duration: .5,
                         pointerEvents: "auto",
                         opacity: 1,
                         ease: "power4"
                    })
                    gsap.to("#menu", {opacity: 1, duration: .3, ease: "power3", pointerEvents: "auto"})
               }
          })
          modal.style.pointerEvents = "none"
     }


     btn.addEventListener("click", function() {
          modalOpen()
     })
     btnClose.addEventListener("click", function() {               
          modalClose()
     })

}
