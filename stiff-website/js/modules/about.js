export function about() {
     // WORK ITEM HOVER //////////////////////////////////////////////////////////////////////////
     if(!isMobile()) {

          // TEAM WRAP SCROLL MOTION /////////////////////////////////////////////////////////////////
          const teamWrap = document.querySelector("#team")
          let cards = gsap.utils.toArray(".team-item article")
          let cardsBg = gsap.utils.toArray(".team-item .card-bg")
          let cardBgText = gsap.utils.toArray(".team-item .card-bg div")
          let images = gsap.utils.toArray(".team-item img")

          gsap.set(cardsBg, {
               yPercent: 60
          })
          gsap.set(cardBgText, {
               scale: 0
          })
          gsap.set(images, {
               rotation: 25,
               scale: 1.8
          })
          cards.forEach(card => {
               gsap.set(card, {
                    transformOrigin: "center center",
                    x: window.innerWidth - card.getBoundingClientRect().left,
                    rotation: 5,
                    scale: .75,
               })
          })
          let cardsAnim = gsap.timeline({
               scrollTrigger: {
                    trigger: teamWrap,
                    start: "top +=80",
                    end: () => "+=" + teamWrap.offsetHeight * 2,
                    scrub: true,
                    pin: true               
               }
          })
          let cardBgAnim = gsap.timeline({
               scrollTrigger: {
                    trigger: teamWrap,
                    start: "top 50%",
                    end: "top top",
                    scrub: true,               
               }
          })

          cardBgAnim.to(cardsBg, {
               yPercent: 0,
               duration: 1,
               stagger: {
                    amount: .5,
               },
               ease: "linear"
          })
          cardBgAnim.to(cardBgText, {
               scale: 1,
               duration: 1,
               stagger: {
                    amount: .5,
               },
               ease: "linear"
          }, "<")
          cardsAnim.to(cards, {
               x: 0,
               rotation: 0,
               yPercent: 0,
               duration: 1,
               // backgroundColor: "#F0ECD9",
               stagger: {
                    amount: .35,
               },
               ease: "linear"
          })
          cardsAnim.to(images, {
               scale: 1,
               rotation: 0,
               duration: 1,
               stagger: {
                    amount: .35,
               },
               ease: "linear"
          }, "<")
          cardsAnim.to(cards, {
               duration: 1,
               scale: 1,
               // filter: "grayscale(0)",
               stagger: {
                    amount: .5,
               },
               ease: "linear"
          }, "-=.55")
          


          // WORK HOVER //////////////////////////////////////////////////////////////////////////////////////
          let splitChars = new SplitText(".about-work a div span:not(.outline)", { type: "chars" })
          let letter =  gsap.utils.toArray(".about-work a div div").forEach(l => {
               let letterAnim = gsap.timeline()
               gsap.set(l, {transformOrigin: "bottom center"})
               l.addEventListener("mouseenter", function() {
                    if(!letterAnim.isActive()) {
                         letterAnim.to(l, {
                              scaleY: .5,
                              scaleX: 1.2,
                              color: "#FECB04",
                              duration: .15,
                              ease: "power3"
                         })
                         letterAnim.to(l, {
                              scaleY: 1,
                              scaleX: 1,
                              color:"#d93535",
                              duration: .25,
                              ease: "back"
                         })
                    }
               })
          })


     }



     // team modal //////////////////////////////////////////////////////////////////////////

     let teamClose = document.querySelectorAll(".team-close")
     let teamTrigger = document.querySelectorAll(".team-item article")

     teamTrigger.forEach(tt => {
          let tl = gsap.timeline()

          tt.addEventListener("click", function() {
               let thisID = tt.dataset.team
               let thisItem = document.querySelector("[data-member="+ thisID +"]")
               let img = thisItem.querySelector("figure")
               let title = thisItem.querySelector("h2")
               let position = thisItem.querySelector(".position")
               let copy = thisItem.querySelector("p")
               let close = thisItem.querySelector(".team-close")

               gsap.set([img, title, position, copy], {x: 150, opacity: 0, rotate: 7})
               tl.to("#smooth-content", {
                    opacity: .4,
                    duration: 1,
                    onStart: () => {
                         thisItem.classList.add("opened")
                         document.querySelector("#smooth-content").style.pointerEvents = "none"
                          if(!isMobile()) {
                              smoother.paused(true)
                          } else {
                              disableScroll()
                          }
                         
                    }, 
                    ease: "power4.inOut"
               })
               tl.to(menu, {
                    opacity: 0,
                    duration: 1,
                    ease: "power4.inOut"
               }, "<")
               tl.to([thisItem, close], {
                    xPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
               }, "<")
               tl.to([img, title, position, copy], {
                    x: 0,
                    opacity: 1, 
                    rotate: 0,
                    duration: 1,
                    stagger: {
                         amount: .25
                    },
                    ease: "power4"
               }, "-=.5")
          })
     })

     teamClose.forEach(item => {
          item.addEventListener("click", function() {
               gsap.to([".team-modal.opened", teamClose], {
                    xPercent: 0,
                    duration: 1,
                    ease: "power4",
                    onStart: () => {
                         document.querySelector(".team-modal.opened").classList.remove("opened")
                         if(!isMobile()) {
                              smoother.paused(false)
                         } else {
                              enableScroll()
                         }
                    }
               })
               gsap.to(["#smooth-content", menu], {
                    opacity: 1,
                    duration: 1,
                    ease: "power4",
                    onStart: () => {
                         document.querySelector("#smooth-content").style.pointerEvents = "auto"
                    }
               })
          })
     } )


};