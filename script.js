// Your code here.
// Select all cubes (items)
const cubes = document.querySelectorAll('.item');
const container = document.querySelector('.items');

cubes.forEach(cube => {
  cube.style.position = 'absolute'; // Allow free movement
  cube.style.cursor = 'grab';

  // Position cubes initially in a grid
  const index = [...cubes].indexOf(cube);
  const row = Math.floor(index / 5);
  const col = index % 5;
  cube.style.left = `${col * 210}px`;
  cube.style.top = `${row * 210}px`;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Calculate new position
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Boundary constraints
    const rect = container.getBoundingClientRect();
    const cubeRect = cube.getBoundingClientRect();

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + cube.offsetWidth > container.clientWidth)
      newX = container.clientWidth - cube.offsetWidth;
    if (newY + cube.offsetHeight > container.clientHeight)
      newY = container.clientHeight - cube.offsetHeight;

    cube.style.left = `${newX}px`;
    cube.style.top = `${newY}px`;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      cube.style.cursor = 'grab';
      cube.style.zIndex = '';
    }
  });
});
