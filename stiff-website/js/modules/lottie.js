export function lottie() {

    let teethIcon = document.querySelector('[data-lottie="teeth"]')
    teethLottie = bodymovin.loadAnimation({
        container: teethIcon, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../js/lottie/teeth.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: ''
        }
    });

    let cameraIcon = document.querySelector('[data-lottie="camera"]')
    cameraLottie = bodymovin.loadAnimation({
        container: cameraIcon, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../js/lottie/camera.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: ''
        }
    });

    let logoIcon = document.querySelector('[data-lottie="logo"]')
    logoLottie = bodymovin.loadAnimation({
        container: logoIcon, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../js/lottie/logo.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: ''
        }
    });
     let carIcon = document.querySelector('[data-lottie="car"]')
    carLottie = bodymovin.loadAnimation({
        container: carIcon, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../js/lottie/car.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: ''
        }
    });
     let eyesIcon = document.querySelector('[data-lottie="eyes"]')
    eyesLottie = bodymovin.loadAnimation({
        container: eyesIcon, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../js/lottie/eyes.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid', // Supports the same options as the svg element's preserveAspectRatio property
            progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className: ''
        }
    });
    


};