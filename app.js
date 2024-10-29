const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
]

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index){
  if(cell.textContent == '' && !isPauseGame){
    isGameStart = true
    updeteCell(cell, index)
    if(!checkWinner()){
      changlePlayer()
      MakeMove()
    }
  }
}

function updeteCell(cell, index){
  cell.textContent = player
  inputCells[index] = player
  cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}

function changlePlayer(){
  player = (player == 'X') ? 'O' : 'X'
}

function MakeMove(){
  isPauseGame = true

  setTimeout(() => {
    let moveIndex = logic(player)

    updeteCell(cells[moveIndex], moveIndex, player)
    if(!checkWinner()){
      changlePlayer()
      isPauseGame = false
      return
    }
    player = (player == 'X') ? 'O' : 'X'
  }, 1000)
}

function checkWinner(){
  for (const [a, b, c] of winConditions){
    if (inputCells[a] == player &&
        inputCells[b] == player &&
        inputCells[c] == player
    ){
      declareWiner([a, b, c])
      return true
    }
  }
  if (inputCells.every(cell => cell != '')){
    declareDraw()
    return true
  }
}

function declareWiner(winningIndices){
  titleHeader.textContent = `${player} Win`
  isPauseGame = true
  winningIndices.forEach((index) => 
    cells[index].style.background = '#2A2343'
  )
  restartBtn.style.visibility = 'visible'
}

function declareDraw(){
  titleHeader.textContent = `Draw!`
  isPauseGame = true
  restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
  if (!isGameStart) {
    player = selectedPlayer
    if (player == 'X'){
      xPlayerDisplay.classList.add('player-active')
      oPlayerDisplay.classList.remove('player-active')
    }
    else{
      xPlayerDisplay.classList.remove('player-active')
      oPlayerDisplay.classList.add('player-active')
    }
  }
}

restartBtn.addEventListener('click', () => {
  restartBtn.style.visibility = 'hidden'
  inputCells.fill('')
  cells.forEach(cell => {
    cell.textContent = ''
    cell.style.background = ''
  })
  isPauseGame = false
  isGameStart = false
  titleHeader.textContent = 'Choose'
})

// Рандомный ход
function randomMove(){
  do {
      res = Math.floor(Math.random() * inputCells.length)
    } while (
      inputCells[res] != ''
    )
  return res
}

