const slides = document.querySelectorAll('.slider-img-container img');
const slide = document.querySelector('.slide');
const btnRight = document.querySelector('.btn-icon-right');
const btnLeft = document.querySelector('.btn-icon-left');

let sliderContainer = [];
let step = 0;
let displacement = 0;

for (let i = 0; i < slides.length; i++) {
  sliderContainer[i] = slides[i].src;
  slides[i].closest('.slider-img-container').remove();
}

function render(direction) {
  const sliderImgContainer = document.createElement('div');
  sliderImgContainer.classList.add('slider-img-container');
  const image = document.createElement('img');
  image.src = sliderContainer[step];
  sliderImgContainer.appendChild(image);

  direction === 'left'
    ? (sliderImgContainer.style.left = displacement * 480 + 'px')
    : (sliderImgContainer.style.left = displacement * -480 + 'px');

  slide.appendChild(sliderImgContainer);
  step + 1 == sliderContainer.length ? (step = 0) : step++;
  displacement = 1;
}

function goLeft() {
  //   btnLeft.onclick = null;
  btnRight.removeEventListener('click', goLeft);
  let slidesCopy = document.querySelectorAll('.slider-img-container');
  let displacementCopy = 0;

  for (let i = 0; i < slidesCopy.length; i++) {
    slidesCopy[i].style.left = displacementCopy * 480 - 480 + 'px';
    displacementCopy++;
  }

  setTimeout(() => {
    // slide.removeChild(slide.firstElementChild);
    slidesCopy[0].remove();
    render('left');
    // btnRight.onclick = goLeft;
    btnRight.addEventListener('click', goLeft);
    // btnLeft.addEventListener('click', goLeft);
  }, 1000);
}

function goRight() {
  //   btnRight.onclick = null;
  btnLeft.removeEventListener('click', goRight);
  let slidesCopy = document.querySelectorAll('.slider-img-container');
  let displacementCopy = 0;

  for (let i = slidesCopy.length - 1; i >= 0; i--) {
    slidesCopy[i].style.left = (displacementCopy * (480 + 480)) / 2 + 'px';
    displacementCopy++;
    //   for (let i = 0; i < slidesCopy.length; i++) {
    // if (i == 0) {
    //   slidesCopy[i].style.left = displacementCopy * 480 + 480 + 'px';
    // } else {
    //   slidesCopy[i].style.left = displacementCopy * 480 - 480 + 'px';
    // }
  }

  setTimeout(() => {
    slidesCopy[slidesCopy.length - 1].remove();
    render('right');
    // btnLeft.onclick = goRight;
    btnLeft.addEventListener('click', goRight);
  }, 1000);
}

// window.addEventListener('load', () => {
//   render();
//   render();
//   setInterval(goLeft, 1000);
// });

render();
render();

btnRight.addEventListener('click', goLeft);
btnLeft.addEventListener('click', goRight);

// btnRight.onclick = goLeft;
// btnLeft.onclick = goRight;

// function render() {
//   const sliderImgContainer = document.createElement('div');
//   sliderImgContainer.classList.add('slider-img-container');
//   const image = document.createElement('img');
//   image.src = sliderContainer[step];
//   sliderImgContainer.appendChild(image);
//   sliderImgContainer.style.left = displacement * 480 + 'px';
//   slide.appendChild(sliderImgContainer);
//   step + 1 == sliderContainer.length ? (step = 0) : step++;
//   displacement = 1;
// }

// function render1() {
//   const sliderImgContainer = document.createElement('div');
//   sliderImgContainer.classList.add('slider-img-container');
//   const image = document.createElement('img');
//   image.src = sliderContainer[step];
//   sliderImgContainer.appendChild(image);
//   sliderImgContainer.style.left = displacement * -480 + 'px';
//   slide.appendChild(sliderImgContainer);
//   step + 1 == sliderContainer.length ? (step = 0) : step++;
//   displacement = 1;
// }

// btnLeft.addEventListener('click', () => {
//   goLeft();
//   console.log('click');
// });

//   itemSlider.innerHTML = `
//     <div class="content">
//         <div class="img-container">
//             <img src='${sliderContainer[step]}' alt="coffee-slider" />
//         </div>
//         <div class="description-container">
//             <p class="title">S’mores Frappuccino</p>
//             <p class="description">
//                 This new drink takes an espresso and mixes it with brown sugar and
//                 cinnamon before being topped with oat milk.
//             </p>
//             <p class="price">$5.50</p>
//         </div>
//     </div>
//       `;
