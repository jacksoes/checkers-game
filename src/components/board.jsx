
import { useState, useEffect } from "react";



export default function Board(){

    
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

    useEffect(() =>
        console.log(selectedBlack), [boardState])
    



    

    


    
    

    function Red(){
        return(<button><img className="whitePiece-image" src="images\white_piece-removebg-preview.png"></img></button>)
    }

    function Black({index}){

        const setOpen = (row, col) => {
            const boardCopy = boardState.map(value => [...value])
                

            if (boardCopy[row + 1][col - 1] === "empty")
                boardCopy[row + 1][col - 1] = "open"

            if (boardCopy[row + 1][col + 1] === "empty")
                boardCopy[row + 1][col + 1] = "open"
       
            setBoardState(boardCopy)
            setSelectedBlack([row, col])
    
        }


        


        const moveBlack = () => {
            
            const row = index[0]
            const col = index[1]

            setOpen(row, col)
            
           
        }

        
    
        return(<button onClick={moveBlack}><img className="blackPiece-image" src="images\blackPiece-removebg-preview (1).png"></img></button>)
    }

    function Open(){
        return(<button>Open</button>)
    }




   
   


    function CheckerPiece({index, typePiece}){
        if(typePiece === "black")
            return(<Black index={index} />)
        else if(typePiece === "red")
            return(<Red index={index} />)
        else if(typePiece === "open")
            return(<Open index={index} />)
    }

    function Square({typePiece, index}){
        if (index[0] % 2 === 0 && index[1] % 2 === 0 || index[0] % 2 !== 0 && index[1] % 2 !== 0) 
        {
            return(<div className="square pink"><CheckerPiece index={index} typePiece={typePiece} /></div>)
        }
        else
        {
            return(<div className="square blue"><CheckerPiece index={index} typePiece={typePiece} /></div>)
        }
    }  

    const boardMapping = boardState.map((row, rowIndex) => (
        row.map((typePiece, SquareIndex) =>
        (
            <Square key={[rowIndex, SquareIndex]} index={[rowIndex, SquareIndex]} typePiece={typePiece}  />
        ))
    ))


    return(
        <div className="board">{boardMapping}</div>
    )

}