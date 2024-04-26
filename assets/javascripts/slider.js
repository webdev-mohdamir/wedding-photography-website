// Hero slider
function heroSlider() {
  let currentSlide = 0;

  const slider = document.querySelector("#bg-slider");
  const slides = slider.querySelectorAll(".slide");
  const slideCount = slides.length;

  let movePercentage = parseFloat(100 / slideCount);
  slides[currentSlide].classList.add("active");

  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");

  nextButton.addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slideCount;
    slides[currentSlide].classList.add("active");

    slider.style.transform = `translateX(-${movePercentage * currentSlide}%)`;
    addBg(slides[currentSlide]);
  });

  prevButton.addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1) % slideCount;

    if (currentSlide < 0) {
      currentSlide = slideCount - 1;
      slider.style.transform = `translateX(${-100}%)`;
    }

    slides[currentSlide].classList.add("active");

    slider.style.transform = `translateX(-${movePercentage * currentSlide}%)`;
    addBg(slides[currentSlide]);
  });

  function addBg(currentSlide) {
    let bgImage = currentSlide.dataset.bgimage;

    let bgDiv = currentSlide.querySelector(".background-image");
    bgDiv.classList.add("image_added");

    bgDiv.style.backgroundImage = `url(./assets/images/backgrounds/${bgImage})`;
  }

  addBg(slides[currentSlide], slides[currentSlide].dataset.bgImage);
}

heroSlider();
