gsap.registerPlugin(ScrollTrigger);

function createLooper(trackSelector, direction = 1, speed = 60, bounce = true) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  // Measure width of the visible container and full track
  const row = track.parentElement;
  const trackWidth = track.scrollWidth / 2; // because we duplicated content
  const containerWidth = row.clientWidth;

  // distance to move = trackWidth (one copy width)
  const distance = trackWidth;

  // duration (longer distance => longer time) adjust speed param
  const duration = distance / speed;

  // initial x depending on direction
  if (direction === 1) {
    // left->right: start shifted left by distance
    gsap.set(track, { x: -distance });
  } else {
    // right->left: start at 0 (natural flow)
    gsap.set(track, { x: 0 });
  }

  // Main infinite loop timeline
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "power1.inOut" }
  });

  if (direction === 1) {
    // move to x: 0 (slide in), then to +distance (exit), then reset
    tl.to(track, { x: 0, duration: duration * 0.8 });
    if (bounce) {
      tl.to(track, { x: 6, duration: 0.4, ease: "bounce.out" }, "+=0.05");
      tl.to(track, { x: 0, duration: 0.35 });
    }
    tl.to(track, { x: distance, duration: duration * 1.0 });
    // reset instantly to -distance for next loop
    tl.set(track, { x: -distance });
  } else {
    // direction -1: move leftwards
    tl.to(track, { x: -distance, duration: duration * 1.0 });
    if (bounce) {
      tl.to(track, { x: -distance - 6, duration: 0.35, ease: "bounce.out" });
      tl.to(track, { x: -distance, duration: 0.35 });
    }
    // reset to 0
    tl.set(track, { x: 0 });
  }

  return tl;
}

// Create when section enters viewport
ScrollTrigger.create({
  trigger: ".tools-section",
  start: "top 80%",
  onEnter: () => {
    // top row: left -> right (direction = 1)
    createLooper(".row-top .tools-track", 1, 80, true);
    // bottom row: right -> left (direction = -1)
    createLooper(".row-bottom .tools-track", -1, 80, true);
  },
  once: false
});