export const Square = ({ children, index, updateBoard, isSelected }) => {
  const squareClassName = `square ${isSelected ? "is-selected" : ""}`;

  const handleSquareClick = () => {
    updateBoard(index);
  };

  const handleSquareKey = (event) => {
    if (event.key === "Enter") {
      updateBoard(index);
    }
  };

  return (
    <div
      className={squareClassName}
      role="button"
      tabIndex={0}
      onClick={handleSquareClick}
      onKeyDown={handleSquareKey}
    >
      {children}
    </div>
  );
};
