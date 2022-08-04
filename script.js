const squares = document.body.querySelectorAll(".valueSquare");
// squares.forEach(elem => addEvent(elem, "click"));
const imagesPath = { "cross": "./img/cross.svg", "circle": "./img/circle.svg" };
const gameData = ["", "", "", "", "", "", "", "", ""];
const playerData = { "actualPlayer": ["PlayerOne", "PlayerTwo"], "PlayerOne": "cross", "PlayerTwo": "circle", "isLocked": false };
const playerScreenValue = document.body.querySelector("#playerScreenValue");


function resetValues() {
  gameData.forEach((elem, index) => gameData[index] = "");
  playerScreenValue.innerHTML = "";
  playerData.actualPlayer = ["PlayerOne", "PlayerTwo"];
  updateScreen()
}

function addAction() {
  squares.forEach(function(elem) {
    elem.addEventListener("click", (elem) => playerAction(elem, playerData.actualPlayer[0]))
  })
}

function playerAction(elem, player) {
  const actPlayer = player;
  const elemId = Number(elem.target.id.slice(2)) - 1;
  if (!verifySquare(elemId, actPlayer) && elemId != -1) {
    changeValue((elemId), (playerData.actualPlayer))
    switchPlayer()
    updateScreen()
  };
}

function verifySquare(id, player) {
  /* Verifica se o quadrado já está preenchido. */
  if (gameData[id] === "circle" || gameData[id] === "cross") {     return true; } 
  else { return false; }
}

function changeValue(pos) {
  const player = playerData.actualPlayer[0];
  if (player == "PlayerOne") {
    gameData[pos] = "cross";
  } else if (player == "PlayerTwo") {
    gameData[pos] = "circle";
  }
}
function switchPlayer() {
  if (playerData.actualPlayer === "") { playerData.actualPlayer = ["PlayerOne", "PlayerTwo"]; }
  [playerData.actualPlayer[0], playerData.actualPlayer[1]] = [playerData.actualPlayer[1], playerData.actualPlayer[0]];
  updateScreen()
}

function updateScreen() {
  playerScreenValue.innerHTML = playerData.actualPlayer[0].replace("Player", "Player ");
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


resetValues()
addAction();
updateScreen()