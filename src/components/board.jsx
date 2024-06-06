
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
        ["red", "empty", "red", "empty", "red", "empty", "red", "empty"]
    ]

    const [boardState, setBoardState] = useState(checkerboard)
    const [selectedBlack, setSelectedBlack] = useState()
    const [selectedRed, setSelectedRed] = useState()
    const [playerTurn, setPlayerTurn] = useState("red")

    useEffect(() =>
        console.log(selectedBlack), [boardState])

    








    function Square({ typePiece, index }) {

        

        const swapSquares = (row, col, color) =>{
     

            
            const boardCopy = boardState.map(value => [...value])
            const temp = boardCopy[row][col]
            if (color === "black")
            {
                boardCopy[row][col] = boardCopy[selectedBlack[0]][selectedBlack[1]]
                boardCopy[selectedBlack[0]][selectedBlack[1]] = temp
            }
            else
            {
                boardCopy[row][col] = boardCopy[selectedRed[0]][selectedRed[1]]
                boardCopy[selectedRed[0]][selectedRed[1]] = temp
            }
            setSelectedBlack()
            setSelectedRed()
            setBoardState(boardCopy)
            console.log("swapping squares is complete")
           
            
        }

        const closeOpen = () =>{
            
    
        }




        function CheckerPiece({ index, typePiece }) {


            function Red({index}) {

                const setOpen = (row, col) => {
                    const boardCopy = boardState.map(value => [...value])


                    if (boardCopy[row - 1][col - 1] === "empty")
                        boardCopy[row - 1][col - 1] = "open"

                    if (boardCopy[row - 1][col + 1] === "empty")
                        boardCopy[row - 1][col + 1] = "open"

                    setBoardState(boardCopy)
                    setSelectedRed([row, col])
                    

                }

                function selectRed(){
                    if (playerTurn !== "red")
                        return;

                    const row = index[0]
                    const col = index[1]
                    
                    setOpen(row, col, playerTurn)
                    
                }
                return (<button onClick={selectRed}><img className="whitePiece-image" src="images\white_piece-removebg-preview.png"></img></button>)
            }

            function Black({ index }) {

                const setOpen = (row, col) => {
                    const boardCopy = boardState.map(value => [...value])


                    if (boardCopy[row + 1][col - 1] === "empty")
                        boardCopy[row + 1][col - 1] = "open"
                    if (boardCopy[row + 1][col + 1] === "empty")
                        boardCopy[row + 1][col + 1] = "open"

                    if(boardCopy[row + 1][col - 1] === "red" && boardCopy[row + 2][col - 2] === "empty")
                        boardCopy[row + 2][col - 2] = "open"
                    if(boardCopy[row + 1][col + 1] === "red" && boardCopy[row + 2][col + 2] === "empty" )
                        boardCopy[row + 2][col + 2] = "open"

                    setBoardState(boardCopy)
                    setSelectedBlack([row, col])
                    

                }





                function selectBlack() {
                    if(playerTurn !== "black")
                        return;

                    const row = index[0]
                    const col = index[1]

                    setOpen(row, col)


                }



                return (<button onClick={selectBlack}><img className="blackPiece-image" src="images\blackPiece-removebg-preview (1).png"></img></button>)
            }

            function Open({ index }) {

                

                function completeMove() {
                    swapSquares(index[0], index[1], playerTurn)
                    if (playerTurn === "red")
                        setPlayerTurn("black")
                    else if (playerTurn === "black")
                        setPlayerTurn("red")
                }




                return (<button onClick={completeMove}>Open</button>)
            }









            if (typePiece === "black")
                return (<Black index={index} />)
            else if (typePiece === "red")
                return (<Red index={index} />)
            else if (typePiece === "open")
                return (<Open index={index} />)
        }


        if (index[0] % 2 === 0 && index[1] % 2 === 0 || index[0] % 2 !== 0 && index[1] % 2 !== 0) {
            return (<div className="square pink"><CheckerPiece index={index} typePiece={typePiece} /></div>)
        }
        else {
            return (<div className="square blue"><CheckerPiece index={index} typePiece={typePiece} /></div>)
        }
    }

    const boardMapping = boardState.map((row, rowIndex) => (
        row.map((typePiece, SquareIndex) =>
        (
            <Square key={[rowIndex, SquareIndex]} index={[rowIndex, SquareIndex]} typePiece={typePiece} />
        ))
    ))


    return (
        <div className="board">{boardMapping}</div>
    )

}