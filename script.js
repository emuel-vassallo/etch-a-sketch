'use strict';

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

function getRandomNumber(maxNum) {
  let randomNumber = Math.random();
  randomNumber = randomNumber * maxNum;
  const roundedRandomNumber = Math.floor(randomNumber);
  return roundedRandomNumber;
}

function getRandomNumbers(numbersAmount, maxNum) {
  let randomNumbers = [];
  for (let i = 0; i < numbersAmount; i++) {
    const randomNumber = getRandomNumber(maxNum);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

function getRandomColor() {
  const randomNumbers = getRandomNumbers(3, 255);
  return `rgb(${randomNumbers[0]}, ${randomNumbers[1]}, ${randomNumbers[2]})`;
}

function getSquareColor(squareElement) {
  return window.getComputedStyle(squareElement)['background-color'];
}

function changeSquareColorRandom(squareElement) {
  const randomColor = getRandomColor();
  squareElement.style.backgroundColor = randomColor;
}

function changeSquareColorNormal(squareElement) {
  squareElement.style.backgroundColor = '#202020';
}

function getRgbValues(squareElement) {
  const squareColor = getSquareColor(squareElement);
  return squareColor
    .replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',');
}

function getTenPercentLess(num) {
  let reducedNum = num - 0.1 * num;
  if (reducedNum < 0) return 0;
  reducedNum = Math.round(reducedNum);
  return reducedNum;
}

function getDarkenedRgbValues(rgbValues) {
  let darkenedRgbValues = [];
  for (let i = 0; i < 3; i++) {
    const rgbValue = rgbValues[i];
    let darkenedRgbValue = getTenPercentLess(rgbValue);
    darkenedRgbValues.push(darkenedRgbValue);
  }
  return darkenedRgbValues;
}

function getDarkenedColor(darkenedRgbValues) {
  return `rgb(${darkenedRgbValues[0]}, ${darkenedRgbValues[1]}, ${darkenedRgbValues[2]})`;
}

function changeSquareColorDarken(squareElement) {
  const rgbValues = getRgbValues(squareElement);
  const darkenedRgbValues = getDarkenedRgbValues(rgbValues);
  const darkenedColor = getDarkenedColor(darkenedRgbValues);
  squareElement.style.backgroundColor = darkenedColor;
}

function eraseSquareColor(squareElement) {
  squareElement.style.backgroundColor = '#d8d8d8';
}

function updateShownGridSize(squaresPerSide) {
  const gridSizeTag = document.querySelector('#grid-size');
  gridSizeTag.textContent = `${squaresPerSide}x${squaresPerSide}`;
}

function changeHoveredSquaresColor() {
  const normalModeButton = document.querySelector('#normal-mode');
  const rainbowModeButton = document.querySelector('#rainbow-mode');
  const squares = document.querySelectorAll('.grid-square');

  squares.forEach((square) => {
    square.addEventListener('mouseover', (e) => {
      const squareHovered = e.target;
      const isNormalModeSelected =
        normalModeButton.classList.contains('selected-mode');
      const isRainbowModeSelected =
        rainbowModeButton.classList.contains('selected-mode');
      if (isNormalModeSelected) changeSquareColorNormal(squareHovered);
      else if (isRainbowModeSelected) changeSquareColorRandom(squareHovered);
      else changeSquareColorDarken(squareHovered);
    });
  });
}

function changeColorMode() {
  const normalModeButton = document.querySelector('#normal-mode');
  const rainbowModeButton = document.querySelector('#rainbow-mode');
  const darkenModeButton = document.querySelector('#darken-mode');

  rainbowModeButton.addEventListener('click', () => {
    rainbowModeButton.classList.add('selected-mode');
    normalModeButton.classList.remove('selected-mode');
    darkenModeButton.classList.remove('selected-mode');
  });

  normalModeButton.addEventListener('click', () => {
    normalModeButton.classList.add('selected-mode');
    rainbowModeButton.classList.remove('selected-mode');
    darkenModeButton.classList.remove('selected-mode');
  });

  darkenModeButton.addEventListener('click', () => {
    darkenModeButton.classList.add('selected-mode');
    normalModeButton.classList.remove('selected-mode');
    rainbowModeButton.classList.remove('selected-mode');
  });
}

function clearGridOnClick() {
  const sketchBoard = document.querySelector('#sketch-board');
  const squares = document.querySelectorAll('.grid-square');
  const clearButton = document.querySelector('#clear');

  clearButton.addEventListener('click', () => {
    sketchBoard.classList.add('apply-shake');

    sketchBoard.addEventListener('animationend', () => {
      sketchBoard.classList.remove('apply-shake');

      squares.forEach((square) => {
        eraseSquareColor(square);
      });
    });
  });
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
  const buttonChangeGridSize = document.querySelector('#change-grid-size');
  buttonChangeGridSize.addEventListener('click', () => {
    const newSquaresPerSide = getNewSquaresPerSide();
    const isNewSquaresPerSideInvalid = newSquaresPerSide === undefined;
    if (isNewSquaresPerSideInvalid) return;
    updateGrid(newSquaresPerSide);
  });
}

function updateGrid(newSquaresPerSide) {
  removAllGridSquares();
  createGrid(newSquaresPerSide);
  updateShownGridSize(newSquaresPerSide);
  changeHoveredSquaresColor();
  changeColorMode();
  clearGridOnClick();
}

updateGrid(16);
changeGridSizeOnRequest();
