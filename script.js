// ===== Navbar indicator + active section =====
const nav = document.getElementById("nav");
const indicator = document.getElementById("indicator");
const desktopLinks = nav.querySelectorAll("a");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu.querySelectorAll("a");

const sections = document.querySelectorAll("header.hero, section.section");

function moveIndicator(target) {
  const navRect = nav.getBoundingClientRect();
  const linkRect = target.getBoundingClientRect();
  indicator.style.width = `${linkRect.width}px`;
  indicator.style.left = `${linkRect.left - navRect.left}px`;
}

window.addEventListener("load", () => {
  const active = nav.querySelector("a.active");
  if (active) moveIndicator(active);

  document.getElementById("year").textContent = new Date().getFullYear();
});

desktopLinks.forEach(link => {
  link.addEventListener("click", () => {
    desktopLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link);
  });
});

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (scrollY >= top) current = section.getAttribute("id");
  });

  desktopLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
      moveIndicator(a);
    }
  });

  mobileLinks.forEach(a => {
    a.classList.remove("m-active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("m-active");
  });
});

window.addEventListener("resize", () => {
  const active = nav.querySelector("a.active");
  if (active) moveIndicator(active);
});

// mobile menu toggle
menuBtn.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
});
mobileLinks.forEach(link => {
  link.addEventListener("click", () => mobileMenu.style.display = "none");
});


// ✅ HERO AUTO SLIDER (1,4,6,7)
const heroShot = document.getElementById("heroShot");
const thumbButtons = document.querySelectorAll(".thumb");

thumbButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    thumbButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const src = btn.getAttribute("data-shot");
    heroShot.style.opacity = "0";

    setTimeout(() => {
      heroShot.src = src;
      heroShot.style.opacity = "1";
    }, 200);
  });
});

// ✅ auto slide every 3.2 seconds
let autoIndex = 0;
setInterval(() => {
  autoIndex = (autoIndex + 1) % thumbButtons.length;
  thumbButtons[autoIndex].click();
}, 3200);