// Логика хода
function logic(S){
  let U = S
  S = (S == 'X') ? 'O' : 'X'
  if(inputCells[4] == ''){
    return 4
  }

  if(inputCells[0] == '' && inputCells[1] == '' && inputCells[2] == '' && inputCells[3] == '' && inputCells[5] == '' && inputCells[6] == '' && inputCells[7] == '' && inputCells[8] == ''){
    return 2
  }

  if(inputCells[0] == '' && inputCells[2] == '' && inputCells[6] == '' && inputCells[8] == '' && inputCells[1] == S && inputCells[3] == S ){
    return 0
  } 
  else if (inputCells[0] == '' && inputCells[2] == '' && inputCells[6] == '' && inputCells[8] == '' && inputCells[1] == S && inputCells[5] == S ){
    return 2
  }
  else if (inputCells[0] == '' && inputCells[2] == '' && inputCells[6] == '' && inputCells[8] == '' && inputCells[3] == S && inputCells[7] == S ){
    return 6
  }
  else if (inputCells[0] == '' && inputCells[2] == '' && inputCells[6] == '' && inputCells[8] == '' && inputCells[5] == S && inputCells[7] == S ){
    return 8
  }
  
  if(inputCells[0] == U && inputCells[1] == U && inputCells[2] == '' ) return 2
  if(inputCells[3] == U && inputCells[4] == U && inputCells[2] == '' ) return 5
  if(inputCells[6] == U && inputCells[7] == U && inputCells[2] == '' ) return 8

  if(inputCells[1] == U && inputCells[2] == U && inputCells[0] == '' ) return 0
  if(inputCells[4] == U && inputCells[5] == U && inputCells[3] == '' ) return 3
  if(inputCells[7] == U && inputCells[8] == U && inputCells[6] == '' ) return 6

  if(inputCells[0] == U && inputCells[3] == U && inputCells[6] == '' ) return 6
  if(inputCells[1] == U && inputCells[4] == U && inputCells[7] == '' ) return 7
  if(inputCells[2] == U && inputCells[5] == U && inputCells[8] == '' ) return 8

  if(inputCells[3] == U && inputCells[6] == U && inputCells[0] == '' ) return 0
  if(inputCells[4] == U && inputCells[7] == U && inputCells[1] == '' ) return 1
  if(inputCells[5] == U && inputCells[8] == U && inputCells[2] == '' ) return 2

  if(inputCells[0] == U && inputCells[4] == U && inputCells[8] == '' ) return 8
  if(inputCells[4] == U && inputCells[8] == U && inputCells[0] == '' ) return 0
  if(inputCells[2] == U && inputCells[4] == U && inputCells[6] == '' ) return 6
  if(inputCells[4] == U && inputCells[6] == U && inputCells[2] == '' ) return 2

  if(inputCells[0] == U && inputCells[2] == U && inputCells[1] == '' ) return 1
  if(inputCells[0] == U && inputCells[6] == U && inputCells[3] == '' ) return 3
  if(inputCells[2] == U && inputCells[8] == U && inputCells[5] == '' ) return 5
  if(inputCells[6] == U && inputCells[8] == U && inputCells[7] == '' ) return 7


  if(inputCells[4] == S && inputCells[0] == S && inputCells[8] == '' ) return 8
  if(inputCells[6] == S && inputCells[7] == S && inputCells[8] == '' ) return 8
  if(inputCells[2] == S && inputCells[5] == S && inputCells[8] == '' ) return 8

  if(inputCells[4] == S && inputCells[1] == S && inputCells[7] == '' ) return 7
  if(inputCells[6] == S && inputCells[8] == S && inputCells[7] == '' ) return 7

  if(inputCells[4] == S && inputCells[2] == S && inputCells[6] == '' ) return 6
  if(inputCells[0] == S && inputCells[3] == S && inputCells[6] == '' ) return 6
  if(inputCells[7] == S && inputCells[8] == S && inputCells[6] == '' ) return 6

  if(inputCells[4] == S && inputCells[3] == S && inputCells[5] == '' ) return 5
  if(inputCells[2] == S && inputCells[8] == S && inputCells[5] == '' ) return 5
  
  if(inputCells[4] == S && inputCells[5] == S && inputCells[3] == '' ) return 3
  if(inputCells[0] == S && inputCells[6] == S && inputCells[3] == '' ) return 3

  if(inputCells[4] == S && inputCells[6] == S && inputCells[2] == '' ) return 2
  if(inputCells[0] == S && inputCells[1] == S && inputCells[2] == '' ) return 2
  if(inputCells[5] == S && inputCells[8] == S && inputCells[2] == '' ) return 2

  if(inputCells[4] == S && inputCells[7] == S && inputCells[1] == '' ) return 1
  if(inputCells[0] == S && inputCells[2] == S && inputCells[1] == '' ) return 1

  if(inputCells[4] == S && inputCells[8] == S && inputCells[0] == '' ) return 0
  if(inputCells[1] == S && inputCells[2] == S && inputCells[0] == '' ) return 0
  if(inputCells[3] == S && inputCells[6] == S && inputCells[0] == '' ) return 0

  if(inputCells[0] == S && inputCells[2] == S && inputCells[1] != U && inputCells[1] == '' ) return 1
  if(inputCells[2] == S && inputCells[8] == S && inputCells[5] != U && inputCells[5] == '' ) return 5
  if(inputCells[6] == S && inputCells[8] == S && inputCells[7] != U && inputCells[7] == '' ) return 7
  if(inputCells[0] == S && inputCells[6] == S && inputCells[3] != U && inputCells[3] == '' ) return 3

  if(inputCells[4] == S && inputCells[0] == S && inputCells[8] == U && inputCells[1] == '' ) return 1
  if(inputCells[4] == S && inputCells[6] == S && inputCells[2] == U && inputCells[8] == '' ) return 8

  if(inputCells[0] == S && inputCells[8] == S && inputCells[4] == U && inputCells[1] == '' ) return 1
  if(inputCells[2] == S && inputCells[6] == S && inputCells[4] == U && inputCells[7] == '' ) return 7

  if(inputCells[1] == S && inputCells[8] == S && inputCells[4] == U && inputCells[2] == '' ) return 2
  if(inputCells[1] == S && inputCells[6] == S && inputCells[4] == U && inputCells[0] == '' ) return 0
  if(inputCells[6] == S && inputCells[5] == S && inputCells[4] == U && inputCells[8] == '' ) return 8
  if(inputCells[0] == S && inputCells[5] == S && inputCells[4] == U && inputCells[2] == '' ) return 2
  if(inputCells[2] == S && inputCells[7] == S && inputCells[4] == U && inputCells[8] == '' ) return 8
  if(inputCells[0] == S && inputCells[7] == S && inputCells[4] == U && inputCells[6] == '' ) return 6
  if(inputCells[3] == S && inputCells[8] == S && inputCells[4] == U && inputCells[6] == '' ) return 6
  if(inputCells[2] == S && inputCells[3] == S && inputCells[4] == U && inputCells[0] == '' ) return 0
  
  return randomMove()
}
