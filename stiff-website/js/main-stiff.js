// IMPORT MODULES /////////////////////////////////////////////////////////////////////////////////
// import { bgNoise } from "/js/modules/bg-noise.js";
import { lottie } from "/js/modules/lottie.js";
import { menu } from "/js/modules/menu.js";
import { heroAnim } from "/js/modules/hero-animation.js";
import { textAnim } from "/js/modules/text-anim.js";
import { footerBtn } from "/js/modules/footer-button.js";
import { dragSlider } from "/js/modules/drag-slider.js";
import { directionSpin, inView, boxIn, workBoxHover, superMarquee, textLink, starSparkle, pageToPage, successMessage } from "/js/modules/small-animations.js";
import { lazyLoad } from "/js/modules/lazy-load.js";
import { lazyVideo } from "/js/modules/lazy-video.js";
import { mainPlay } from "/js/modules/video-main.js";
import { homePage } from "/js/modules/home-page.js";
import { work } from "/js/modules/work-page.js";
import { workDetail } from "/js/modules/work-detail.js";
import { about } from "/js/modules/about.js";
import { contact } from "/js/modules/contact.js";
import { capabilities } from "/js/modules/capabilities.js";


//==============================================================================================================
// Smooth scrolling and scroll to top on refresh enabled ========================================================
//==============================================================================================================
window.scrollTo(0, 0)
document.documentElement.className = 'js';


