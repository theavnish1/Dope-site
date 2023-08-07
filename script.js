function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 0.6,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

function menuClick(x) {
  // console.log(x.classList);
  const navLinks = document.querySelector(".nav-links");
  x.classList.value =
    x.classList.value === "fa-solid fa-x text-3xl"
      ? "fa-solid fa-bars text-3xl"
      : "fa-solid fa-x text-3xl";
  navLinks.classList.toggle("top-[15%]");
}

let tl = gsap.timeline();

tl.to("#hero .overflow-hidden #pc-p", {
  opacity: 1,
  duration: 0.5,
  delay: 0.3,
});

// tl.to("#hero .overflow-hidden #pc-p", {
//   scale: 1,
//   left: "36%",
//   opacity: 1,
//   duration: 0.7,
//   delay: 0.5,
// });

tl.from("#hero img", {
  scale: 0.5,
  opacity: 0,
  rotate: 90,
  duration: 0.2,
  // stagger: 0.1
});

tl.from("nav ul, nav div a, nav div div i, #hero div a", {
  y: -20,
  opacity: 0,
  duration: 0.2,
  stagger: 0.2,
});

tl.from("#hero div svg", { opacity: 0 });

gsap.from("nav div img", {
  y: -60,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  delay: 1,
});

gsap.to("#hero .overflow-hidden #pc-p", {
  transform: "translateX(-45%)",
  scrollTrigger: {
    trigger: "nav",
    scroller: "#main",
    // markers: true,
    start: "top 0",
    end: "top -18%",
    scrub: 1,
  },
});

gsap.from("#third-page .t-d-1", {
  transform: "translateX(100%)",
  scrollTrigger: {
    trigger: "#third-page .t-d-1",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});

gsap.from("#third-page .t-d-2", {
  transform: "translateX(-100%)",
  scrollTrigger: {
    trigger: "#third-page .t-d-2",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});

gsap.from("#third-page .t-d-3", {
  transform: "translateX(100%)",
  scrollTrigger: {
    trigger: "#third-page .t-d-3",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});

gsap.to("#third-page .t-d-1 div img", {
  objectPosition: "0%50%",
  scrollTrigger: {
    trigger: "#third-page .t-d-1",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});

gsap.to("#third-page .t-d-2 div img", {
  objectPosition: "100%50%",
  scrollTrigger: {
    trigger: "#third-page .t-d-2",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});

gsap.to("#third-page .t-d-3 div img", {
  objectPosition: "0%50%",
  scrollTrigger: {
    trigger: "#third-page .t-d-3",
    scroller: "#main",
    // markers: true,
    start: "top bottom",
    end: "top -60%",
    scrub: 2,
  },
});
