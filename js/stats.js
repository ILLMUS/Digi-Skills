
  const counters = document.querySelectorAll('.count');

  counters.forEach(counter => {
    counter.innerText = '0';
    const target = +counter.getAttribute('data-target');

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = target / 200; // Adjust for speed

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    // Trigger when element comes into view
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