// HOME PAGE INTRO ANIMATION ===========================================================================
const intro = function() {
     let distance
     if(!isMobile() && window.innerWidth > 768) {
               distance = 300
     } else {
               distance = 100
     }
	if(!isMobile() && document.querySelector(".home") && document.querySelector("body").classList.contains("loading")) {
		Promise.all([fontLoadA.load()], [fontLoadB.load()]).then(function () {
               smoothScroll()
			lottie()
			// INTRO ANIMATION VARS ///////////////////////////////////////////////////
               let dur = .7
               let items = gsap.utils.toArray("#introAnim path"),
                         introAnim = gsap.timeline(),
                         heroEl = document.querySelector(".hero-icon"),
                         heroChars = new SplitText(".hero.chars:not(.init-hide)", { type: "lines, chars" }),
                         initHide = new SplitText(".init-hide", { type: "lines, chars" }),
                         heroLaughs = new SplitText(".hero.laughs", { type: "lines, chars" }),
                         bigText = new SplitText(".text-scale", { type: "lines, chars" }),
                         rightEl = gsap.utils.toArray(".hero-right"),
                         textLeft = document.querySelector("#hero .text-left"),
                         textRight = document.querySelector("#hero .text-right"),
                         redTitle = document.querySelector(".hero.laughs"),
                         overlay = document.querySelector(".overlay"),
                         headline = document.querySelector("#hero h1"),
                         logoAnim = document.querySelector("#logo-lottie")


               // INITIAL STAGE ////////////////////////////////////////////////////////
               smoother.paused(true)

               gsap.set(heroChars.chars, {
                    transformOrigin: "bottom right",
                    y: distance,
                    scale: .7,
                    rotate: 60,
                    color: "#e2dab4",
                    opacity: 0,
                    filter: "blur(5px)",
               })
               gsap.set(heroLaughs.chars, {
                    transformOrigin: "bottom right",
                    y: distance,
                    scale: .7,
                    rotate: 60,
                    opacity: 0,
                    filter: "blur(5px)",
               })
               gsap.set(bigText.chars, {scaleY: 0, transformOrigin: "bottom left", color: "#e2dab4"})
               gsap.set(heroEl, {opacity: 0, scaleY: .2, scaleX: .8, y: 100, transformOrigin: "bottom center"})
               gsap.set(rightEl, {x: "33vw"})
               gsap.set(menuTag, {opacity: 0})
               gsap.set(textLeft, {xPercent: 40})
               gsap.set(textRight, {xPercent: -40})
               gsap.set(overlay, {x: 0})
               gsap.set(headline, {x: "15vw"})
               gsap.set(redTitle, {x: "15vw"})
               gsap.set(logoAnim, {scale: .45, yPercent: -50, xPercent: -50})

               introAnim.to(logoAnim, {
                    scale: .8,
                    duration: 2.25,
                    delay: .2,
                    onStart: () => {
                         gsap.to("#smooth-wrapper", {opacity: 1, duration: .3, ease: "power2"})
                         setTimeout(() => {
                              logoLottie.play()
                         }, 300)
                    },
                    ease: "power4"
               })
               introAnim.to(logoAnim, {
                    yPercent: -220,
                    duration: 1,
                    scale: .25,
                    ease: "back.inOut"
               })
               introAnim.to(heroChars.chars, {
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: dur,
                    stagger: {
                         amount: .3
                    },
                    onStart: () => {
                         gsap.to("#smooth-wrapper", {opacity: 1, duration: .25, ease: "power2"})
                    },
                    ease: "back"
               }, "-=.4")
               introAnim.to(heroLaughs.chars, {
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: dur,
                    ease: "back"
               }, "<")
               introAnim.to(bigText.chars, {
                    scaleY: 1,
                    duration: .5,
                    stagger: {
                         amount: .2
                    },
                    ease: "back"
               }, "-=.55")
               // SWITCHING LAYOUT ///////////////////////////////////////
               introAnim.to([redTitle, headline], {
                    x:0,
                    duration: 1.5,
                    ease: "power4.inOut"
               })
               introAnim.to([textLeft, textRight], {
                    xPercent:0,
                    duration: 1.5,
                    ease: "power4.inOut"
               }, "<")
               introAnim.to([heroChars.chars, bigText.chars], {
                    color: "#F0ECD9",
               }, "<")
               introAnim.to(overlay, {
                    xPercent:-100,
                    duration: 1.5,
                    ease: "power4.inOut"
               }, "<")
               introAnim.to(rightEl, {
                    x:0,
                    duration: 1.5,
                    stagger: {
                         amount: .15
                    },
                    onStart: () => {
                         menu()
                    },
                    ease: "power3.inOut"
               }, "<")
               introAnim.to(heroEl, {
                    y: -30,
                    scaleY: 1.1,
                    scaleX: .9,
                    opacity: 1,
                    rotate: -10,
                    duration: .7,
                    ease: "back",
                    onStart: () => {
                         teethPlay()
                         lazyLoad()
                         lazyVideo()
                         homePage()
                         textLink()
                         workBoxHover()
                         bodyTag.classList.remove("loading")
                         logoAnim.style.display = "none";
                    }
               }, "-=.7")
               introAnim.to(heroEl, {
                    y: 0,
                    scaleY: 1,
                    scaleX: 1,
                    rotate: 0,
                    duration: .4,
                    ease: "power4",
               })
               introAnim.to(menuTag, {
                    opacity: 1,
                    duration: .5,
                    ease: "power3.out",
                    onComplete: ()=> {
                        smoother.paused(false)
                    }
               }, "-=.7")
		})
	}

     // MOBILE INTRO LOADING ///////lazyLoad()
     if(isMobile() && document.querySelector(".home") && document.querySelector("body").classList.contains("loading")) {
          Promise.all([fontLoadA.load()], [fontLoadB.load()]).then(function () {
			lottie()
			// INTRO ANIMATION VARS ///////////////////////////////////////////////////
               let dur = .7
               let items = gsap.utils.toArray("#introAnim path"),
                         introAnim = gsap.timeline(),
                         heroEl = document.querySelector(".hero-icon"),
                         heroChars = new SplitText(".hero.chars:not(.init-hide)", { type: "lines, chars" }),
                         initHide = new SplitText(".init-hide", { type: "lines, chars" }),
                         heroLaughs = new SplitText(".hero.laughs", { type: "lines, chars" }),
                         bigText = new SplitText(".text-scale", { type: "lines, chars" }),
                         rightEl = gsap.utils.toArray(".hero-right:first-of-type"),
                         textLeft = document.querySelector("#hero .text-left"),
                         textRight = document.querySelector("#hero .text-right"),
                         overlay = document.querySelector(".overlay"),
                         logoAnim = document.querySelector("#logo-lottie")

               // INITIAL STAGE ////////////////////////////////////////////////////////
               gsap.set(heroChars.chars, {
                    transformOrigin: "bottom right",
                    y: distance,
                    scale: .7,
                    rotate: 60,
                    opacity: 0,
                    filter: "blur(5px)",
               })
               gsap.set(heroLaughs.chars, {
                    transformOrigin: "bottom right",
                    y: distance,
                    scale: .7,
                    rotate: 60,
                    opacity: 0,
                    filter: "blur(5px)",
               })
               gsap.set(bigText.chars, {scaleY: 0, transformOrigin: "bottom left"})
               gsap.set(heroEl, {opacity: 0, y: 100})
               gsap.set(rightEl, {y: "20vh", opacity: 0})
               gsap.set(menuTag, {opacity: 0})
               gsap.set(overlay, {x: 0, y: 0})

               gsap.set(logoAnim, {scale: .45, yPercent: -50, xPercent: -50})

               introAnim.to(logoAnim, {
                    scale: .8,
                    duration: 2.25,
                    delay: .2,
                    onStart: () => {
                         gsap.to("#smooth-wrapper", {opacity: 1, duration: .3, ease: "power2"})
                         setTimeout(() => {
                              logoLottie.play()
                         }, 300)
                    },
                    ease: "power4"
               })
               introAnim.to(logoAnim, {
                    yPercent: -520,
                    duration: 1,
                    scale: .25,
                    ease: "back.inOut"
               })
               introAnim.to(overlay, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.out"
               }, "-=.5")
               introAnim.to(heroChars.chars, {
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: dur,
                    stagger: {
                         amount: .3
                    },
                    ease: "back"
               }, "-=.75")
               introAnim.to(heroLaughs.chars, {
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: dur,
                    ease: "back"
               }, "<")
               introAnim.to(bigText.chars, {
                    scaleY: 1,
                    duration: .5,
                    stagger: {
                         amount: .2
                    },
                    ease: "back"
               }, "-=.55")
               introAnim.to(heroEl, {
                    y: 0,
                    opacity: 1,
                    duration: .8,
                    ease: "power4",
                    onStart: () => {
                         teethPlay()
                         lazyLoad()
                         homePage()
                         textLink()
                         workBoxHover()
                         logoAnim.style.display = "none";
                    }
               }, "<")
               introAnim.to(rightEl, {
                    y:0,
                    opacity: 1,
                    duration: 1,
                    stagger: {
                         amount: .2
                    },
                    onStart: () => {
                         menu()
                    },
                    ease: "power4.out"
               }, "<")
               introAnim.to(menuTag, {
                    opacity: 1,
                    duration: .5,
                    ease: "power3.out",
                    onStart: () => {
                         bodyTag.classList.remove("loading")
                    }
               }, "-=.7")
		})
     }
}
intro()
pageToPage()




