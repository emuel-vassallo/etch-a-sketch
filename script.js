function createGrid(sideSquaresAmount) {
  const gridContainer = document.querySelector('#grid-container');
  const totalSquaresAmount = Math.pow(sideSquaresAmount, 2);
  const topRightSquareIndex = sideSquaresAmount - 1;
  const bottomLeftSquareIndex = totalSquaresAmount - sideSquaresAmount;

  for (let i = 0; i < totalSquaresAmount; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    if (i === topRightSquareIndex) div.setAttribute('id', 'top-right-square');
    if (i === bottomLeftSquareIndex)
      div.setAttribute('id', 'bottom-left-square');
    gridContainer.appendChild(div);
  }
}

createGrid(16);
