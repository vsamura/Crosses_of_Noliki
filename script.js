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
      randomPick()
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

function randomPick(){
  isPauseGame = true

  setTimeout(() => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length)
    } while (
      inputCells[randomIndex] != ''
    )

    updeteCell(cells[randomIndex], randomIndex, player)
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