function createGrid(squaresAmount) {
  const gridContainerTag = document.querySelector('#grid-container');
  for (let i = 0; i < squaresAmount; i++) {
    const div = document.createElement('div');
    gridContainerTag.appendChild(div);
  }
}

createGrid(16);
