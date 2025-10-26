const whoCards = document.querySelectorAll(".who-serve-section.reveal");
const revealWho = () => {
  const trigger = window.innerHeight * 0.85;
  whoCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if(top < trigger) card.classList.add("show");
  });
};
window.addEventListener("scroll", revealWho);
revealWho();

