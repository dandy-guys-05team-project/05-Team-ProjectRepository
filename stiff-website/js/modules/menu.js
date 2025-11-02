export function menu() {

     let menuLink = gsap.utils.toArray(".page-link")
     // let navSplit = new SplitText(""#nav a", { type: "chars" })
     if(!isMobile()) {
          
          menuLink.forEach(item => {
               let navSplit = new SplitText(item, { type: "chars" })
               gsap.set(menuLink.chars, {transformOrigin: "bottom center"})  
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

               // HOVER ANIMATION /////////////////////////////////////////////////
               item.addEventListener("mouseenter", function() {
                    if(!item.classList.contains("selected")) {
                         tl.restart()
                    }
               })
          })
     }

     // // CHANGE ACTIVE CLASS /////////////////////////////////////////////////
     // menuLink.forEach(li => {
     //      li.addEventListener("mouseenter", function() {
     //           let nav = document.getElementById("nav");
     //           for (let i = 0; i < menuLink.length; i++) {
     //                menuLink[i].addEventListener("click", function() {
     //                     let current = document.getElementsByClassName("selected");
     //                     current[0].className = current[0].className.replace(" selected", "");
     //                     this.className += " selected";
     //                });
     //           }
               
     //      })   
     // })
     

     // SUBNAVIGATION ////////////////////////////////////////////////////////////////////////////////
     if(isMobile()) {


          let hamb = document.querySelector(".hamburger"),
               lineA = hamb.querySelector("i:first-of-type"),
               lineB = hamb.querySelector("i:nth-of-type(2)"),
               navBg = document.querySelector(".nav-bg"),
               linkCh = new SplitText(menuLink, { type: "chars" }),
               dur = .65,
               ease = "power4.inOut",
               hambNav = gsap.timeline({paused: true})

          gsap.set(menuLink, {transformOrigin: "bottom center"})
          hambNav.to(lineA, {
               top: "50%",
               rotate: 135,
               scaleX: .8,
               duration: dur,
               ease: ease
          })
          hambNav.to(lineB, {
               top: "50%",
               rotate: -135,
               scaleX: .8,
               duration: dur,
               ease: ease
          }, "<")
          hambNav.to(navBg, {
               height: "60vh",
               duration: dur,
               ease: ease
          }, "<")
          hambNav.to("#mobile-menu-bg", {
               opacity: .6,
               pointerEvents: "none",
               duration: dur,
               ease: ease
          }, "<")
          hambNav.to(linkCh.chars, {
               y: 0,
               rotate: 0,
               scaleY: 1,
               filter: "blur(0px)",
               opacity: 1,
               duration: dur * .8,
               color: "#F0ECD9",
               stagger: {
                    amount: .15
               },
               ease: "back",
          }, "-=.35")
          


          hamb.addEventListener("click", function(){
               if(!hamb.classList.contains("open") && !hambNav.isActive()) {
                    hambNav.restart()
                    hamb.classList.add("open")
                    document.querySelector("#nav").classList.add("active")
                    disableScroll()
               } else if((hamb.classList.contains("open") && !hambNav.isActive())) {
                    document.querySelector("#nav").classList.remove("active")
                    gsap.to(lineA, {
                         top: "45%",
                         rotate: 0,
                         scaleX: 1,
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(lineB, {
                         top: "55%",
                         rotate: 0,
                         scaleX: 1,
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(navBg, {
                         height: "50px",
                         duration: dur *.8,
                         ease: "power4.inOut"
                    })
                    gsap.to("#mobile-menu-bg", {
                         opacity: 0,
                         pointerEvents: "none",
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(linkCh.chars, {
                         y: "-120%",
                         rotate: 10,
                         scaleY: 1.5,
                         filter: "blur(5px)",
                         opacity: 0,
                         duration: dur,
                         color: "#D64B4B",
                         ease: "power4",
                    })


                    hamb.classList.remove("open")
                    enableScroll()
               }

          })

          // CLOSE NAV //////////////////////////////////////////////////////////
          menuLink.forEach(link => {
               link.addEventListener("click", function() {
                    document.querySelector("#nav").classList.remove("active")
                    gsap.to(lineA, {
                         top: "45%",
                         rotate: 0,
                         scaleX: 1,
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(lineB, {
                         top: "55%",
                         rotate: 0,
                         scaleX: 1,
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(navBg, {
                         height: "50px",
                         duration: dur *.8,
                         ease: "power4.inOut"
                    })
                    gsap.to("#mobile-menu-bg", {
                         opacity: 0,
                         pointerEvents: "none",
                         duration: dur,
                         ease: "power4"
                    })
                    gsap.to(linkCh.chars, {
                         y: "-120%",
                         rotate: 10,
                         scaleY: 1.5,
                         filter: "blur(5px)",
                         opacity: 0,
                         duration: dur,
                         color: "#D64B4B",
                         ease: "power4",
                    })


                    hamb.classList.remove("open")
                    enableScroll()
               })
          })


     }

}