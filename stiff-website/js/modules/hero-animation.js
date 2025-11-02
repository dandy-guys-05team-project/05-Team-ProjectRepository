export function heroAnim() {

    // VARS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    let heroImg = gsap.utils.toArray(".hero-img"),
    heroEl = gsap.utils.toArray(".hero-in"),
    heroAnim = gsap.timeline()


    gsap.set(heroEl, {opacity: 0, y: 50})
    gsap.set(heroImg, {rotate: -15, scale: .8})


    // LETTER ANIMATION SETUP =======================================================================================
    let heroChars = new SplitText(".hero.chars", { type: "lines, chars" })
    let heroLines = new SplitText(".hero.lines", { type: "lines" })
     let distance 
    if(!isMobile() && window.innerWidth > 768) {
          distance = 300
    } else {
          distance = 100
    }
    gsap.set(heroChars.chars, {
        transformOrigin: "bottom right",
        y: distance, 
        scale: .7, 
        rotate: 45,
        opacity: 0,
        filter: "blur(5px)",
    })
    gsap.set(heroLines.lines, {
        opacity: 0,
        rotate: 5,
        yPercent: 150
    })



     // HOME PAGE =======================================================================================
    if(document.querySelector(".home") && !isMobile()) {
          let textLeft = document.querySelector("#hero .text-left")
          let textRight = document.querySelector("#hero .text-right")
          let heroRight = gsap.utils.toArray(".hero-right")

          gsap.set(textLeft, {xPercent: -100, filter: "blur(5px)", opacity: 0})
          gsap.set(textRight, {xPercent: 100, filter: "blur(5px)", opacity: 0})
          gsap.set(heroRight, {x: "33vw"})


          heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back"
          })
          heroAnim.to([textLeft, textRight], {
               xPercent: 0,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               ease: "power4"
          }, "-=.5")
          heroAnim.to(heroEl, {
               y: 0,
               opacity: 1,
               ease: "back",
               onStart: () => {
                    teethPlay()
               }
          }, "-=.6")
          heroAnim.to(heroRight, {
               x: 0,
               duration: .8,
               stagger: {
                    amount: .1,
               },
               ease: "power4"
          }, "-=.5")

    } else if (document.querySelector(".home") && isMobile()) {
          let textLeft = document.querySelector("#hero .text-left")
          let textRight = document.querySelector("#hero .text-right")

          gsap.set(textLeft, {y: 50, filter: "blur(5px)", opacity: 0})
          gsap.set(textRight, {y: 50, filter: "blur(5px)", opacity: 0})
          
          // teeth anim ////////////////////////////
          function teethAnim() {
               ScrollTrigger.create({
                    trigger: "#hero",
                    start:"top top",
                    end:"bottom top",
                    onEnter: () => {
                         teethLottie.play()
                    },
                    onEnterBack: () => {
                         teethLottie.play()
                    },
                    onLeave: () => {
                         teethLottie.pause()
                    },
               })
          }

          heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back"
          })
          heroAnim.to([textLeft, textRight], {
               y: 0,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               ease: "power4"
          }, "-=.5")
          heroAnim.to(heroEl, {
               y: 0,
               opacity: 1,
               ease: "back",
               onStart: () => {
                    teethAnim()
               }
          }, "-=.6")
    }


    // DIRECTOR DETAIL =======================================================================================
    if(document.querySelector(".work")) {
          let box = gsap.utils.toArray(".hero-box")
          let marquee = document.querySelector(".marquee")

          gsap.set(marquee, {opacity: 0, yPercent: 100, rotate: 10})
          gsap.set(box, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})

          let mInner = document.querySelector(".work #hero h1")
          let anim = gsap.timeline({paused: true, repeat: -1})
          anim.to(mInner, {
               xPercent: -50,
               duration: 12,
               ease: "linear"
          })
          let marqPlay = function() {
               ScrollTrigger.create({
                    trigger: mInner,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => {
                         anim.play()
                    },
                    onEnterBack: () => {
                         anim.play()
                    },
                    onLeave: () => {
                         anim.pause()
                    },
                    onLeaveBack: () => {
                         anim.pause()
                    }
                    
               })
          }

          heroAnim.to(marquee, {
            opacity: 1,
            yPercent: 0,
            rotate: 0,
            duration: 1,
            delay: .5,
            ease: "power4",
            onComplete: marqPlay()
        })
        heroAnim.to(box, {
               duration: 1,
               yPercent: 0,
               scale: 1,
               rotation: 0,
               opacity: 1,
               stagger: {
                    amount: .15
               },
               ease: "power4",
          }, "-=.8")

    }

    // DIRECTORS PAGE =======================================================================================
    if(document.querySelector(".work-detail")) {
          let row = gsap.utils.toArray(".row-item")
          let video = document.querySelector(".video-scroll-pos > video")
          let play = document.querySelector(".video-scroll-pos .play")
          let videoWrap = document.querySelector(".video-scroll-pos")
          let bigVideo = document.querySelector(".video-image")
          gsap.set(row, {xPercent: 50, opacity: 0})
          gsap.set(video, {yPercent: 100, rotate: 25, opacity: 0})
          gsap.set(play, {yPercent: 100, rotate: 25, opacity: 0})
          if(window.innerWidth > 2200 || window.innerWidth < 768) {
               gsap.set(bigVideo, {yPercent: 100, rotate: 25, opacity: 0})
               gsap.to(bigVideo, {
                    opacity: 1,
                    yPercent:0,
                    rotate: 0,
                    delay: 1,
                    duration: .75,
                    ease: "power4"   
               })
          }
          heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back"
          })
          heroAnim.to(heroLines.lines, {
               opacity: 1,
               yPercent:0,
               rotate: 0,
               stagger: {
                    amount: .2
               },
               ease: "back"
          }, "-=.5")
          heroAnim.to(videoWrap, {
               opacity: 1,
               ease: "power4"
          }, "-=.6")
          heroAnim.to(video, {
               opacity: 1,
               yPercent:0,
               rotate: 0,
               duration: .75,
               ease: "power4"
          }, "<")
          heroAnim.to(play, {
               opacity: 1,
               yPercent:0,
               rotate: 0,
               duration: .4,
               ease: "power4"
          }, "-=.3")
          heroAnim.to(row, {
               xPercent: 0,
               opacity: 1,
               duration: .75,
               stagger: {
                    amount: .25
               },
               ease: "power4"
          }, "-=.6")
          heroAnim.to(heroEl, {
               y: 0,
               opacity: 1,
               duration: .45,
               ease: "power4"
          }, "-=.6")

    }

    // ABOUT PAGE =======================================================================================
    if(document.querySelector(".about")) {
        if(!isMobile) {
            smoother.paused(true)
        }
          if(isMobile()) {
               const teamItem = gsap.utils.toArray(".team-item:first-of-type")
               gsap.set(teamItem, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})
               gsap.to(teamItem, {
                    duration: 1,
                    yPercent: 0,
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    delay: 1,
                    ease: "power4",
               })
          }
        heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back"
        })
        heroAnim.to(heroLines.lines, {
               opacity: 1,
               yPercent:0,
               rotate: 0,
               stagger: {
                    amount: .2
               },
               ease: "back"
        }, "-=.4")
        heroAnim.to(heroEl, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4",
        }, "-=.5")
    }

    // PRESS PAGE =======================================================================================
    if(document.querySelector(".news")) {
          const vItem = gsap.utils.toArray(".hero-box")
          let marquee = document.querySelector(".marquee")

          gsap.set(marquee, {opacity: 0, yPercent: 100, rotate: 10})
          gsap.set(vItem, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})

          let mInner = document.querySelector(".news #hero h1")
          let anim = gsap.timeline({paused: true, repeat: -1})
          anim.to(mInner, {
               xPercent: -50,
               duration: 12,
               ease: "linear"
          })
          let marqPlay = function() {
               ScrollTrigger.create({
                    trigger: mInner,
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => {
                         anim.play()
                    },
                    onEnterBack: () => {
                         anim.play()
                    },
                    onLeave: () => {
                         anim.pause()
                    },
                    onLeaveBack: () => {
                         anim.pause()
                    }
                    
               })
          }

          heroAnim.to(marquee, {
            opacity: 1,
            yPercent: 0,
            rotate: 0,
            delay: .5,
            duration: 1,
            ease: "power4",
            onComplete: marqPlay()
        })
          heroAnim.to(vItem, {
               duration: 1,
               yPercent: 0,
               scale: 1,
               rotation: 0,
               opacity: 1,
               stagger: {
                    amount: .15
               },
               ease: "power4",
          }, "-=.8")


    }

    // CONTACT PAGE =======================================================================================
    if(document.querySelector(".contact")) {
          gsap.set(".brick", {yPercent: 50, opacity: 0, rotate: 35})

          let brickAnim = gsap.timeline({paused: true})
               brickAnim.to(".brick", {
               yPercent: 20,
               rotate: "random(-12, 12, 3)",
               duration:2,
               ease:"power1.inOut",
               repeat:-1,
               yoyo: true,
               repeatRefresh:true
          });
        heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back",
        })
        heroAnim.to(".brick", {
               yPercent: 0, 
               rotate: 0,
               opacity: 1,
               duration: .7,
               ease: "back",
               onComplete: () => {
                    brickAnim.play()
               }
        }, "-=.5")
        heroAnim.to(heroEl, {
               y: 0, 
               opacity: 1,
               duration: 1,
               ease: "power4",
        }, "-=.5")

    }


     // Capabilities =======================================================================================
    if(document.querySelector(".capabilities")) {

          // FLOATING CHOPS //////////////////////////////////////////////////////////////////////////////////////////////////
          gsap.set("#hero figure", {yPercent: 0, opacity: 0})
          let brickAnim1 = gsap.timeline({
               paused: true,
               scrollTrigger: {
                    trigger: "#hero",
                    start: "top +=10",
                    end: "bottom top",
                    toggleActions: "play pause play pause"
               }
          })
          let brickAnim2 = gsap.timeline({
               paused: true,
               scrollTrigger: {
                    trigger: "#hero",
                    start: "top +=10",
                    end: "bottom top",
                    toggleActions: "play pause play pause"
               }
          })
          brickAnim1.to("#hero .chop-1", {
               yPercent: 20,
               rotate: "random(-8, 8, 2)",
               duration:1.5,
               ease:"power1.inOut",
               repeat:-1,
               yoyo: true,
               repeatRefresh:true
          });
          brickAnim2.to("#hero .chop-2", {
               yPercent: 25,
               rotate: "random(-15, 15, 3)",
               duration:2,
               ease:"power1.inOut",
               repeat:-1,
               yoyo: true,
               repeatRefresh:true
          });

        if(!isMobile) {
            smoother.paused(true)
        }
        heroAnim.to(heroChars.chars, {
               y: 0, 
               scale: 1, 
               rotate: 0,
               delay: .5,
               opacity: 1,
               filter: "blur(0px)",
               duration: .7,
               stagger: {
                    amount: .35
               },
               ease: "back"
        })
        heroAnim.to(heroLines.lines, {
               opacity: 1,
               yPercent:0,
               rotate: 0,
               stagger: {
                    amount: .2
               },
               ease: "back"
        }, "-=.4")
          heroAnim.to("#hero figure", {
               yPercent: 0, 
               opacity: 1,
               duration: .7,
               ease: "back",
               onComplete: () => {
                    brickAnim1.play()
                    brickAnim2.play()
               }
        }, "-=.5")
        heroAnim.to(heroEl, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4",
        }, "-=.5")
    }

}
