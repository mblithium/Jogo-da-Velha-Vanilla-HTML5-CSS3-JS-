const squares = document.body.querySelectorAll(".valueSquare");
// squares.forEach(elem => addEvent(elem, "click"));
const imagesPath = { "cross": "./img/cross.svg", "circle": "./img/circle.svg" };

const gameData = ["cross", "", "circle", "", "", "", "", "", ""];

function resetValues() {
  gameData.forEach((elem, index) => gameData[index] = "");
}

function updateScreen() {
  for (i = 0; i < 9; i++) {
    switch (gameData[i]) {
      case "cross":
        squares[i].innerHTML = `<img src="${imagesPath.cross}"></img>`;
        break;
      case "circle":
        squares[i].innerHTML = `<img src="${imagesPath.circle}"></img>`;
        break;
      default:
        squares[i].innerHTML = "";
    }
  }  
}

function verifySquare() {
  
}

resetValues();
updateScreen();