
  // === Carousel ===
  const courseTrack = document.getElementById('coursesTrack');
  const coursePrev = document.getElementById('coursePrev');
  const courseNext = document.getElementById('courseNext');
  const courseCards = courseTrack.children;
  let courseIndex = 0;

  function updateCourseCarousel() {
    const cardWidth = courseCards[0].offsetWidth + 20;
    courseTrack.style.transform = `translateX(-${courseIndex * cardWidth}px)`;
  }

  coursePrev.addEventListener('click', () => {
    courseIndex = (courseIndex - 1 + courseCards.length) % courseCards.length;
    updateCourseCarousel();
  });
  courseNext.addEventListener('click', () => {
    courseIndex = (courseIndex + 1) % courseCards.length;
    updateCourseCarousel();
  });

  // === Animated Counters ===
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    counter.innerText = '0';
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = target / 200;
      if(current < target){
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(updateCount);
      } else counter.innerText = target;
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          updateCount();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.6 });
    observer.observe(counter);
  });

  // === Course Modals ===
  const modalButtons = document.querySelectorAll('.view-course');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal .close');

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modal);
      modal.style.display = 'block';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => btn.parentElement.parentElement.style.display = 'none');
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if(e.target === modal) modal.style.display = 'none';
    });
  });

// Animate close button shrink + bounce effect
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-close")) {
    e.target.style.transition = "transform 0.25s ease";
    e.target.style.transform = "scale(0.6)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 250);
  }
});
