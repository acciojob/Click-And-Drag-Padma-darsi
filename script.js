// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Make each cube absolutely positioned inside the container
  cube.style.position = 'absolute';
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;

    // Get current position relative to container
    const rect = container.getBoundingClientRect();
    const cubeRect = cube.getBoundingClientRect();

    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    // Raise z-index to bring cube to front
    selectedCube.style.zIndex = 1000;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Keep within horizontal boundaries
  newX = Math.max(0, Math.min(newX, container.clientWidth - selectedCube.offsetWidth));
  // Keep within vertical boundaries
  newY = Math.max(0, Math.min(newY, container.clientHeight - selectedCube.offsetHeight));

  selectedCube.style.left = `${newX}px`;
  selectedCube.style.top = `${newY}px`;
}

function onMouseUp() {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
  }

  selectedCube = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}
