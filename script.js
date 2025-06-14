// Your code here.
const items = document.querySelector('.items');
let isDragging = false;
let startX;
let initialScrollLeft;

items.addEventListener('mousedown', (e) => {
  isDragging = true;
  items.classList.add('active');
  startX = e.pageX - items.offsetLeft;
  initialScrollLeft = items.scrollLeft;
});

items.addEventListener('mouseleave', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mouseup', () => {
  isDragging = false;
  items.classList.remove('active');
});

items.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const scroll = (x - startX) * 2; // scroll speed multiplier
  items.scrollLeft = initialScrollLeft - scroll;
});
