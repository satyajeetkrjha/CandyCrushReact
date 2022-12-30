import { useEffect, useState } from "react";
import './App.css';
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
import Scoreboard from "./components/Scoreboard";
const width =8;
const candyColours = [
  blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
]

const App =() => {

  const[currentColorArrangement ,setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const checkForColumnOfThree =()=>{
    for(let i =0 ;i<=47;i++){
      // if we are at zero ,we want to check square with index 8 and also 16 so
      // [0,0+8,0+16] is [0,8,16] if we are at index 0
      //[1,1+8,1+16 ] is [1 ,9,25] if we are at index 1
      const columnOfThree = [i,i+width,i+width*2]; 
      const decidedColor = currentColorArrangement[i] ;// grabbing first color item at index 0 or 1 etc
      const isBlank = currentColorArrangement[i] === blank
      if(columnOfThree.every(square =>currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3)
         columnOfThree.forEach(square =>currentColorArrangement[square]= blank);
         return true;
      }

    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i];
        const isBlank = currentColorArrangement[i] === blank
        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
          setScoreDisplay((score) => score + 4)
            columnOfFour.forEach(square => currentColorArrangement[square] = blank)
            return true;
        }
    }
}
const checkForRowOfThree =()=>{
  for(let i =0 ;i<64;i++){
    const rowOfThree = [i,i+1,i+2]; 
    const decidedColor = currentColorArrangement[i] ;// grabbing first color item at index 0 or 1 etc
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
    const isBlank = currentColorArrangement[i] === blank
    if (notValid.includes(i)) continue
    if(rowOfThree.every(square =>currentColorArrangement[square] === decidedColor && !isBlank)){
      setScoreDisplay((score) => score + 3)
       rowOfThree.forEach(square =>currentColorArrangement[square]=blank);
       return  true ;
    }
  }
}
const checkForRowOfFour =()=>{
  for(let i =0 ;i<64;i++){
    const rowOfFour = [i,i+1,i+2,i+3]; 
    const decidedColor = currentColorArrangement[i] ;// grabbing first color item at index 0 or 1 etc
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
    const isBlank = currentColorArrangement[i] === blank
    if (notValid.includes(i)) continue
    if(rowOfFour.every(square =>currentColorArrangement[square] === decidedColor && !isBlank)){
      setScoreDisplay((score) => score + 4)
       rowOfFour.forEach(square =>currentColorArrangement[square]=blank);
       return true ;
    }
  }
}
  const createBoard = () =>{
    const randomColorArrangement =[];
    for(let i =0 ;i<width*width;i++){
      // get a random colour
       const randomColor = candyColours[Math.floor(candyColours.length*Math.random())];
       randomColorArrangement.push(randomColor);
    }
    //console.log(randomColorArrangement);
    setCurrentColorArrangement(randomColorArrangement);
  }
  const moveIntoSquareBelow =() =>{
    for (let i = 0; i <= 55; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColours.length)
                currentColorArrangement[i] =candyColours[randomNumber]
      }
      if ((currentColorArrangement[i + width]) === '') {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
       }
     }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  }
   const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
   }
   const dragEnd=(e) =>{
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
   
    // color
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    // one to left and right and one to below and above it 
    const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
    ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()
       
        // square being replaced should exist first
        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
              // drop it 
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
          // move everything back and no dropping 
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }
   }

  
  useEffect(()=>{
     createBoard();
  },[]);

  //
  useEffect(()=>{
    const timer = setInterval(()=>{
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    },100)
    return () =>clearInterval(timer);
   
  },[checkForColumnOfFour,checkForColumnOfThree ,checkForRowOfFour,checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangement]);
 
  

  

 console.log("score ",scoreDisplay);

  return (
    <div className="app">
       <div className="game">
          {
            currentColorArrangement.map((candyColor ,index)=>(
             <img 
             src={candyColor}
            alt={candyColor}
             key={index}
              style={{backgroundColor:candyColor}}
             
              data-id={index}
              draggable={true}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
              onDragStart={dragStart}
              />
            ))}  
       </div>   
        
       <Scoreboard score={scoreDisplay}/> 
    </div>
  );
}

export default App;
