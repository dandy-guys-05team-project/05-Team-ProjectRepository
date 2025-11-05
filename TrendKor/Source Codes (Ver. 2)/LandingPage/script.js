// Initialize CSS Marquee
function initCSSMarquee() {
  const pixelsPerSecond = 75; // Set the marquee speed (pixels per second)
  const marquees = document.querySelectorAll('[data-css-marquee]');
  
  // Duplicate each [data-css-marquee-list] element inside its container
  marquees.forEach(marquee => {
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      const duplicate = list.cloneNode(true);
      marquee.appendChild(duplicate);
    });
  });

  // Create an IntersectionObserver to check if the marquee container is in view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.querySelectorAll('[data-css-marquee-list]').forEach(list => 
        list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
      );
    });
  }, { threshold: 0 });
  
  // Calculate the width and set the animation duration accordingly
  marquees.forEach(marquee => {
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      list.style.animationDuration = (list.offsetWidth / pixelsPerSecond) + 's';
      list.style.animationPlayState = 'paused';
    });
    observer.observe(marquee);
  });
}

// Initialize Fade In Animations
function initFadeInAnimations() {
  // Select all elements with the `fade-in` attribute
  document.querySelectorAll('[fade-in]').forEach((el) => {
    // Create a ScrollTrigger animation for each element
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 }, // Start state: transparent and shifted down
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out", 
        scrollTrigger: {
          trigger: el, // Use the element as the trigger
          start: "top 90%", // Start animation when the element enters the viewport
          toggleActions: "play none none none" // Play animation once
        }
      }
    );
  });
}

// Initialize Highlight Text Animation
function initHighlightText() {
  let splitHeadingTargets = document.querySelectorAll("[data-highlight-text]");
  
  splitHeadingTargets.forEach((heading) => {
    // Define your default ScrollTrigger start point
    const scrollStart = heading.getAttribute("data-highlight-scroll-start") || "top 70%";
    
    // Default ScrollTrigger end point
    const scrollEnd = heading.getAttribute("data-highlight-scroll-end") || "center 40%";
    
    // Opacity of each letter before they start animating
    const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2;
    
    // Lower value here means a smoother reveal, feel free to test!
    const staggerValue = heading.getAttribute("data-highlight-stagger") || 0.1;
    
    new SplitText(heading, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        // use a context to collect up all the animations
        let ctx = gsap.context(() => {
          let tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: heading, 
              start: scrollStart,
              end: scrollEnd,
            }
          });
          tl.from(self.chars, {
            autoAlpha: fadedValue,
            stagger: staggerValue,
            ease: "linear"
          });
        });
        return ctx; // return our animations so GSAP can clean them up when onSplit fires
      }
    });    
  });
}

// Initialize Dynamic Current Year
function initDynamicCurrentYear() {  
  const currentYear = new Date().getFullYear();
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  currentYearElements.forEach(currentYearElement => {
    currentYearElement.textContent = currentYear;
  });
}

// Side Panel Search Wrapper Handler
function initSearchWrapper() {
  const searchIcon = document.querySelector(".side-menu_search-wrapper");
  const closeIcon = document.querySelector(".side-menu_x-icon");
  const searchWrapper = document.querySelector(".side-panel_search-wrapper");

  if (searchIcon && closeIcon && searchWrapper) {
    searchIcon.addEventListener("click", () => {
      searchWrapper.classList.add("is-active");
    });

    closeIcon.addEventListener("click", () => {
      setTimeout(() => {
        searchWrapper.classList.remove("is-active");
      }, 2500); // 2.5-second delay
    });
  }
}

// Navbar Functions
function addInvertedClass() {
  $(
    '.navbar_logo, .logo-frank, .navbar-mobile_logo, .navbar_link, .navbar_search-icon, ' +
    '.navbar_search-input, .navbar_search-button, .hamburguer_first-line, ' +
    '.hamburguer_second-line, .navbar-mobile_logo'
  ).addClass('inverted');
}

function removeInvertedClass() {
  $(
    '.navbar_logo, .logo-frank, .navbar-mobile_logo, .navbar_link, .navbar_search-icon, ' +
    '.navbar_search-input, .navbar_search-button, .hamburguer_first-line, ' +
    '.hamburguer_second-line, .navbar-mobile_logo'
  ).removeClass('inverted');
}

function addWhiteBG() {
  $('.navbar_component').addClass('white-bg');
}

function removeWhiteBG() {
  $('.navbar_component').removeClass('white-bg');
}

function showSmallMenu() {
  $('.nav-links_wrapper').addClass('large-menu-hide');
  $('.navbar_hamburguer-icon').addClass('small-menu-show');
}

