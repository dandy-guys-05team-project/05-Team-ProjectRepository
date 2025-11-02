export function textAnim(){

    let splitChars = new SplitText(".text.chars", { type: "words, chars" })
    let splitWords = new SplitText(".text.words", { type: "words" })
    let colorWords = new SplitText(".color.words", { type: "words" })
    let spitLines = new SplitText(".text.lines", { type: "lines" })
    gsap.set(".text", { perspective: 400, })

    // CHARS ANIMATION
    gsap.set(splitChars.chars, {
        transformOrigin: "bottom center",
        yPercent: 100,
        scaleX: .2,
        opacity: 0,
        rotateZ: 25,
        filter: "blur(10px)",
    })
    ScrollTrigger.batch(splitChars.chars, {
        start: "top 95%",
        onEnter: batch => gsap.to(batch, {
               yPercent: 0,
               scaleX: 1,
               rotateZ: 0,
               filter: "blur(0px)",
               opacity: 1,
               stagger: {
                    amount: .1
               },
               ease: "back"
        }),
    });



     // WORDS ANIMATION
     gsap.set(splitWords.words, {
          filter: "blur(5px)",
          rotateZ: 10,
          yPercent: 200,
          x: 100,
          opacity: 0,
     })
     ScrollTrigger.batch(splitWords.words, {
        start: "top 100%",
        onEnter: batch => gsap.to(batch, {
          filter: "blur(0px)",
          rotateZ: 0,
          yPercent: 0,
          x: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1,
          ease: "expo.out"
        }),
        onEnterBack: batch => gsap.to(batch, {
          filter: "blur(0px)",
          rotateZ: 0,
          yPercent: 0,
          x: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 1,
          ease: "expo.out"
        }),
    })

     // COLOR WORDS ANIMATION
     gsap.set(colorWords.words, {
          filter: "blur(5px)",
          rotateZ: 10,
          y: 20,
          color: "#d93535",
          x: 250,
          opacity: 0,
     })
     ScrollTrigger.batch(colorWords.words, {
        start: "top 95%",
        onEnter: batch => gsap.to(batch, {
          filter: "blur(0px)",
          rotateZ: 0,
          yPercent: 0,
          color: "#F0ECD9",
          x: 0,
          opacity: 1,
          stagger: {
               amount: .2
          },
          duration: 1,
          ease: "expo.out"
        }),
        onEnterBack: batch => gsap.to(batch, {
          filter: "blur(0px)",
          rotateZ: 0,
          yPercent: 0,
          x: 0,
          color: "#F0ECD9",
          opacity: 1,
          stagger: {
               amount: .2
          },
          duration: 1,
          ease: "expo.out"
        }),
    })




    // LINES ANIMATION
    gsap.set(spitLines.lines, {
        opacity: 0,
        y: "150%"
    })
    ScrollTrigger.batch(spitLines.lines, {
        start: "top 95%",
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.03,
            ease: "expo.out"
        }),
        onEnterBack: batch => gsap.to(batch, {
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.03,
            ease: "expo.out"
        }),
    })
 


}