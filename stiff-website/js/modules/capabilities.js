export function capabilities() {
     
     if(!isMobile()) {

          // Side scroll boxes //////////////////////////////////////////////////////////////////////////
          let wrap = document.querySelector("#process > .ws-grid")
          let sideItem = gsap.utils.toArray(".p-item")
          let pWidth
          let totalWidth

          let sideWidth = function() {
               totalWidth = 0
               sideItem.forEach(panel => {
                    pWidth = panel.offsetWidth
                    totalWidth += pWidth
               })    
               return totalWidth

          }
          sideWidth()

          let scrollAnim = gsap.timeline({
               scrollTrigger: {
                    trigger: wrap,
                    start: "top 90",
                    scrub: true,
                    pin: true,
                    end: () => "+=" + wrap.offsetHeight * 2,

               },
          })
           scrollAnim.to(sideItem, {
               x: -totalWidth + sideItem[1].offsetWidth + window.innerWidth/3 - 20,
               ease: "none",
          })
          sideItem.forEach(item => {
               let itemInner = item.querySelector(" & > div")
               gsap.set(itemInner, {rotateZ: 15,rotateX: 35, xPercent: (i) => {return 20 + (i*20)}, transformOrigin: "bottom left"})
               gsap.to(itemInner, {
                    rotateZ: 0,
                    rotateX: 0,
                    xPercent: 0,
                    duration: 1,
                    scrollTrigger: {
                         trigger: itemInner,
                         containerAnimation: scrollAnim,
                         start: "left right",
                         end: "right 85%",
                         scrub: true,
                         toggleActions: "play none none reverse",
                    }
               })
          })

          
          
          // TESTIMONIALS HOVER //////////////////////////////////////////////////////////////////////////
          let item = document.querySelectorAll(".testimonials article")

          item.forEach(i => {
               let logo = i.querySelector("figure")
               let text = i.querySelector("p")
               let user = i.querySelector("ul")
               let top = (0.007 * window.innerWidth) * 6
               
               function anim() {
                    gsap.to(logo, {
                         y: 0,
                         yPercent: 0,
                         scale: .6,
                         top: top,
                         duration: .5,
                         ease: "back"
                    })
                    gsap.to(text, {
                         y: 0,
                         scale: 1,
                         opacity: 1,
                         duration: .5,
                         ease: "power4"
                    })
                    gsap.to(user, {
                         y: 0,
                         scale: 1,
                         opacity: 1,
                         duration: .5,
                         ease: "power4"
                    })
               }
               function animReverse() {
                    gsap.to(logo, {
                         yPercent: -50,
                         scale: 1,
                         top: "50%",
                         duration: .5,
                         ease: "power4"
                    })
                    gsap.to(text, {
                         y: 50,
                         scale: .8,
                         opacity: 0,
                         duration: .5,
                         ease: "power4"
                    })
                    gsap.to(user, {
                         y: 10,
                         scale: .8,
                         opacity: 0,
                         duration: .5,
                         ease: "power4"
                    })
               }



               i.addEventListener("mouseenter", function() {
                    anim()

               })
               i.addEventListener("mouseleave", function() {
                    animReverse()
               })

          })

     }

     if(isMobile() && document.querySelector(".capabilities")) {
          const teamItem = gsap.utils.toArray(".p-item")
          gsap.set(teamItem, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})

          ScrollTrigger.batch(teamItem, {
               onEnter: batch => gsap.to(batch, {
                    duration: 1,
                    yPercent: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    stagger: {
                         amount: .15
                    },
                    ease: "power4",
               }),
               onEnterBack: batch => gsap.to(batch, {
                    duration: 1,
                    yPercent: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    stagger: {
                         amount: .15
                    },
                    ease: "power4",
               }),
          })   
     }


};