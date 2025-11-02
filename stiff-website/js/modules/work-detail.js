export function workDetail() {
     // WORK ITEM HOVER //////////////////////////////////////////////////////////////////////////
     if(!isMobile()) {
          let item = document.querySelectorAll("#work-assets article").forEach(i => {

               let title = i.querySelector("h2")
               let play = i.querySelector(".play-ico")
               let img = i.querySelector(".video-wrap img")
               let tl = gsap.timeline({paused: true})
                    
               tl.to(play, {
                    rotate: 0,
                    y: 0,
                    scale: 1,
                    duration: .35,
                    ease: "back"
               })
               tl.to(title, {
                    rotate: 0,
                    y: 0,
                    scale: 1,
                    duration: .35,
                    ease: "back"
               }, "-=.25")

               i.addEventListener("mouseenter", function(){
                    tl.timeScale(1);
                    tl.play()
                    gsap.to(img, {
                         scale: 1.025,
                         duration: .35,
                         ease: "back"
                    })

                    
               })
               i.addEventListener("mouseleave", function(){
                    tl.timeScale(1.5);
                    tl.reverse()
                    gsap.to(img, {
                         scale: 1,
                         duration: .6,
                         ease: "power3"
                    })
               })
          
          })
     }


     if(!isMobile() && window.innerWidth < 2200) {
     // PIN VIDEO //////////////////////////////////////////////////////////////////////////////////////////
          let workHeader = document.querySelector(".work-header")
          let workHeight = workHeader.offsetHeight + 80
          let pDetail = document.querySelector(".project-details")
          let pWidth = pDetail.offsetWidth + 20
          let video = document.querySelector(".video-image")
          let videoImg = document.querySelector(".video-scroll-pos img")
          let height = document.querySelector("#hero").offsetHeight
          let containerBounds = document.querySelector(".video-scroll-pos")
          
          // SCALAE VIDEO ///////////////////////////////////////////////////
          let oldSize = video.getBoundingClientRect()
          let oldDim = {height: oldSize.height, width: oldSize.width, top: oldSize.top}
          let newSize = containerBounds.getBoundingClientRect()
          let newDim = {height: newSize.height, width: newSize.width, top: newSize.top}
          // console.log(dimensions.top)

          gsap.set([video, videoImg], {transformOrigin: "bottom left"})
          gsap.set(containerBounds, {
               width: oldDim.width,
               height: oldDim.height
          })
          let vidAnim = gsap.timeline({
               scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: () => height * 2,
                    toggleActions: "play pause play pause",
                    scrub: true,
                    pin: true
               }
          })
          vidAnim.to(pDetail, {
               x: () => pWidth,
               duration: 1,
               ease: "linear"

          })
          vidAnim.to(workHeader, {
               y: () => -workHeight,
               duration: 1,
               ease: "linear"

          }, "<")
          vidAnim.to(containerBounds, {
               width: newDim.width,
               height: newDim.height,
               duration: 1,
               ease: "linear"

          }, "<")
     }



     // OPEN VIDEO //////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  let items = document.querySelectorAll(".work-detail .video-detail"),
    closeVid = document.querySelector(".video-close"),
    vidSrc,
    vidModal = gsap.timeline()


    ////// HOVERING ITEMS ///////////////////////////////////////////////////////////////////////////////////////////////////
    items.forEach(item => {

        // OPEN VIDEO MODAL
        item.addEventListener("click", function() {
            if(!isMobile()) {
                smoother.paused(true)
            }
            let thisData = item.dataset.project,
            thisVideo = document.querySelector(`[data-video="${thisData}"]`),
            thisFrame = thisVideo.querySelector("iframe"),
            label = thisVideo.querySelector(".caption")

            let frameSrc = thisFrame.src
            frameSrc += '&autoplay=1'
            thisFrame.src = 'about:blank'
            thisFrame.src = frameSrc
            
            vidSrc = thisFrame.src
            gsap.set(thisFrame, {yPercent: -35})
            gsap.set(label, {opacity: 0})

            closeVid.dataset.open = thisData;

            vidModal.to(".video-bg", {
                y: "-0%",
                rotate: 0,
                scale: 1,
                duration: 1,
                ease: "expo.inOut",
                onStart: ()=> {
                    gsap.to("#video-wrap", {
                        pointerEvents: "auto",
                    })
                    gsap.set(thisVideo, {zIndex: 2})
                    gsap.to(thisFrame, {
                        display: "block",
                    })
                }
            })
            vidModal.to("#menu", {
                opacity: 0,
                duration: .5,
                ease: "expo",
                pointerEvents: "none",
            }, "<")
            vidModal.to(thisFrame, {
                opacity: 1,
                rotate: 0,
                yPercent: 0,
                duration: 1,
                ease: "expo"
            },"-=.4")
            vidModal.to(closeVid, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "expo",
            }, "-=.7")
            vidModal.to(label, {
                opacity: 1,
                duration: 1,
                ease: "expo"
            },"-=.7")

            item.classList.add("active")
            return vidSrc
        })

    })

    closeVid.addEventListener("click", function() {
        let thisData = closeVid.dataset.open,
        thisVideo = document.querySelector(`[data-video="${thisData}"]`),
        thisFrame = thisVideo.querySelector("iframe"),
          label = thisVideo.querySelector(".caption")


        vidModal.to(closeVid, {
            opacity: 0,
            duration: .5,
            y: "-100%",
            ease: "expo.in",
        })
          vidModal.to(label, {
               opacity: 0,
               duration: .5,
               ease: "expo"
          },"<")
        vidModal.to(thisFrame, {
            opacity: 0,
            rotate: -10,
            duration: .5,
            yPercent: -25,
            ease: "expo.in",
            onComplete: () => {
                gsap.to(thisFrame, {
                    display: "none"
                })
                const frameSrc = thisFrame.src.replace('&autoplay=1', '')
                thisFrame.src = frameSrc
            }
        },"-=.4")
        vidModal.to(".video-bg", {
          scale: .8,
          y: "-110%",
          rotate: -15,
          duration: 1,
          ease: "expo",
          onStart: ()=> {
               gsap.to("#video-wrap", {
                    pointerEvents: "none",
                })
                if(!isMobile()) {
                    smoother.paused(false)
                }
                delete  closeVid.dataset.open
            },
            onComplete: ()=> {
                gsap.set(thisVideo, {zIndex: "auto"})
            },
        })
        vidModal.to("#menu", {
            opacity: 1,
            duration: .5,
            ease: "power4",
            pointerEvents: "auto",
        }, "<")
    })
     


};