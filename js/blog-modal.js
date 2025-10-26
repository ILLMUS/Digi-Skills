const modalBtns = document.querySelectorAll('.read-more-btn');
const modals = document.querySelectorAll('.blog-modal');
const closeBtns = document.querySelectorAll('.blog-modal .close');

modalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.getElementById(btn.dataset.modal);
    modal.style.display = 'block';
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

// Close modal when clicking outside
window.addEventListener('click', e => {
  modals.forEach(modal => {
    if(e.target === modal) modal.style.display = 'none';
  });
});
