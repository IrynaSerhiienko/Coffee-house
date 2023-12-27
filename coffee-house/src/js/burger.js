const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.section-link');
const menuLink = document.querySelector('.menu-link');

window.addEventListener('resize', () => {
  header.classList.remove('active');
  navContainer.classList.remove('open');
});

burger.addEventListener('click', () => {
  header.classList.toggle('active');
  navContainer.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((navLink) => {
      navLink.classList.remove('active');
    });
    link.classList.add('active');
    header.classList.remove('active');
    navContainer.classList.remove('open');
  });
});

menuLink.addEventListener('click', () => {
  header.classList.remove('active');
  navContainer.classList.remove('open');
});
