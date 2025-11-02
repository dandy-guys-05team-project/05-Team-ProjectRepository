export function work() {
     // Media lottie
     ScrollTrigger.create({
          trigger: ".box-icon",
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
               cameraLottie.play()
          },
          onEnterBack: () => {
               cameraLottie.play()
          },
          onLeave: () => {
               cameraLottie.pause()
          },
          onLeaveBack: () => {
               cameraLottie.pause()
          },
     })

    

};