function showLargeMenu() {
  $('.nav-links_wrapper').removeClass('large-menu-hide');
  $('.navbar_hamburguer-icon').removeClass('small-menu-show');
}

function isAtTop() {
  return $(window).scrollTop() <= 0;
}

function isDesktop() {
  return window.innerWidth > 991;
}

// Initialize Navbar
function initNavbar() {
  var $header = $('header');
  var $searchIcon = $('.navbar_search-icon');
  var $searchBar = $('.navbar_search');
  var $navLinks = $('.navbar_link');
  var $hamburgerIcon = $('.navbar_hamburguer-icon');
  var $sidePanel = $('.navbar_side-panel');
  var $sideMenuItems = $('.navbar_side-menu').children();
  var $sideMenuCloseIcon = $('.side-menu_x-icon');
  var $scrollUp = $('.scroll-up');
  var $scrollUpArrow = $('.scroll-up_arrow');
  var $navbar = $('.navbar_component');

  var $allDarkSections = $('[data-theme="dark"]');
  var $darkSections = $allDarkSections.not('.sticky-footer');
  var $body = $('body');
  var isDarkOnlyPage = $body.attr('data-nav-theme') === 'dark-only';

  // Safari Overscroll Fix
  $body.css({
    'overscroll-behavior': 'none',
    'overscroll-behavior-y': 'none'
  });

  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isMobile = window.innerWidth <= 767;
  
  if (isSafari && isMobile) {
    $(document).on('touchmove', function(e) {
      if ($(window).scrollTop() <= 0) {
        e.preventDefault();
      }
    }, { passive: false });
    
    var overscrollTimer;
    $(window).on('scroll', function() {
      var scrollTop = $(window).scrollTop();
      
      if (scrollTop < 0) {
        clearTimeout(overscrollTimer);
        overscrollTimer = setTimeout(function() {
          if ($header.length && $header.attr('data-theme') === 'dark') {
            addInvertedClass();
            removeWhiteBG();
          }
        }, 10);
      }
    });
  }

  // If dark-only page, force inverted and skip ScrollTrigger logic
  if (isDarkOnlyPage) {
    addInvertedClass();
    removeWhiteBG();
  } else {
    const $sections = $allDarkSections.add($header);

    // Set navbar state on initial page load
    if ($header.length && $header.attr('data-theme') === 'dark' && isAtTop()) {
      addInvertedClass();
      removeWhiteBG();
    } else {
      removeInvertedClass();
      removeWhiteBG();
    }

    // Set initial menu state on page load
    if ($header.length && isDesktop() && isAtTop()) {
      showLargeMenu();
    }

    // Enhanced ScrollTrigger logic
    $sections.each(function () {
      const $el = $(this);
      const isHeader = this === $header[0];
      const isDark = $el.attr('data-theme') === 'dark';
      
      ScrollTrigger.create({
        trigger: this,
        start: "top top",
        end: "bottom 50%",
        onEnter: () => {
          if (isDark) addInvertedClass();
          removeWhiteBG();
          
          if (isHeader && isDesktop()) {
            showLargeMenu();
          }
        },
        onLeave: () => {
          removeInvertedClass();
          addWhiteBG();
          
          if (isHeader && isDesktop() && !isAtTop()) {
            showSmallMenu();
          }
        },
        onEnterBack: () => {
          if (isDark) addInvertedClass();
          removeWhiteBG();
          
          if (isHeader && isDesktop()) {
            showLargeMenu();
          }
        },
        onLeaveBack: () => {
          if (isAtTop() && isHeader && isDark) {
            addInvertedClass();
            removeWhiteBG();
            if (isDesktop()) {
              showLargeMenu();
            }
          } else if (isAtTop() && isHeader) {
            removeInvertedClass();
            removeWhiteBG();
            if (isDesktop()) {
              showLargeMenu();
            }
          } else {
            removeInvertedClass();
            addWhiteBG();
            if (isHeader && isDesktop()) {
              showSmallMenu();
            }
          }
        },
        onRefresh: () => {
          if (isAtTop() && isHeader && isDark) {
            addInvertedClass();
            removeWhiteBG();
          }
          
          if (isHeader && isDesktop()) {
            if (isAtTop()) {
              showLargeMenu();
            } else {
              const rect = this.getBoundingClientRect();
              const isInHeader = rect.top <= 0 && rect.bottom > window.innerHeight * 0.5;
              
              if (isInHeader) {
                showLargeMenu();
              } else {
                showSmallMenu();
              }
            }
          }
        }
      });
    });

    // Additional scroll listener for overscroll handling
    let scrollTimeout;
    $(window).on('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        if (isAtTop() && $header.length && $header.attr('data-theme') === 'dark') {
          addInvertedClass();
          removeWhiteBG();
          if (isDesktop()) {
            showLargeMenu();
          }
        }
      }, 50);
    });
  }

  // Match Media: Desktop vs Mobile
  let mm = gsap.matchMedia();

  // Desktop Behavior
  mm.add("(min-width: 768px)", () => {
    // Search Bar Timeline
    let searchTimeline = gsap.timeline({ paused: true, reversed: true });
    if ($searchIcon.length && $searchBar.length && $navLinks.length) {
      searchTimeline
        .to($searchIcon, { duration: 0.2, opacity: 0, display: 'none' }, 0)
        .to($navLinks, { duration: 0.2, opacity: 0, display: 'none' }, 0)
        .fromTo(
          $searchBar,
          { x: '100%', opacity: 0, display: 'none' },
          { x: '0%', opacity: 1, display: 'block', duration: 0.5, ease: 'power2.out' },
          0.2
        );

      $searchIcon.on('click.searchDesktop', function(e) {
        e.stopPropagation();
        searchTimeline.play();
      });

      $(document).on('click.searchDesktop', function(e) {
        var insideSearchBar = $searchBar.is(e.target) || $searchBar.has(e.target).length > 0;
        var onSearchIcon = $searchIcon.is(e.target) || $searchIcon.has(e.target).length > 0;
        if (!insideSearchBar && !onSearchIcon && !searchTimeline.reversed()) {
          searchTimeline.reverse();
        }
      });
    }

    // Side Panel Timeline
    let sidePanelTimeline = gsap.timeline({ paused: true, reversed: true });
    if ($sidePanel.length && $hamburgerIcon.length && $sideMenuItems.length) {
      sidePanelTimeline
        .fromTo(
          $sidePanel,
          { x: '100%', display: 'none' },
          { x: '0%', display: 'block', duration: 0.5, ease: 'power2.out' }
        )
        .from(
          $sideMenuItems,
          { opacity: 0, y: 20, duration: 0.3, stagger: 0.1 },
          '-=0.3'
        );

      $hamburgerIcon.on('click.desktopMenu', function(e) {
        e.stopPropagation();
        sidePanelTimeline.play();
      });

      if ($sideMenuCloseIcon.length) {
        $sideMenuCloseIcon.on('click.desktopMenu', function(e) {
          e.stopPropagation();
          sidePanelTimeline.reverse();
        });
      }

      $(document).on('click.desktopMenu', function(e) {
        var insideSidePanel = $sidePanel.is(e.target) || $sidePanel.has(e.target).length > 0;
        var onHamburgerIcon = $hamburgerIcon.is(e.target) || $hamburgerIcon.has(e.target).length > 0;
        if (!insideSidePanel && !onHamburgerIcon && !sidePanelTimeline.reversed()) {
          sidePanelTimeline.reverse();
          lenis.start();
        }
      });
    }

    return () => {
      $searchIcon.off('.searchDesktop');
      $(document).off('.searchDesktop');
      $hamburgerIcon.off('.desktopMenu');
      $sideMenuCloseIcon.off('.desktopMenu');
      $(document).off('.desktopMenu');
    };
  });

  // Mobile Behavior
  mm.add("(max-width: 767px)", () => {
    if ($hamburgerIcon.length) {
      $hamburgerIcon.css({ display: 'flex', opacity: 1 });
    }

    let sidePanelMobileTimeline = gsap.timeline({ paused: true, reversed: true });
    if ($sidePanel.length && $hamburgerIcon.length && $sideMenuItems.length) {
      sidePanelMobileTimeline
        .fromTo(
          $sidePanel,
          { y: '-100%', display: 'none' },
          { y: '0%', display: 'flex', duration: 0.3, ease: 'power2.out' }
        )
        .from(
          $sideMenuItems,
          { opacity: 0, y: 20, duration: 0.3, stagger: 0.1 },
          '-=0.3'
        )
        .add(() => {
          $('.navbar-mobile_logo').addClass('inverted');
        }, 0)
        .eventCallback("onReverseComplete", function() {
          $('.navbar-mobile_logo').removeClass('inverted');
        });

      $hamburgerIcon.on('click.mobileMenu', function(e) {
        e.stopPropagation();
        sidePanelMobileTimeline.play();
      });

      if ($sideMenuCloseIcon.length) {
        $sideMenuCloseIcon.on('click.mobileMenu', function(e) {
          e.stopPropagation();
          sidePanelMobileTimeline.reverse();
        });
      }

      $(document).on('click.mobileMenu', function(e) {
        var insideSidePanel = $sidePanel.is(e.target) || $sidePanel.has(e.target).length > 0;
        var onHamburgerIcon = $hamburgerIcon.is(e.target) || $hamburgerIcon.has(e.target).length > 0;
        if (!insideSidePanel && !onHamburgerIcon && !sidePanelMobileTimeline.reversed()) {
          sidePanelMobileTimeline.reverse();
          lenis.start();
        }
      });
    }

    return () => {
      $hamburgerIcon.off('.mobileMenu');
      $sideMenuCloseIcon.off('.mobileMenu');
      $(document).off('.mobileMenu');
    };
  });

  // Show/Hide .scroll-up after header
  if ($header.length && $scrollUp.length) {
    gsap.set($scrollUp, { opacity: 0, display: 'none' });
    ScrollTrigger.create({
      trigger: $header,
      start: "bottom top",
      onEnter: () => gsap.to($scrollUp, { duration: 0.3, opacity: 1, display: 'block' }),
      onLeaveBack: () => gsap.to($scrollUp, { duration: 0.3, opacity: 0, display: 'none' })
    });
  }

  // Invert .scroll-up_arrow for other dark sections
  $darkSections.each(function() {
    if ($header.length && this === $header[0]) return;

    ScrollTrigger.create({
      trigger: this,
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => $scrollUpArrow.addClass('inverted'),
      onLeave: () => $scrollUpArrow.removeClass('inverted'),
      onEnterBack: () => $scrollUpArrow.addClass('inverted'),
      onLeaveBack: () => $scrollUpArrow.removeClass('inverted')
    });
  });

  // Refresh triggers after page load
  $(window).on('load', function() {
    if ($header.length && $header.attr('data-theme') === 'dark' && isAtTop()) {
      addInvertedClass();
      removeWhiteBG();
    }
    ScrollTrigger.refresh();
  });

  // Listen for scrolling to top
  $(window).on("scroll", function() {
    if ($(window).scrollTop() === 0) {
      if ($header.length && $header.attr('data-theme') === 'dark') {
        addInvertedClass();
      } else {
        removeInvertedClass();
      }
    }
  });
}

