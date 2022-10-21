

let board = ['','','','','','','','','']
const winPaths = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]
const marks = ['O','X']
let players = 0
let gameOver = false
function winCondition(){
    let reset = false
    winPaths.forEach(path => {
        if(
            marks[players] === board[path[0]]
            && board[path[0]] === board[path[1]] 
            && board[path[1]] === board[path[2]]
            ) reset = true
    })
    return reset
}

// Initalize all tiles in the game.
document.addEventListener('DOMContentLoaded',(evt)=>{
    const gameStatus = document.getElementById('status')
    const tiles = document.getElementById('board').children
    document.getElementsByClassName('btn')[0].onclick = (evt)=>{
        gameOver = false
        gameStatus.classList.remove("you-won")
        gameStatus.textContent = 'Move your mouse over a square and click to play an X or an O.'
        for( i = 0 ; i <tiles.length ; i++) tiles[i].textContent = '';
        board = ['','','','','','','','','']
    }
    for(i = 0 ; i < tiles.length ; i++){
        const tile = tiles[i]
        tile.classList.add('square')
        tile.id = `${i}`
        tile.addEventListener('click',(evt)=>{
            const index = evt.currentTarget.id
            if( board[index] === ''  && !gameOver) {
                const tile = document.getElementById(index)
                board[index] = marks[players]
                tile.classList.add(marks[players])
                tile.textContent = marks[players]
                gameOver = winCondition()
                if( gameOver ) {
                    gameStatus.classList.add('you-won')
                    gameStatus.textContent = `Congratulations! ${marks[players]} is the Winner!`
                }
                players = ++players % 2
            }
        })
        tile.addEventListener('mouseover',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.add('hover')
        })
        tile.addEventListener('mouseleave',(evt)=>{
            document.getElementById(evt.currentTarget.id).classList.remove('hover')
        })
    }
})