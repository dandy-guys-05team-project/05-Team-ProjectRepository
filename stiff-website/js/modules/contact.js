export function contact() {
   
     
          let row = document.querySelectorAll(".row-item")
          
          row.forEach(row => {
               let tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: row,
                         start: "top bottom",
                         end: "top +=50%",
                         scrub: true
                    }
               })
               let line = row.querySelector("i")
               let title = row.querySelector("h5")
               
               tl.to(line, {
                    scaleX: 1,
                    duration: 1,
                    ease: "none",
               })
               tl.to(title, {
                    x: 0,
                    duration: 1,
                    ease: "none",
               }, "<")
               

          })
     
     

};