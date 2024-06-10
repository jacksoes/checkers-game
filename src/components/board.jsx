import { useState, useEffect } from "react";

export default function Board() {
  const checkerboard = [
    ["empty", "black", "empty", "black", "empty", "black", "empty", "black"],
    ["black", "empty", "black", "empty", "black", "empty", "black", "empty"],
    ["empty", "black", "empty", "black", "empty", "black", "empty", "black"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ["red", "empty", "red", "empty", "red", "empty", "red", "empty"],
    ["empty", "red", "empty", "red", "empty", "red", "empty", "red"],
    ["red", "empty", "red", "empty", "red", "empty", "red", "empty"],
  ];

  const [boardState, setBoardState] = useState(checkerboard);
  const [selectedBlack, setSelectedBlack] = useState();
  const [selectedRed, setSelectedRed] = useState();
  const [playerTurn, setPlayerTurn] = useState("red");

  useEffect(() => closeOpen(), [playerTurn]);

  useEffect(
    () => window.history.pushState(null, "", `playerTurn=${playerTurn}`),
    [playerTurn]
  );

  const closeOpen = () => {
    const boardCopy = boardState.map((row) =>
      row.map((value) => (value === "open" ? "empty" : value))
    );
    setBoardState(boardCopy);
  };

  const checkOpenAbove = (row, col, boardCopy) => {
    aboveLeft(row, col, boardCopy);
    aboveRight(row, col, boardCopy);
    aboveLeftScore(row, col, boardCopy);
    aboveRightScore(row, col, boardCopy);

    function aboveLeft(row, col, boardCopy) {
      if (boardCopy[row - 1][col - 1] === "empty")
        boardCopy[row - 1][col - 1] = "open";
    }

    function aboveRight(row, col, boardCopy) {
      if (boardCopy[row - 1][col + 1] === "empty")
        boardCopy[row - 1][col + 1] = "open";
    }

    function aboveLeftScore(row, col, boardCopy) {
      if (
        boardCopy[row - 1][col - 1] === "black" &&
        boardCopy[row - 2][col - 2] === "empty"
      )
        boardCopy[row - 2][col - 2] = "open";
    }

    function aboveRightScore(row, col, boardCopy) {
      if (
        boardCopy[row - 1][col + 1] === "black" &&
        boardCopy[row - 2][col + 2] === "empty"
      )
        boardCopy[row - 2][col + 2] = "open";
    }
  };

  const checkOpenBelow = (row, col, boardCopy) => {
    belowLeft(row, col, boardCopy);
    belowRight(row, col, boardCopy);
    belowLeftScore(row, col, boardCopy);
    belowRightScore(row, col, boardCopy);

    function belowLeft(row, col, boardCopy) {
      if (boardCopy[row + 1][col - 1] === "empty")
        boardCopy[row + 1][col - 1] = "open";
    }

    function belowRight(row, col, boardCopy) {
      if (boardCopy[row + 1][col + 1] === "empty")
        boardCopy[row + 1][col + 1] = "open";
    }

    function belowRightScore(row, col, boardCopy) {
      if (
        boardCopy[row + 1][col + 1] === "red" &&
        boardCopy[row + 2][col + 2] === "empty"
      )
        boardCopy[row + 2][col + 2] = "open";
    }

    function belowLeftScore(row, col, boardCopy) {
      if (
        boardCopy[row + 1][col - 1] === "red" &&
        boardCopy[row + 2][col - 2] === "empty"
      )
        boardCopy[row + 2][col - 2] = "open";
    }
  };

  function Square({ typePiece, index }) {
    const swapSquares = (row, col, color) => {
      const boardCopy = boardState.map((value) => [...value]);
      const temp = boardCopy[row][col];
      if (color === "black") {
        if (row - selectedBlack[0] === 2)
          boardCopy[(selectedBlack[0] + row) / 2][
            (selectedBlack[1] + col) / 2
          ] = "empty";

        boardCopy[row][col] = boardCopy[selectedBlack[0]][selectedBlack[1]];
        boardCopy[selectedBlack[0]][selectedBlack[1]] = temp;
      } else {
        if (selectedRed[0] - row === 2)
          boardCopy[(selectedRed[0] + row) / 2][(selectedRed[1] + col) / 2] =
            "empty";

        boardCopy[row][col] = boardCopy[selectedRed[0]][selectedRed[1]];
        boardCopy[selectedRed[0]][selectedRed[1]] = temp;
      }
      setSelectedBlack();
      setSelectedRed();
      setBoardState(boardCopy);
      console.log("swapping squares is complete");
    };

    function CheckerPiece({ index, typePiece }) {
      function RedKing({ index }) {
        return <button className="redKing">red king</button>;
      }

      function Red({ index }) {
        const setOpen = (row, col) => {
          const boardCopy = boardState.map((value) => [...value]);

          checkOpenAbove(row, col, boardCopy);

          setBoardState(boardCopy);
          setSelectedRed([row, col]);
        };

        function selectRed() {
          if (playerTurn !== "red") return;

          const row = index[0];
          const col = index[1];

          setOpen(row, col, playerTurn);
        }
        return (
          <button onClick={selectRed}>
            <img
              className="whitePiece-image"
              src="images\white_piece-removebg-preview.png"
            ></img>
          </button>
        );
      }

      function Black({ index }) {
        const setOpen = (row, col) => {
          const boardCopy = boardState.map((value) => [...value]);

          checkOpenBelow(row, col, boardCopy);

          setBoardState(boardCopy);
          setSelectedBlack([row, col]);
        };

        function selectBlack() {
          if (playerTurn !== "black") return;

          const row = index[0];
          const col = index[1];

          setOpen(row, col);
        }

        return (
          <button onClick={selectBlack}>
            <img
              className="blackPiece-image"
              src="images\blackPiece-removebg-preview (1).png"
            ></img>
          </button>
        );
      }

      function Open({ index }) {
        function completeMove() {
          swapSquares(index[0], index[1], playerTurn);
          if (playerTurn === "red") setPlayerTurn("black");
          else if (playerTurn === "black") setPlayerTurn("red");
        }

        return (
          <button className="open" onClick={completeMove}>
            Open
          </button>
        );
      }

      if (typePiece === "black") return <Black index={index} />;
      else if (typePiece === "red") return <Red index={index} />;
      else if (typePiece === "open") return <Open index={index} />;
      else if (typePiece === "blackKing") return <BlackKing index={index} />;
      else if (typePiece === "redKing") return <RedKing index={index} />;
    }

    if (
      (index[0] % 2 === 0 && index[1] % 2 === 0) ||
      (index[0] % 2 !== 0 && index[1] % 2 !== 0)
    ) {
      return (
        <div className="square pink">
          <CheckerPiece index={index} typePiece={typePiece} />
        </div>
      );
    } else {
      return (
        <div className="square blue">
          <CheckerPiece index={index} typePiece={typePiece} />
        </div>
      );
    }
  }

  const boardMapping = boardState.map((row, rowIndex) =>
    row.map((typePiece, SquareIndex) => (
      <Square
        key={[rowIndex, SquareIndex]}
        index={[rowIndex, SquareIndex]}
        typePiece={typePiece}
      />
    ))
  );

  return <div className="board">{boardMapping}</div>;
}
