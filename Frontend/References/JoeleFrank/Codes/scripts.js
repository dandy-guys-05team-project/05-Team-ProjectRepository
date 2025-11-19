// Lenis Smooth Scroll Configuration
let lenis = new Lenis({
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

// Lenis Event Handlers
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

// GSAP ScrollTrigger and Fade-in Animations
gsap.registerPlugin(ScrollTrigger);

// Track animated elements to prevent duplicate animations
let animatedElements = new Set();

function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('[fade-in]');
  console.log(`Initializing fade-in animations for ${fadeElements.length} elements`);
  
  fadeElements.forEach((el, index) => {
    // Skip if element is already animated
    if (animatedElements.has(el)) {
      console.log(`Element ${index} already animated, skipping`);
      return;
    }
    
    console.log(`Animating element ${index}:`, el);
    animatedElements.add(el);
    el.classList.add('gsap-animated');
    
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out", 
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
          onEnter: () => console.log(`Fade-in animation triggered for element ${index}`)
        }
      }
    );
  });
}

// Initialize fade-in animations on page load
document.addEventListener('DOMContentLoaded', initFadeInAnimations);

// CSS Marquee Function
let marqueeObserver = null;
let initializedMarquees = new Set();

function initCSSMarquee() {
  const pixelsPerSecond = 75;
  const marquees = document.querySelectorAll('[data-css-marquee]:not(.marquee-initialized)');
  
  marquees.forEach(marquee => {
    // Skip if already initialized
    if (initializedMarquees.has(marquee)) {
      return;
    }
    
    initializedMarquees.add(marquee);
    marquee.classList.add('marquee-initialized');
    
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      // Check if duplicate already exists
      if (!list.nextElementSibling || !list.nextElementSibling.hasAttribute('data-marquee-duplicate')) {
        const duplicate = list.cloneNode(true);
        duplicate.setAttribute('data-marquee-duplicate', 'true');
        marquee.appendChild(duplicate);
      }
    });
  });

  // Initialize observer only once
  if (!marqueeObserver) {
    marqueeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.querySelectorAll('[data-css-marquee-list]').forEach(list => 
          list.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
        );
      });
    }, { threshold: 0 });
  }
  
  document.querySelectorAll('[data-css-marquee]').forEach(marquee => {
    marquee.querySelectorAll('[data-css-marquee-list]').forEach(list => {
      if (list.offsetWidth > 0) {
        list.style.animationDuration = (list.offsetWidth / pixelsPerSecond) + 's';
        list.style.animationPlayState = 'paused';
      }
    });
    marqueeObserver.observe(marquee);
  });
}

// Search Panel Functionality
document.addEventListener("DOMContentLoaded", () => {
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
      }, 2500);
    });
  }
});

// Navbar Functionality
$(document).ready(function() {
  // Common Variables
  var $header = $('header');
  var $searchIcon = $('.navbar_search-icon');
  var $searchBar = $('.navbar_search');
  var $navLinks = $('.navbar_link');
  var $hamburgerIcon = $('.navbar_hamburguer-icon');
  var $sidePanel = $('.navbar_side-panel');
  var $sideMenuItems = $('.navbar_side-menu').children();
  var $sideMenuCloseIcon = $('.side-menu_x-icon');
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
  }

  // Navbar Class Handlers
  function addInvertedClass() {
    $('.navbar_logo, .logo-frank, .navbar-mobile_logo, .navbar_link, .navbar_search-icon, .navbar_search-input, .navbar_search-button, .hamburguer_first-line, .hamburguer_second-line, .navbar-mobile_logo').addClass('inverted');
  }

  function removeInvertedClass() {
    $('.navbar_logo, .logo-frank, .navbar-mobile_logo, .navbar_link, .navbar_search-icon, .navbar_search-input, .navbar_search-button, .hamburguer_first-line, .hamburguer_second-line, .navbar-mobile_logo').removeClass('inverted');
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

  // Dark-only page handling
  if (isDarkOnlyPage) {
    addInvertedClass();
    removeWhiteBG();
  } else {
    const $header = $('header');
    const $allDarkSections = $('[data-theme="dark"]').not('.sticky-footer');
    const $sections = $allDarkSections.add($header);

    if ($header.length && $header.attr('data-theme') === 'dark' && isAtTop()) {
      addInvertedClass();
      removeWhiteBG();
    } else {
      removeInvertedClass();
      removeWhiteBG();
    }

    if ($header.length && isDesktop() && isAtTop()) {
      showLargeMenu();
    }

    // ScrollTrigger for navbar states
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
        }
      });
    });
  }

  // Match Media for responsive behavior
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
    }

    return () => {
      $searchIcon.off('.searchDesktop');
      $(document).off('.searchDesktop');
      $hamburgerIcon.off('.desktopMenu');
      $sideMenuCloseIcon.off('.desktopMenu');
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
    }

    return () => {
      $hamburgerIcon.off('.mobileMenu');
      $sideMenuCloseIcon.off('.mobileMenu');
    };
  });
});

