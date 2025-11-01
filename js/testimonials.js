
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = track.children;
  const total = testimonials.length;
  let index = 0;

  function updateCarousel() {
    const cardWidth = testimonials[0].offsetWidth + 20; // 20px margin-right or gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    updateCarousel();
  });

  // Optional: auto-slide every 5 seconds
  setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
  }, 5000);

