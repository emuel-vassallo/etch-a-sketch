function createGrid(squaresPerSide) {
  const gridContainer = document.querySelector('#grid-container');
  const totalSquaresAmount = Math.pow(squaresPerSide, 2);
  const topRightSquareIndex = squaresPerSide - 1;
  const bottomLeftSquareIndex = totalSquaresAmount - squaresPerSide;

  gridContainer.style.gridTemplateColumns = `repeat(${squaresPerSide}, minmax(0, 1fr))`;

  for (let i = 0; i < totalSquaresAmount; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-square');
    if (i === topRightSquareIndex) div.setAttribute('id', 'top-right-square');
    if (i === bottomLeftSquareIndex)
      div.setAttribute('id', 'bottom-left-square');
    gridContainer.appendChild(div);
  }
}

function removAllGridSquares() {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach((square) => {
    square.remove();
  });
}

function removeColorDefault(squareElement) {
  squareElement.classList.remove('grid-square-drawn');
}

function changeColorDefault(squareElement) {
  squareElement.classList.add('grid-square-drawn');
}

function updateShownGridSize(squaresPerSide) {
  const gridSizeTag = document.querySelector('#grid-size');
  gridSizeTag.textContent = `${squaresPerSide} x ${squaresPerSide}`;
}

function changeHoveredSquaresColor() {
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

function updateGrid(newSquaresPerSide) {
  removAllGridSquares();
  createGrid(newSquaresPerSide);
  updateShownGridSize(newSquaresPerSide);
  changeHoveredSquaresColor();
  clearGridOnClick();
}

function getNewSquaresPerSide() {
  let newSquaresPerSide = prompt(
    'Enter the new amount of squares per side (1-100):'
  );
  newSquaresPerSide = parseInt(newSquaresPerSide);
  newSquaresPerSide = Math.round(newSquaresPerSide);

  const isInputInvalid =
    newSquaresPerSide < 1 ||
    newSquaresPerSide > 100 ||
    isNaN(newSquaresPerSide);

  if (isInputInvalid) return;
  return newSquaresPerSide;
}

function changeGridSizeOnRequest() {
  const changeGridSizeButton = document.querySelector('#change-grid-size');

  changeGridSizeButton.addEventListener('click', () => {
    const newSquaresPerSide = getNewSquaresPerSide();
    const isNewSquaresPerSideValid = newSquaresPerSide !== undefined;

    if (isNewSquaresPerSideValid) {
      updateGrid(newSquaresPerSide);
    }
  });
}

createGrid(16);
updateShownGridSize(16);
changeHoveredSquaresColor();
clearGridOnClick();
changeGridSizeOnRequest();