// WORK PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".work")) {
	bodyTag.classList.remove("loading")
	smoothScroll()
     lottie()
     heroAnim()
     lazyLoad()
     lazyVideo()
     work()
     boxIn()
     workBoxHover()
     directionSpin()
     superMarquee()
     footerBtn()
     starSparkle()
     textAnim()
     inView()
     textLink()
     menu()
     successMessage()

}
// WORK DETAIL PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".work-detail")) {
	bodyTag.classList.remove("loading")
	smoothScroll()
     lottie()
     heroAnim()
     lazyLoad()
     lazyVideo()
     workDetail()
     boxIn()
     workBoxHover()
     superMarquee()
     footerBtn()
     starSparkle()
     textAnim()
     inView()
     textLink()
     menu()
     successMessage()
}
// ABOUT PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".about")) {
     bodyTag.classList.remove("loading")
     smoothScroll()
     lottie()
     heroAnim()
     lazyLoad()
     about()
     dragSlider()
     textAnim()
     boxIn()
     workBoxHover()
     superMarquee()
     footerBtn()
     starSparkle()
     inView()
     textLink()
     menu()
     successMessage()
}
// NEWS PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".news")) {
     bodyTag.classList.remove("loading")
     smoothScroll()
     heroAnim()
     lazyLoad()
     textAnim()
     boxIn()
     superMarquee()
     footerBtn()
     starSparkle()
     textLink()
     menu()
     successMessage()
}

// NEWS PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".contact")) {
     bodyTag.classList.remove("loading")
     smoothScroll()
     heroAnim()
     contact()
     lazyLoad()
     textAnim()
     boxIn()
     footerBtn()
     starSparkle()
     textLink()
     menu()
     successMessage()
}
// CAPABILITIES PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (document.querySelector(".capabilities")) {
     bodyTag.classList.remove("loading")
     smoothScroll()
     lottie()
     heroAnim()
     lazyLoad()
     lazyVideo()
     textAnim()
     boxIn()
     workBoxHover()
     capabilities()
     footerBtn()
     starSparkle()
     inView()
     textLink()
     menu()
     successMessage()

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX REQUESTS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Outter link click
$('.page-link').click(function (e) {
	e.preventDefault();
	var content = $('#smooth-wrapper').smoothState().data('smoothState');
	var href = $(this).attr('href');
	content.load(href);
  });

