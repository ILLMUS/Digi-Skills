gsap.registerPlugin(ScrollTrigger);

(() => {
  const track = document.getElementById('testimonialsTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');

  // Settings
  let visibleCount = 5;
  const updateVisibleCount = () => {
    if (window.innerWidth <= 700) visibleCount = 1;
    else if (window.innerWidth <= 1100) visibleCount = 3;
    else visibleCount = 5;
    return visibleCount;
  };
  updateVisibleCount();
  window.addEventListener('resize', updateVisibleCount);

  // compute pages (how many "steps" we have)
  const totalCards = cards.length;
  const pages = Math.ceil(totalCards / visibleCount);
  let currentPage = 0;

  // create dots
  for (let i=0;i<pages;i++){
    const btn = document.createElement('button');
    btn.setAttribute('aria-selected', i===0 ? 'true' : 'false');
    btn.dataset.page = i;
    btn.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(btn);
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((d,i) => d.setAttribute('aria-selected', i===currentPage ? 'true' : 'false'));
  }

  // translateX value for page index
  function pageX(pageIndex){
    // width of one card as percentage of track viewport = 100 / visibleCount
    return -(pageIndex * (100));
  }

  // Better: calculate pixel translate using card width
  function goToPage(pageIndex){
    currentPage = Math.max(0, Math.min(pageIndex, pages-1));
    const cardWidth = cards[0].getBoundingClientRect().width + 12; // gap included (approx)
    const offset = currentPage * visibleCount * cardWidth;
    gsap.to(track, { x: -offset, duration: 0.7, ease: 'power2.out' });
    updateDots();
  }

  // Prev / Next
  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  // keyboard controls
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
  });

  // Auto play (looping through pages)
  let autoplay = true;
  let autoInterval = 6000;
  let autoTimer = setInterval(()=> {
    if (!autoplay) return;
    const next = (currentPage + 1) % pages;
    goToPage(next);
  }, autoInterval);

  // Pause on hover
  track.addEventListener('mouseenter', () => autoplay = false);
  track.addEventListener('mouseleave', () => autoplay = true);

  // Scroll reveal: animate cards in with small upward motion when section enters
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonials-section',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 20,
    opacity: 0,
    stagger: {
      each: 0.08,
      from: 'start'
    },
    duration: 0.6,
    ease: 'power2.out'
  });

  // Ensure initial layout correct
  goToPage(0);

  // Accessibility: ensure dots update on resize (recalc pages)
  window.addEventListener('resize', () => {
    // small debounce
    clearTimeout(window._testimonialResize);
    window._testimonialResize = setTimeout(()=> {
      // remove and recreate dots if pages changed
      const newVisible = updateVisibleCount();
      const newPages = Math.ceil(totalCards / newVisible);
      if (newPages !== pages) {
        // simpler to reload page to rebuild layout, but we'll just reset to page 0
        currentPage = 0;
        goToPage(0);
      }
    }, 200);
  });
})();