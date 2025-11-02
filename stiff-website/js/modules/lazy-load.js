export function lazyLoad() {
    ScrollTrigger.config({ limitCallbacks: true });
    gsap.utils.toArray(".lazy").forEach(image => {

        
       
        // SIZE 1440 and LOWEER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        if(window.innerWidth < 1440) {
            let newSRC = image.dataset.src,
                newImage = document.createElement("img"),
                
            loadImage = () => {
                newImage.onload = () => {
                    newImage.onload = null; // avoid recursion
                    newImage.src = image.src; // swap the src
                    image.src = newSRC;
                    // place the low-res version on TOP and then fade it out.
                    gsap.set(newImage, {
                        position: "absolute", 
                        top: image.offsetTop, 
                        left: image.offsetLeft, 
                        width: image.offsetWidth, 
                        height: image.offsetHeight
                    });
                    image.parentNode.appendChild(newImage);
                    gsap.to(newImage, {
                        opacity: 0, 
                        onComplete: () => newImage.parentNode.removeChild(newImage)
                    });
                    st && st.kill();
                }
                newImage.src = newSRC;
            }, 
                
            st = ScrollTrigger.create({
                trigger: image,
                start: "top 170%",
                onEnter: loadImage,
                onEnterBack: loadImage // make sure it works in either direction
            });
        }

        // SIZE OVER 1440 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        if(window.innerWidth >= 1440) {
            let newSRC = image.dataset.srcBig,
                    newImage = document.createElement("img"),
                    
                loadImage = () => {
                    newImage.onload = () => {
                        newImage.onload = null; // avoid recursion
                        newImage.src = image.src; // swap the src
                        image.src = newSRC;
                        // place the low-res version on TOP and then fade it out.
                        gsap.set(newImage, {
                            position: "absolute", 
                            top: image.offsetTop, 
                            left: image.offsetLeft, 
                            width: image.offsetWidth, 
                            height: image.offsetHeight
                        });
                        image.parentNode.appendChild(newImage);
                        gsap.to(newImage, {
                            opacity: 0, 
                            onComplete: () => newImage.parentNode.removeChild(newImage)
                        });
                        st && st.kill();
                    }
                    newImage.src = newSRC;
                }, 
                    
                st = ScrollTrigger.create({
                    trigger: image,
                    start: "top 170%",
                    onEnter: loadImage,
                    onEnterBack: loadImage // make sure it works in either direction
                });
        }

    });
    
    // console.log("lazy load ready")

}

