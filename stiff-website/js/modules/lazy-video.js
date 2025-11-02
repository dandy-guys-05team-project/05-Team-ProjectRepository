export function lazyVideo() {

     document.querySelectorAll('.work-box').forEach((box) => {
          const video = box.querySelector('video');
          const img = box.querySelector('img');
          if (!video) {
               console.warn('Missing <video> in:', box);
               return;
          }

          const src = video.dataset.src;
          let hasLoaded = false;

          ScrollTrigger.create({
               trigger: box,
               start: 'top 110%',
               end: 'bottom top',
               onEnter: () => {
                    if (!hasLoaded) {
                         video.src = src;
                         video.load();
                         hasLoaded = true;
                         video.dataset.loaded = "true";
                    }
               }
          });

          if (!isMobile()) {
               box.addEventListener('mouseenter', () => {
                    if (video.dataset.loaded) {
                         video.play().catch(e => console.warn("Play failed:", e));
                         gsap.to(img, {
                              opacity: 0,
                              duratin: .25,
                              ease: "power2"
                         })
                    }
               });

               box.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                    gsap.to(img, {
                         opacity: 1,
                         duratin: .25,
                         ease: "power2"
                    })
               });
          }
     });


}