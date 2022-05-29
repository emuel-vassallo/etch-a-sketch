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

function clearGrid() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach((square) => {
    square.remove();
  });
}

function changeColorDefault(squareElement) {
  squareElement.classList.add('default-drawn-color');
}

function removeColorDefault(squareElement) {
  squareElement.classList.remove('default-drawn-color');
}

function changeHoveredSquareColor() {
  const squares = document.querySelectorAll('.grid-square');

  squares.forEach((square) => {
    square.addEventListener('mouseover', (e) => {
      const squareHovered = e.target;
      changeColorDefault(squareHovered);
    });
  });
}

function clearGridOnClick() {
  const squares = document.querySelectorAll('.grid-square');
  const clearButton = document.querySelector('#clear');

  clearButton.addEventListener('click', () => {
    squares.forEach((square) => {
      removeColorDefault(square);
    });
  });
}

createGrid(16);
changeHoveredSquareColor();
clearGridOnClick();
