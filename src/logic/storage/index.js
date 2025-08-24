export const saveGameToStorage = ({ board, turn, winner }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
  window.localStorage.setItem('winner', JSON.stringify(winner))
}

export const resetGameFromStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
  window.localStorage.removeItem('winner')
}