// Navbar slide up/down on scroll
function initNavbarSlide() {
  if (
    !window.location.pathname.startsWith('/team') && 
    !window.location.pathname.startsWith('/insights') &&
    !window.location.pathname.startsWith('/our-people') &&
    !window.location.pathname.startsWith('/search')
  ) {
    let previousScroll = window.scrollY;
    let navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
      let currentScroll = window.scrollY;

      if (currentScroll > previousScroll && currentScroll > 50) {
        gsap.to(navbar, { y: "-100%", duration: 0.75, ease: "power2.out" });
      } else if (currentScroll < previousScroll) {
        gsap.to(navbar, { y: "0%", duration: 1.25, ease: "power2.out" });
      }

      previousScroll = currentScroll;
    });
  }
}

// News CMS Card Sorting
function initNewsCMSCard() {
  setTimeout(() => {
    const container = document.getElementById("combined-list");
    if (!container) return;

    const items = Array.from(container.querySelectorAll(".home-news_item"));

    const sortedItems = items.sort((a, b) => {
      const dateA = new Date(a.querySelector(".news-card_date").textContent.trim());
      const dateB = new Date(b.querySelector(".news-card_date").textContent.trim());
      return dateB - dateA;
    });

    const limitedItems = sortedItems.slice(0, 4);

    container.innerHTML = "";
    limitedItems.forEach(item => container.appendChild(item));
  }, 500);
}

// Initialize Lenis Smooth Scroll
let lenis;

function initLenis() {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  $("[data-lenis-start]").on("click", function (e) {
    if (e.target === this) {
      console.log('Enabling scroll');
      lenis.start();
    }
  });

  $("[data-lenis-stop]").on("click", function (e) {
    if (e.target === this) {
      console.log('Disabling scroll');
      lenis.stop();
    }
  });

  $("[data-lenis-toggle]").on("click", function (e) {
    if (e.target === this) {
      $(this).toggleClass("stop-scroll");
      if ($(this).hasClass("stop-scroll")) {
        console.log('toggle stop');
        lenis.stop();
      } else {
        console.log('toggle start');
        lenis.start();
      }
    }
  });
}

// Initialize all functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initCSSMarquee();
  initFadeInAnimations();
  initHighlightText();
  initDynamicCurrentYear();
  initSearchWrapper();
  initNavbarSlide();
  initNewsCMSCard();
  initLenis();
  
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize navbar with jQuery
  $(document).ready(function() {
    initNavbar();
  });
});
