import { Square } from './Square'

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return

  const matchResult = winner ? 'The winner is:' : "It's a tie"

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{matchResult}</h2>

        {winner && (
          <div className='win'>
            <Square>{winner}</Square>
          </div>
        )}

        <button onClick={resetGame}>Play again</button>
      </div>
    </section>
  )
}
