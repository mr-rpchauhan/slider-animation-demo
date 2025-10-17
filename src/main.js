// Global Setup
gsap.registerPlugin(ScrollTrigger);

// Swiper Initialization
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".next-slide",
    prevEl: ".prev-slide",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
    type: "progressbar",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Parallax Image Scroll
gsap.to("#parallax-img", {
  scale: 1.3,
  ease: "none",
  scrollTrigger: {
    trigger: "#parallax-img",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});


// Fade Out Text on Scroll
gsap.to("#fade-text", {
  opacity: 0,
  scrub: true,
  scrollTrigger: {
    trigger: "#fade-text",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
});

// Header Background Scroll
gsap.to("#main-header", {
  backgroundColor: "#EFEAE4",
  ease: "none",
  scrollTrigger: {
    trigger: "#parallax-img",
    start: "top top",
    end: "700",
    scrub: true,
  },
});

// Logo Color Change on Scroll
const logo = document.getElementById("logo");

function updateLogo() {
  const scrollY = window.scrollY;
  if (scrollY >= 200) {
    logo.src = "logo_dark.png";
  } else {
    logo.src = "logo_light.png";
  }
}

updateLogo();

ScrollTrigger.create({
  trigger: "#parallax-img",
  start: "top top",
  end: "200",
  onUpdate: () => updateLogo(),
});

window.addEventListener("scroll", updateLogo);

// Menu Button Color on Scroll
const menuBtn = document.getElementById("menu-btn");

ScrollTrigger.create({
  trigger: "#parallax-img",
  start: "top top",
  end: 200,
  onUpdate: (self) => {
    if (self.progress > 0.99) {
      menuBtn.style.color = "#000";
    } else {
      menuBtn.style.color = "#fff";
    }
  },
});

// Fullscreen Menu Animation
const closeBtn = document.getElementById("close-menu");
const menu = document.getElementById("fullscreen-menu");
const header = document.getElementById("main-header");
const body = document.getElementsByTagName("body")[0];

const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { duration: 0.5, ease: "power3.inOut" },
});

menuTimeline.to(menu, { x: "0%" });

function openMenu() {
  menuTimeline.play();
  logo.src = "logo_dark.png";
  header.style.backgroundColor = "#EFEAE4";
  closeBtn.classList.remove("hidden");
  menuBtn.classList.add("hidden");
  body.style.overflow = "hidden";
}

function closeMenu() {
  menuTimeline.reverse();
  closeBtn.classList.add("hidden");
  menuBtn.classList.remove("hidden");
  body.style.overflow = "";
  if (window.scrollY >= 200) {
    logo.src = "logo_dark.png";
    gsap.to(header, { backgroundColor: "#EFEAE4", duration: 0.5, ease: "power2.out" });
  } else {
    logo.src = "logo_light.png";
    gsap.to(header, { backgroundColor: "transparent", duration: 0.5, ease: "power2.out" });
  }
}

menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// Menu Hover Image Effect
const menuItems = document.querySelectorAll("#menu-item");
const menuImages = document.querySelectorAll(".menu-image");

menuItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    if (window.innerWidth < 1024) return; // Disable on small screens
    const imgId = item.dataset.img;

    menuImages.forEach(img => {
      if (img.id === imgId) {
        img.classList.remove("opacity-0", "blur-[2px]");
        img.classList.add("opacity-100");
        img.style.zIndex = 10;
      } else {
        img.classList.remove("opacity-100");
        img.classList.add("opacity-0", "blur-[2px]");
        img.style.zIndex = 0;
      }
    });

    menuItems.forEach(other => {
      if (other !== item) {
        other.classList.add("opacity-60", "blur-[2px]");
      } else {
        other.classList.remove("opacity-60", "blur-[2px]");
      }
    });
  });

  item.addEventListener("mouseleave", () => {
    menuItems.forEach(i => i.classList.remove("opacity-60", "blur-[1px]"));

    menuImages.forEach(img => {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-0");
      img.style.zIndex = 0;
      img.classList.add("blur-[2px]");
    });
  });
});