// Navbar Scroll Behavior
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

// Dynamic Current Year
function initDynamicCurrentYear() {  
  const currentYear = new Date().getFullYear();
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  currentYearElements.forEach(currentYearElement => {
    currentYearElement.textContent = currentYear;
  });
}

// Highlight Text Animation
function initHighlightText(){
  let splitHeadingTargets = document.querySelectorAll("[data-highlight-text]")
  
  splitHeadingTargets.forEach((heading) => {
    const scrollStart = heading.getAttribute("data-highlight-scroll-start") || "top 70%"
    const scrollEnd = heading.getAttribute("data-highlight-scroll-end") || "center 40%"
    const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2
    const staggerValue = heading.getAttribute("data-highlight-stagger") || 0.1
    
    new SplitText(heading, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        let ctx = gsap.context(() => {
          let tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: heading, 
              start: scrollStart,
              end: scrollEnd,
            }
          })
          tl.from(self.chars,{
            autoAlpha: fadedValue,
            stagger: staggerValue,
            ease: "linear"
          })
        });
        return ctx;
      }
    });    
  });
}

// News Navigation Functionality
(function() {
  'use strict';
  
  if (window.newsNavigationInitialized) {
    return;
  }
  window.newsNavigationInitialized = true;

  const isNewsPage = window.location.pathname.includes('/news') || 
                    document.querySelector('[news-page-identifier]') !== null;

  document.addEventListener("DOMContentLoaded", function () {
    if (isNewsPage) {
      initializeNewsPageScrolling();
    } else {
      initializeNewsLinks();
    }
  });

  function initializeNewsLinks() {
    let isInitialized = false;
    
    function setupNewsLinks() {
      if (isInitialized) return;
      
      const newsItems = document.querySelectorAll("[news-item]");
      if (newsItems.length === 0) return;
      
      newsItems.forEach(item => {
        if (item.hasAttribute('data-news-listener')) return;
        
        item.setAttribute('data-news-listener', 'true');
        item.addEventListener("click", handleNewsClick);
      });
      
      isInitialized = true;
    }

    function handleNewsClick(event) {
      event.preventDefault();
      event.stopPropagation();
      
      try {
        const newsSlug = this.getAttribute("news-item");
        
        if (!newsSlug || newsSlug.trim() === '') {
          console.warn('News item clicked but no slug found:', this);
          return false;
        }

        if (typeof(Storage) !== "undefined") {
          try {
            window.localStorage.setItem("searchParamNews", newsSlug);
            console.log('Stored news slug:', newsSlug);
          } catch (e) {
            console.warn('Failed to set localStorage, using URL parameter:', e);
            window.location.href = `/news?item=${encodeURIComponent(newsSlug)}`;
            return false;
          }
        } else {
          window.location.href = `/news?item=${encodeURIComponent(newsSlug)}`;
          return false;
        }

        window.location.href = "./news.html";
        
      } catch (error) {
        console.error('Error handling news item click:', error);
      }
      
      return false;
    }

    setupNewsLinks();

    const contentWrapper = document.querySelector("[get-no-of-items]") || document.body;
    if (window.MutationObserver) {
      const observer = new MutationObserver(function(mutations) {
        let hasNewNewsItems = false;
        
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) {
                if ((node.hasAttribute && node.hasAttribute('news-item')) || 
                    (node.querySelector && node.querySelector('[news-item]'))) {
                  hasNewNewsItems = true;
                }
              }
            });
          }
        });
        
        if (hasNewNewsItems) {
          setTimeout(setupNewsLinks, 100);
        }
      });
      
      observer.observe(contentWrapper, { 
        childList: true, 
        subtree: true 
      });
    }
  }

  function initializeNewsPageScrolling() {
    // News page scrolling functionality would go here
    // This is a simplified version - the full implementation would be quite complex
    console.log('News page scrolling initialized');
  }
})();

// News CMS Card Sorting
document.addEventListener("DOMContentLoaded", function () {
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
});

// Initialize all functions on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initCSSMarquee();
  initDynamicCurrentYear();
  initHighlightText();
});

// Global function to reinitialize all custom animations
window.initCustomAnimations = function() {
  // Reinitialize CSS Marquee
  initCSSMarquee();
  
  // Reinitialize other custom functions
  if (typeof initDynamicCurrentYear === 'function') {
    initDynamicCurrentYear();
  }
  
  if (typeof initHighlightText === 'function') {
    initHighlightText();
  }
  
  // Any other custom animation initializations can be added here
  console.log('Custom animations reinitialized');
};
