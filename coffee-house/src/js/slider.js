const sliderRow = document.querySelector('.slider-row');
const btnNext = document.querySelector('.btn-icon-right');
const btnPrev = document.querySelector('.btn-icon-left');
const progressBarFirst = document.querySelector('.first');
const progressBarSecond = document.querySelector('.second');
const progressBarThird = document.querySelector('.third');

let index = 0;
let slideWidth = window.innerWidth >= 768 ? 480 : 348;
let rowWidth = slideWidth * 2;
let lastButtonClickTime = Date.now();
let manualButtonClick = false;
let intervalId;
let touchStartX = 0;
let touchEndX = 0;

sliderRow.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

sliderRow.addEventListener('touchmove', (event) => {
  touchEndX = event.touches[0].clientX;
});

sliderRow.addEventListener('touchend', handleTouch);

function handleTouch() {
  const touchDiff = touchStartX - touchEndX;
  if (touchDiff > 50) {
    nextSlide();
    restartAutoSlide();
  } else if (touchDiff < -50) {
    prevSlide();
    restartAutoSlide();
  }
}

if ('ontouchstart' in window || navigator.maxTouchPoints) {
  sliderRow.classList.add('fast-transition');
} else {
  sliderRow.classList.remove('fast-transition');
}

window.addEventListener('resize', () => {
  slideWidth = window.innerWidth >= 768 ? 480 : 348;
  rowWidth = slideWidth * 2;
});

btnNext.addEventListener('click', () => {
  nextSlide();
  lastButtonClickTime = Date.now();
  //   manualButtonClick = true;
  restartAutoSlide();
});

btnPrev.addEventListener('click', () => {
  prevSlide();
  lastButtonClickTime = Date.now();
  //   manualButtonClick = true;
  restartAutoSlide();
});

function setProgressBarActive() {
  let val = parseInt(sliderRow.style.left, 10);
  console.log('current position', val);
  progressBarFirst.classList.toggle('active', Math.abs(val) === 0);
  progressBarSecond.classList.toggle('active', Math.abs(val) === slideWidth); //480 or 348
  progressBarThird.classList.toggle('active', Math.abs(val) === rowWidth); // 960 or 696
}

function prevSlide() {
  index -= slideWidth;
  if (index < 0) {
    index = rowWidth;
    // index = 960;
  }
  sliderRow.style.left = -index + 'px';
  setProgressBarActive();
  manualButtonClick = false;
}

function nextSlide() {
  //   setProgressBarActive();
  index += slideWidth;

  if (index > rowWidth) {
    //   if (index > 960) {
    index = 0;
  }
  sliderRow.style.left = -index + 'px';
  setProgressBarActive();
  //requestAnimationFrame(setProgressBarActive);
  manualButtonClick = false;
}

function autoSlide() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - lastButtonClickTime;
  if (!manualButtonClick && elapsedTime > 5000) {
    nextSlide();
  }
}

function restartAutoSlide() {
  clearInterval(intervalId);
  intervalId = setInterval(autoSlide, 5000);
}

function stopAutoSlide() {
  manualButtonClick = false;
}

btnNext.addEventListener('mousedown', stopAutoSlide);
btnPrev.addEventListener('mousedown', stopAutoSlide);

document.addEventListener('DOMContentLoaded', restartAutoSlide);
