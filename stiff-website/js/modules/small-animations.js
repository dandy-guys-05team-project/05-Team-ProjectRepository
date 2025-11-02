export function directionSpin() {

    const dirSpin = gsap.timeline({
        scrollTrigger: {
            trigger: ".direction-spin",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause play pause",
            scrub: false
        }
    })
    dirSpin.to(".direction-spin", {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "linear"
    })
}

// ANIMATING ITEMS IN VIEW %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function inView() {
    const vItem = gsap.utils.toArray(".view")
    gsap.set(vItem, {opacity: 0, yPercent: 100, roateZ: 10})

    ScrollTrigger.batch(vItem, {
        start: "top 95%",
        trigger: vItem,
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            yPercent: 0,
            rotation: 0,
            duration: .8,
            stagger: {
                amount: .2
            },
            ease: "power4.out"
        })
    });
}


export function boxIn() {
	// ANIMATE WORK BOXES ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const vItem = gsap.utils.toArray(".box-in:not(.first)")
     gsap.set(vItem, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})
     if(isMobile() && document.querySelector(".about")) {
          const cardItem = gsap.utils.toArray(".team-item:not(:first-of-type")
          gsap.set(cardItem, {scale: .5, yPercent: 20, opacity: 0, rotation: 15,})

          ScrollTrigger.batch(cardItem, {
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

    ScrollTrigger.batch(vItem, {
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

export function workBoxHover() {
	// TEXT ANIM FOR WORK
    gsap.utils.toArray(".work-box-hover").forEach(box => {
        let title = box.querySelector("h1")
        let subTitle = box.querySelector("h2")
        let img = box.querySelector("figure")
        let progress = box.querySelector(".progress-inner")
        let workTitle = new SplitText(title, { type: "chars" })
        gsap.set(workTitle, {transformOrigin: "bottom center"})

        // BOX HOVER
        let tl = gsap.timeline({paused: true})
        tl.to(workTitle.chars, {
          y: 30,
          scaleY: .5,
          duration: .1,
          ease: "back.in",
          stagger: {
            amount: .05
          }
        })
        tl.to(subTitle, {
          y: 15,
          scaleY: .75,
          duration: .1,
          ease: "back.in",
        }, "<")
        tl.to(workTitle.chars, {
          y: 0,
          scaleY: 1,
          duration: .3,
          ease: "back.out",
          stagger: {
            amount: .1
          }
        })
        tl.to(subTitle, {
          y: 0,
          scaleY: 1,
          duration: .3,
          ease: "back.out",
        }, "<")

        // progress tl
        let progressBar = gsap.timeline({repeat: -1, paused: true})
        progressBar.to(progress, {
          scaleX: 1,
          duration: 5,
          ease: "linear",
        })
        progressBar.to(progress, {
          scaleX:0,
          transformOrigin: "center right",
          duration: 5,
          ease: "linear",
        })

        box.addEventListener("mouseenter", function() {
            tl.restart()
            progressBar.restart()

        })
        box.addEventListener("mouseleave", function() {
            progressBar.pause()
        })

      })
}

export function superMarquee() {

     gsap.utils.toArray(".super-marquee").forEach(sm => {
          let items = sm.querySelectorAll("div")
          gsap.set(items, {
               x: "random(-150, 150)",
               yPercent: 200,
               opacity: 0
          })
          let tl = gsap.timeline({
               scrollTrigger: {
                    trigger: sm,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play pause play pause"
               }
          })
          gsap.to(items, {
               yPercent: 0,
               duration: 1,
               opacity: 1,
               stagger: {
                    amount: .65
               },
               scrollTrigger: {
                    trigger: sm,
                    start: "top 80%",
               },
               ease: "power4"
          })
          tl.to(items, {
               xPercent: "random([-40, 20, -35, 30, -25, 17, 28, -15, -32, 12, 37, -18])",
               duration: "random(12,16)",
               stagger: {
                    amount: 0.01,
                    yoyo: true,
                    repeat: -1
               },
               ease: "linear"
          })
     })
}

export function textLink() {
     let textLink = document.querySelectorAll(".nav-link")
     // let navSplit = new SplitText(""#nav a", { type: "chars" })
     if(!isMobile()) {

          textLink.forEach(item => {
               let navSplit = new SplitText(item, { type: "chars" })
               gsap.set(textLink.chars, {transformOrigin: "bottom center"})
               let tl = gsap.timeline({paused: true})

               tl.to(navSplit.chars, {
                    yPercent: 20,
                    scaleY: .5,
                    duration: .1,
                    ease: "back.in",
                    color: "#D64B4B",
                    stagger: {
                              amount: .05
                    }
               })

               tl.to(navSplit.chars, {
                    yPercent: 0,
                    scaleY: 1,
                    duration: .3,
                    ease: "back.out",
                    color: "#F0ECD9",
                    stagger: {
                              amount: .1
                    }
               })

               item.addEventListener("mouseenter", function() {

                    if(!item.classList.contains("selected")) {
                         tl.restart()
                    }
               })
          })
     }
}

// START SPARKLES //////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function starSparkle() {
     let starWrap = document.querySelectorAll(".star-wrap")
     let star1
     let star2

     function action() {
          starWrap.forEach(sw => {
               star1 = sw.querySelector("img.star-1")
               star2 = sw.querySelector("img.star-2")
               gsap.set([star1, star2], {scale: 0, yPercent: 50, rotate: "random([-72, 90 ,60, -110, 58, -90, 80, -55, 75, -110, 105])"})

               let burst1 = gsap.timeline({
                    repeat: -1,
                    repeatRefresh:true,
                    scrollTrigger: {
                         trigger: sw,
                         start: "top bottom",
                         toggleActions: "play pause play pause"
                    },
                    onComplete: action
               });
               let burst2 = gsap.timeline({
                    repeat: -1,
                    repeatRefresh:true,
                    scrollTrigger: {
                         trigger: sw,
                         start: "top bottom",
                         toggleActions: "play pause play pause"
                    },
                    onComplete: action
               });
               burst1.to(star1, {scale: 0, yPercent: 50, duration: .001, ease: "none"})
               burst1.to(star1, {
                    duration: 1.4,
                    xPercent: () => { return getRand(-100,100) },
                    ease:"power1.inOut",
               })
               burst1.to(star1, {
                    duration: .7,
                    scale: 1,
                    rotate: 45,
                    yPercent: -50,
                    ease:"power1.in",
               }, "<")
               burst1.to(star1, {
                    duration: .7,
                    scale: 0,
                    rotate: 90,
                    yPercent: -130,
                    ease:"power1.out",
                    onComplete: function () {
                         gsap.set(star1, { scale: 0, yPercent: 50, xPercent: 0, rotate: 0});
                    }
               }, "-=.7")
               burst2.to( star2, {scale: 0, yPercent: 50, duration: .001, ease: "none"})
               burst2.to(star2, {
                    duration: 2,
                    xPercent: () => { return getRand(-100,100) },
                    ease:"power1.inOut",
               })
               burst2.to(star2, {
                    duration: 1,
                    scale: 1,
                    rotate: 45,
                    yPercent: -50,
                    ease:"power1.in",
               }, "<")
               burst2.to(star2, {
                    duration: 1,
                    scale: 0,
                    rotate: 90,
                    yPercent: -130,
                    ease:"power1.out",
                    onComplete: function () {
                         gsap.set(star2, { scale: 0, yPercent: 50, xPercent: 0, rotate: 0});
                    }
               }, "-=1")
          })
     }

     action()
     function getRand(min,max){
          return Math.random() * (max - min) + min;
     }
     // START SPARKLES  END //////////////////////////////////////////////////////////////////////////////////////////
     /////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


// PAGE TO PAGE ANIMATION %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function pageToPage() {
          if(!isMobile()) {
               pageToPageAnim.to(pageBgWrap, {
                    transformOrigin: "top center",
                    yPercent: -100,
                    scale: .5,
                    rotate: -25,
                    duration: 1.5,
                    ease: "power4.inOut"
               })
               pageToPageAnim.to(pageBgWrap, {
                    yPercent: 100,
                    rotate: 25,
                    duration: 0.001,
                    ease: "none",
               })
               pageToPageAnim.to(pageBgWrap, {
                    yPercent: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 1.25,
                    ease: "power4"
               })
          } else if (isMobile()) {
              pageToPageAnim.to(pageBgWrap, {
                    transformOrigin: "center center",
                    yPercent: -100,
                    scale: .25,
                    rotate: -5,
                    duration: 1.5,
                    ease: "power4.inOut"
               })
               pageToPageAnim.to(pageBgWrap, {
                    yPercent: 100,
                    rotate: 5,
                    duration: 0.001,
                    ease: "none",
               })
               pageToPageAnim.to(pageBgWrap, {
                    yPercent: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 1.25,
                    ease: "power4"
               })
          }

        return pageToPageAnim


}

export function successMessage() {
     let form = document.querySelectorAll(".full-form")

     form.forEach(item => {
          let button = item.querySelector('input[type="submit"]')
          let elem = item.querySelectorAll("*:not(.success-message)")
          let title = item.querySelector("h3")
          let splitChars = new SplitText(title, { type: "words, chars" })
          let paragraph = item.querySelector("p")
          gsap.set(splitChars.chars, {
               transformOrigin: "bottom center",
               scaleY: 0,
               y: 50,
               rotateZ: 15
          })
          gsap.set(paragraph, {
               transformOrigin: "bottom center",
               y: 50,
          })
          let tl = gsap.timeline()
          let letterLoop = gsap.timeline({paused: true})
          letterLoop.to(splitChars.chars, {
               color: "#FECB04",
               scaleY: 1.6,
               rotateZ: -5,
               duration: .4,
               stagger: {
                     repeat: -1,
                    yoyo: true,
                    amount: .3
               },
               ease: "power2.in"
          })

        item.addEventListener('submit', async event => {
            event.preventDefault();
            event.stopImmediatePropagation();

            item.classList.add('sending');

            const formData = new FormData(event.target);
            let formObject = Object.fromEntries(formData);
            let bodyData = {};
            Object.entries(formObject).forEach(subitem => {
                if (subitem[0] === "fname") {
                    bodyData.fname = subitem[1];
                }
                else if (subitem[0] === "email") {
                    bodyData.email = subitem[1];
                }
                else if (subitem[0] === "message") {
                    bodyData.message = subitem[1];
                }
            })

            const token = await grecaptcha.execute('6LeMP-MrAAAAAC98Z3AOU-kIoe-nwcVKS9efV_ca', { action: 'submit' })
            bodyData.recaptchaToken = token


            // Fetch
            window.fetch('/contactform', {
                method: 'post',
                body: JSON.stringify(bodyData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    tl.to(elem, {
                        opacity: 0,
                        pointerEvents: "none",
                        duration: .5,
                        ease: "power4"
                    })
                    tl.to(title, {
                        opacity:1,
                        duration: .5,
                        ease: "power4"
                    }, "<")
                    tl.to(splitChars.chars, {
                        scaleY: 1,
                        duration: .4,
                        rotateZ: 0,
                        y: 0,
                        stagger: {
                            amount: .2
                        },
                        onComplete: () => {
                            letterLoop.play()
                        },
                        ease: "back"
                    },"<")
                    tl.to(paragraph, {
                        opacity:1,
                        y: 0,
                        duration: .5,
                        ease: "power4",
                    }, "-=.3")
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                })
                .finally(() => {
                    item.classList.remove('sending');
                    item.reset()
                });
        })
     })
}
