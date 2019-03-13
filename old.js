let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function(e) {
  if (e.target.classList.contains('easy')) {
    speed = 1000;
  } else if (e.target.classList.contains('middle')) {
    speed = 500;
  } else if (e.target.classList.contains('hard')) {
    speed = 200;
  }

  if (e.target.classList.contains('button')) {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    starGame();
  }
})

function starGame() {
  let fullTetris = document.createElement('div');
  fullTetris.classList.add('full-tetris');

  for (let i = 1; i < 181; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    fullTetris.appendChild(cell);
  }

  let mainWrap = document.getElementsByClassName('main-wrap')[0];
  mainWrap.appendChild(fullTetris);

  let cells = document.getElementsByClassName('cell');
  let i = 0;
  for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      cells[i].setAttribute('posX', x);
      cells[i].setAttribute('posY', y);
      i++;
    }
  }

  let x = 5, y = 15;
  let figuresArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]]],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]]],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-1,-1],[2,-2],[1,-1],[0,0]]],[[1,0],[0,1],[0,2],[[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]],]

  let currentFigure = 0;
  let figuresBody = 0;
  let rotate = 1;

  function createFigure() {
    function getRandom() {
      return Math.round(Math.random()*(figuresArr.length - 1));
    }

    rotate = 1;
    currentFigure = getRandom();

    figuresBody = [
      document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
      document.querySelector(`[posX = "${x + figuresArr[currentFigure][0][0]}"][posY = "${y + figuresArr[currentFigure][0][1]}"]`),
      document.querySelector(`[posX = "${x + figuresArr[currentFigure][1][0]}"][posY = "${y + figuresArr[currentFigure][1][1]}"]`),
      document.querySelector(`[posX = "${x + figuresArr[currentFigure][2][0]}"][posY = "${y + figuresArr[currentFigure][2][1]}"]`)
    ]

    for (let i = 0; i < figuresBody.length; i++) {
      figuresBody[i].classList.add('figure');
    }

  }

  createFigure();

  let score = 0;
  let result = document.getElementsByClassName('result')[0];
  result.innerHTML = `Ваши очки: <span>${score}</span>`;

  function movementFigure() {
    let moveFlag = true;
    let coords = [
      [figuresBody[0].getAttribute('posX'), figuresBody[0].getAttribute('posY')],
      [figuresBody[1].getAttribute('posX'), figuresBody[1].getAttribute('posY')],
      [figuresBody[2].getAttribute('posX'), figuresBody[2].getAttribute('posY')],
      [figuresBody[3].getAttribute('posX'), figuresBody[3].getAttribute('posY')]
    ]
    
    for (let i = 0; i < coords.length; i++) {
      if (coords[i][1] == 1 || document.querySelector(`[posX = "${coords[i][0]}"][posY = "${coords[i][1] - 1}"]`).classList.contains('set')) {
        moveFlag = false;
        break;
      }
    }

    if (moveFlag) {
      for (let i = 0; i < figuresBody.length; i++) {
        figuresBody[i].classList.remove('figure');
      }

      figuresBody = [
        document.querySelector(`[posX = "${coords[0][0]}"][posY = "${coords[0][1] - 1}"]`),
        document.querySelector(`[posX = "${coords[1][0]}"][posY = "${coords[1][1] - 1}"]`),
        document.querySelector(`[posX = "${coords[2][0]}"][posY = "${coords[2][1] - 1}"]`),
        document.querySelector(`[posX = "${coords[3][0]}"][posY = "${coords[3][1] - 1}"]`)
      ]

      for (let i = 0; i < figuresBody.length; i++) {
        figuresBody[i].classList.add('figure');
      }

    } else {
      for (let i = 0; i < figuresBody.length; i++) {
        figuresBody[i].classList.remove('figure');
        figuresBody[i].classList.add('set');
      }

      for (let i = 1; i < 15; i++) {
        let count = 0;
        for (let j = 1; j < 11; j++) {
          if (document.querySelector(`[posX = "${j}"][posY = "${i}"]`).classList.contains('set')) {
            count++;
            if (count == 10) {
              score += 10;
              result.innerHTML = `Ваши очки: <span>${score}</span>`;
              for (let k = 1; k < 11; k++) {
                document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.remove('set');
              }

              let restSetElem = document.querySelectorAll('.set');
              let newSet = [];

              for (let s = 0; s < restSetElem.length; s++) {
                let setCoords = [restSetElem[s].getAttribute('posX'), restSetElem[s].getAttribute('posY')];
                if (setCoords[1] > i) {
                  restSetElem[s].classList.remove('set');
                  newSet.push(document.querySelector(`[posX = "${setCoords[0]}"][posY = "${setCoords[1] - 1}"]`));
                }
              }

              for (let n = 0; n < newSet.length; n++) {
                newSet[n].classList.add('set');
              }

              i--;

            }
          }
          
        }
      }

      for (let r = 1; r < 11; r++) {
        if (document.querySelector(`[posX = "${r}"][posY = "15"]`).classList.contains('set')) {
          clearInterval(interval);
          alert(`Игра окончена. Ваши очки: ${score}`);
          break;
        }
      }

      createFigure();
    }
  }

  let interval = setInterval(() => {
    movementFigure();
  }, speed);

  let keydownFlag;

  window.addEventListener('keydown', function(e) {

    let coord1 = [figuresBody[0].getAttribute('posX'), figuresBody[0].getAttribute('posY')];
    let coord2 = [figuresBody[1].getAttribute('posX'), figuresBody[1].getAttribute('posY')];
    let coord3 = [figuresBody[2].getAttribute('posX'), figuresBody[2].getAttribute('posY')];
    let coord4 = [figuresBody[3].getAttribute('posX'), figuresBody[3].getAttribute('posY')]
    
    function getNewState(a) {

      keydownFlag = true;
      
      let newFigure = [
        document.querySelector(`[posX = "${+coord1[0] + a}"][posY = "${coord1[1]}"]`),
        document.querySelector(`[posX = "${+coord2[0] + a}"][posY = "${coord2[1]}"]`),
        document.querySelector(`[posX = "${+coord3[0] + a}"][posY = "${coord3[1]}"]`),
        document.querySelector(`[posX = "${+coord4[0] + a}"][posY = "${coord4[1]}"]`)
      ];

      for (let i = 0; i < newFigure.length; i++) {
        if (!newFigure[i] || newFigure[i].classList.contains('set')) {
          keydownFlag = false;
        }
      }

      if (keydownFlag) {
        for (let i = 0; i < figuresBody.length; i++) {
          figuresBody[i].classList.remove('figure');
        }

        figuresBody = newFigure;

        for (let i = 0; i < figuresBody.length; i++) {
          figuresBody[i].classList.add('figure');
        }
      }

    }

    if (e.keyCode == 37) {
      getNewState(-1);
    } else if (e.keyCode == 39) {
      getNewState(1);
    } else if (e.keyCode == 40) {
      movementFigure();
    } else if (e.keyCode == 38) {

      keydownFlag = true;
      
    let newFigure = [
      document.querySelector(`[posX = "${+coord1[0] + figuresArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coord1[1] + figuresArr[currentFigure][rotate + 2][0][1]}"]`),
      document.querySelector(`[posX = "${+coord2[0] + figuresArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coord2[1] + figuresArr[currentFigure][rotate + 2][1][1]}"]`),
      document.querySelector(`[posX = "${+coord3[0] + figuresArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coord3[1] + figuresArr[currentFigure][rotate + 2][2][1]}"]`),
      document.querySelector(`[posX = "${+coord4[0] + figuresArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coord4[1] + figuresArr[currentFigure][rotate + 2][3][1]}"]`)
    ];

      for (let i = 0; i < newFigure.length; i++) {
        if (!newFigure[i] || newFigure[i].classList.contains('set')) {
          keydownFlag = false;
        }
      }

      if (keydownFlag) {
        for (let i = 0; i < figuresBody.length; i++) {
          figuresBody[i].classList.remove('figure');
        }

        figuresBody = newFigure;

        for (let i = 0; i < figuresBody.length; i++) {
          figuresBody[i].classList.add('figure');
        }

        if (rotate < 4) {
          rotate++;
        } else {
          rotate = 1;
        }
      }

    }

  })
}
