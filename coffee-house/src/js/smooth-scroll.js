document.addEventListener('DOMContentLoaded', () => {
  const scrollToSection = (sectionID) => {
    const section = document.getElementById(sectionID);
    section && section.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('.section-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.location.pathname.includes('/index.html')) {
        event.preventDefault();
        const targetID = link.getAttribute('href').substring(1);
        scrollToSection(targetID);
        window.history.pushState(null, null, `#${targetID}`);
      }
    });
  });
});

// const li = document.querySelectorAll('.section-link');

// function scrollToSection(sectionId) {
//   const section = document.getElementById(sectionId);
//   if (section) {
//     section.scrollIntoView({ behavior: 'smooth' });
//   }
// }

// li.forEach((item) => {
//   item.addEventListener('click', (event) => {
//     const sectionId = item.getAttribute('href').substring(1);

//     event.preventDefault();
//     scrollToSection(sectionId);
//   });
// });
