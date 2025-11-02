gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
gsap.config({nullTargetWarn: false,});


// HTML TAGS
const bodyTag = document.querySelector("body")
const wrapperTag = document.querySelector("#smooth-wrapper")
const contentTag = document.querySelector("#smooth-content")
const menuTag = document.querySelector("#menu")
let pageToPageAnim = gsap.timeline({paused: true})
let introMaster = gsap.timeline({paused: false})
let pageBgWrap = document.querySelector("#transition-bg")


// IS MOBILE CONDITION
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
} 

// DEFINE OUR CUSTOM EASE
let customVal = "M0,0 C0,0 0.09,0.258 0.2,0.511 0.375,0.914 0.465,1.29 0.688,1.131 0.871,1 1,1 1,1"
let customEase = CustomEase.create("custom",customVal)


// LOTTIE VARS
let teethLottie
let cameraLottie
let carLottie
let eyesLottie
let modalLottie
let logoLottie

// FONT LOADER///////////////////////////////////////////////////////////////
let fontLoadA = new FontFaceObserver('Grand Bold');
let fontLoadB = new FontFaceObserver('PP Neue Montreal');

// HOME PAGE TEETH LOTTIE ////////////////////////////////////////////////////////////////////////
function teethPlay() {
     let topVal
     if(window.innerWidth <= 1920) {
          topVal = "+=80"
     } else if (window.innerWidth > 1920) {
          topVal = "+=100"
     }
     if(!isMobile()) {
          let heroScroll = gsap.to(".hybrid-scroll", {
               x: () => {
                    return - (document.querySelector("#hero").offsetWidth - (window.innerWidth / 140 ))
               }, 
               ease: "none", // <-- IMPORTANT!
               scrollTrigger: {
                    trigger: "#hero",
                    pin: ".hybrid-scroll",
                    start: `"top ${topVal}"`,
                    end: () => "+=" + window.innerWidth,
                    scrub: 0.1,
                    invalidateOnRefresh: true,
                    onEnter: () => {
                         teethLottie.play()
                    },
                    onEnterBack: () => {
                         teethLottie.play()
                    },
                    onLeave: () => {
                         teethLottie.pause()
                    },
               }
          });
     }

}


// DISABLE SCROLL ON mobile //////////////////////////////////////////////////////////////////////////////
let keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
     e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
     if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
     }
}
// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
     window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () { supportsPassive = true; } 
     }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
     window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
     window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
     window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
     window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScroll() {
     window.removeEventListener('DOMMouseScroll', preventDefault, false);
     window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
     window.removeEventListener('touchmove', preventDefault, wheelOpt);
     window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}







// SMOOTH SCROLLING /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let smoother
function smoothScroll() {
    if(!isMobile() && window.innerWidth > 768 ) {
        smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
            //smoothTouch: .1
            effects: true, // looks for data-speed and data-lag attributes on elements
            normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
            // ease: "elastic"
            //ignoreMobileResize: true // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
        });
    
        const scrollTo = gsap.utils.toArray(".scroll-down")
        scrollTo.forEach(st => {
            const scrollTarget = st.dataset.scroll
            st.addEventListener("click", function() {
               // smoother.scrollTo("#" + scrollTarget, true, "top 80px")
               gsap.to(smoother, {
                    scrollTop: smoother.offset("#" + scrollTarget, "top 80px"),
                    duration: 1,
                    ease: "power1.inOut"
               })
            })
        })
        
    
        return smoother   
    }
}
