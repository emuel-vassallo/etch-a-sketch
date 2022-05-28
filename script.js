function createGrid(sideSquaresAmount) {
  const gridContainer = document.querySelector('#grid-container');
  const totalSquaresAmount = Math.pow(sideSquaresAmount, 2);
  for (let i = 0; i < totalSquaresAmount; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    gridContainer.appendChild(div);
  }
}

createGrid(16);
