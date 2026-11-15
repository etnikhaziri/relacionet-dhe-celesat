const slides = [...document.querySelectorAll(".slide")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("slideCounter");
const progress = document.getElementById("progressBar");
const dotsContainer = document.getElementById("dots");
const menu = document.getElementById("sideMenu");
const menuBtn = document.getElementById("menuBtn");
const menuItems = [...menu.querySelectorAll("button[data-go]")];

let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Shko te slajdi ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = [...dotsContainer.querySelectorAll("button")];

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
    if (i === currentSlide) slide.scrollTop = 0;
  });

  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  menuItems.forEach((item, i) => item.classList.toggle("active", i === currentSlide));

  counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${slides.length}`;
  progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}

prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
menuBtn.addEventListener("click", () => menu.classList.toggle("open"));

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    showSlide(Number(item.dataset.go));
    menu.classList.remove("open");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    showSlide(currentSlide + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(currentSlide - 1);
  } else if (event.key === "Escape") {
    menu.classList.remove("open");
  }
});

showSlide(0);