// Smoothstate function
$(function () {
'use strict';

     let navItem,
          thisHref

	var options = {
		prefetch: true,
		cacheLength: 1,
		onStart: {
			duration: 1600, // Duration of our animation
			render: function ($container) {
				// Add your CSS animation reversing class
				$container.addClass('is-exiting');
				// Restart your animation
				// smoothState.restartCSSAnimations();
                    gsap.to(wrapperTag, {opacity: 0, duration: .5, ease: "power2.in"})
                    pageToPageAnim.restart()
			}
		},
		onReady: {
               duration: 100,
			render: function ($container, $newContent) {
                    if(document.querySelector('nav .page-link.selected')) document.querySelector('nav .page-link.selected').classList.remove('selected')
                    const pages = ['work', 'news', 'about', 'contact', 'capabilities']
                    const pagePathName = window.location.pathname.split('/')[1]
                    if(pages.includes(pagePathName)) document.querySelector(`nav .page-link.nav-${pagePathName}`).classList.add('selected')
				// Remove your CSS animation reversing class
				$container.html($newContent);
				//Refresh scrollTriggers
                    gsap.set(wrapperTag, { opacity: 0})
                    gsap.to(wrapperTag,{opacity: 1, y: 0, duration: .3, delay: 1, ease: "power2.out", clearProps: "transform"})

				ScrollTrigger.killAll( );

                    setTimeout(function() {
                         window.scrollTo(0, 1);
                    }, 100);

                    // // MENU MODE
                    // if(document.querySelector(".capabilities")) {
                    //      document.querySelector("#menu").classList.remove("dark")
                    //      document.querySelector("#menu").classList.add("white")
                    // } else {
                    //      document.querySelector("#menu").classList.remove("white")
                    //      document.querySelector("#menu").classList.add("dark")
                    // }
			}
		},
		onAfter: function ($container) {
               $container.removeClass('is-exiting');
               // RUN PAGE PAGE ANIMATION


               setTimeout(function() {
                    ScrollTrigger.refresh();
               }, 200)


               // work PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".home")) {
                    smoothScroll()
                    lottie()
                    heroAnim()
                    lazyLoad()
                    lazyVideo()
                    homePage()
                    textLink()
                    workBoxHover()

               }
               // work PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".work")) {
                    smoothScroll()
                    heroAnim()
                    lottie()
                    lazyLoad()
                    lazyVideo()
                    work()
                    workBoxHover()
                    directionSpin()
                    superMarquee()
                    textAnim()
                    footerBtn()
                    starSparkle()
                    inView()
                    textLink()
                    boxIn()
                    successMessage()
               }
               // work PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".work-detail")) {
                    smoothScroll()
                    lottie()
                    heroAnim()
                    lazyLoad()
                    lazyVideo()
                    workDetail()
                    workBoxHover()
                    superMarquee()
                    textAnim()
                    footerBtn()
                    starSparkle()
                    inView()
                    textLink()
                    boxIn()
                    successMessage()

               }
               // work PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".about")) {
                    smoothScroll()
                    lottie()
                    heroAnim()
                    lazyLoad()
                    about()
                    textAnim()
                    boxIn()
                    superMarquee()
                    footerBtn()
                    starSparkle()
                    inView()
                    textLink()
                    dragSlider()
                    successMessage()
               }

               // NEWS PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".news")) {
                    smoothScroll()
                    heroAnim()
                    lazyLoad()
                    textAnim()
                    boxIn()
                    superMarquee()
                    footerBtn()
                    starSparkle()
                    textLink()
                    successMessage()
               }

               // NEWS PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".contact")) {
                    smoothScroll()
                    heroAnim()
                    textAnim()
                    lazyLoad()
                    footerBtn()
                    starSparkle()
                    textLink()
                    contact()
                    boxIn()
                    successMessage()
               }

               // CAPABILITIES PAGE SCRIPTS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               if (document.querySelector(".capabilities")) {
                    bodyTag.classList.remove("loading")
                    smoothScroll()
                    lottie()
                    heroAnim()
                    lazyLoad()
                    lazyVideo()
                    textAnim()
                    boxIn()
                    workBoxHover()
                    capabilities()
                    footerBtn()
                    starSparkle()
                    inView()
                    textLink()
                    successMessage()

               }
		},
	},
	smoothState = $("#smooth-wrapper").smoothState(options).data('smoothState');
});
