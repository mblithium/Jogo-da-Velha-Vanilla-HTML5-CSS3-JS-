const squares = document.body.querySelectorAll(".valueSquare");
const imagesPath = { "cross": "./img/cross.svg", "circle": "./img/circle.svg" };
const gameData = ["", "", "", "", "", "", "", "", ""];
const playerData = { "actualPlayer": ["PlayerOne", "PlayerTwo"], "PlayerOne": "cross", "PlayerTwo": "circle", "isLocked": false };
const playerScreenValue = document.body.querySelector("#playerScreenValue");


function resetValues() {
  gameData.forEach((elem, index) => gameData[index] = "");
  playerScreenValue.innerHTML = "";
  playerData.actualPlayer = ["PlayerOne", "PlayerTwo"];
  playerData.isLocked = false;
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
  if ( !verifySquare(elemId, actPlayer) && elemId != -1 && playerData.isLocked == false) {
    changeValue((elemId), (playerData.actualPlayer));
    switchPlayer();
    verifyRule(gameData);
  };
}

function verifySquare(id, player) {
  if (
    gameData[id] === "circle" || 
    gameData[id] === "cross"
  ) { return true; } 
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
  updateScreen();
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

function game() {
  return false;
}

function verifyRule(gameData) {
    const gd = gameData;
    console.log('Esta funcionando.')
    console.log(gd[0] == gd[1] && gd[1] == gd[2])
  /*
    switch (gd) {
      case (gd[0] == gd[1] && gd[1] == gd[2]):
        window.alert("VELHA");
        console.log(gd);
        break;
      default: console.log("Nada");
    }
  */
  if (gd[0] == gd[1] && gd[1] == gd[2] && gd[0] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[0])}`)
    playerData.isLocked = true;
  }
  if (gd[3] == gd[4] && gd[3] == gd[5] && gd[3] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[3])}`)
    playerData.isLocked = true;
  }
  if (gd[6] == gd[7] && gd[6] == gd[8] && gd[6] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[6])}`)
    playerData.isLocked = true;
  }

  if (gd[0] == gd[3] && gd[0] == gd[6] && gd[0] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[0])}`)
    playerData.isLocked = true;
  }
  if (gd[1] == gd[4] && gd[1] == gd[7] && gd[1] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[1])}`)
    playerData.isLocked = true;
  }
  if (gd[2] == gd[5] && gd[2] == gd[8] && gd[2] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[2])}`)
    playerData.isLocked = true;
  }

  if (gd[0] == gd[4] && gd[0] == gd[8] && gd[0] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[0])}`)
    playerData.isLocked = true;
  }
  if (gd[2] == gd[4] && gd[2] == gd[6] && gd[2] != "") {
    window.alert(`Velha, o jogador vencedor é ${playerConvert(gd[2])}`)
    playerData.isLocked = true;
  }
  

  function playerConvert(p) {
    if (p == "cross") return "Jogador Um";
    if (p == "circle") return "Jogador Dois";
  }
}


resetValues()
addAction();
updateScreen()