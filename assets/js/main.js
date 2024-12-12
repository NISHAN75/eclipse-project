(function ($) {
"use strict";

 // header sticky
 var windowOn = $(window);
 windowOn.on('scroll', function () {
    var scroll = windowOn.scrollTop();
    if (scroll < 100) {
        $(".header-area").removeClass("header-sticky");
    } else {
        $(".header-area").addClass("header-sticky");
    }
 });

var counterUp = window.counterUp["default"];
var $counters = $(".counter");
function animateCounters() {
    $counters.each(function (ignore, counter) {
        var waypoint = new Waypoint({
            element: $(this),
            handler: function () {
                counterUp(counter, { duration: 1000, delay: 16 });
                this.destroy();
            },
            offset: "bottom-in-view",
        });
    });
}
animateCounters(); 

// testimonial 
var swiper = new Swiper(".testimonial-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});
 // animation
 gsap.registerPlugin(SplitText, ScrollTrigger);
 let textWrappers = $(".animation-text");

 // Split text into lines and letters
 let mainTitleSplit = new SplitText(textWrappers, {
     type: "lines,chars",
     linesClass: "line-wrapper overflow-hidden",
     charsClass: "letter",
     tag: "span"
 });

 // Animate each line's letters
 $(".line-wrapper").each(function () {
     let letters = $(this).find(".letter");
     gsap.from(letters, {
         scrollTrigger: {
             trigger: this,
             start: "top bottom",
             end: "bottom top",
             toggleActions: "play none none reverse",
         },
         y: 50,
         opacity: 0,
         duration: 0.5,
         stagger: 0.04,
         ease: "power3.inOut"
     });
 });
 // animation line
 gsap.utils.toArray(".animation-line").forEach((element) => {
     gsap.fromTo(
         element,
         {
             y: 100,
             opacity: 0,
         },
         {
             y: 0,
             opacity: 1,
             duration: 1.5,
             ease: "power2.out",
             scrollTrigger: {
                 trigger: element,
                 start: "top 90%",
                 toggleActions: "play none none reverse",

             },
         }
     );
 });
 // animation

        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis

})(jQuery);