import { useEffect, useState } from "react";
import './App.css';

const width =8;
const candyColours = [
  'blue',
  'greeen',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App =() => {

  const[currentColorArrangement ,setCurrentColorArrangement] = useState([]);

  const checkForColumnOfThree =()=>{
    for(let i =0 ;i<47;i++){
      // if we are at zero ,we want to check square with index 8 and also 16 so
      // [0,0+8,0+16] is [0,8,16] if we are at index 0
      //[1,1+8,1+16 ] is [1 ,9,25] if we are at index 1
      const columnOfThree = [i,i+width,i+width*2]; 
      const decidedColor = currentColorArrangement[i] ;// grabbing first color item at index 0 or 1 etc
      if(columnOfThree.every(square =>currentColorArrangement[square] === decidedColor)){
         columnOfThree.forEach(square =>currentColorArrangement[square]='');
      }

    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
            columnOfFour.forEach(square => currentColorArrangement[square] = '')
            
        }
    }
}
const checkForRowOfThree =()=>{
  for(let i =0 ;i<47;i++){
    const rowOfThree = [i,i+1,i+2]; 
    const decidedColor = currentColorArrangement[i] ;// grabbing first color item at index 0 or 1 etc
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
    if (notValid.includes(i)) continue
    if(rowOfThree.every(square =>currentColorArrangement[square] === decidedColor)){
       rowOfThree.forEach(square =>currentColorArrangement[square]='');
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
  
  useEffect(()=>{
     createBoard();
  },[]);

  //
  useEffect(()=>{
    const timer = setInterval(()=>{
      checkForColumnOfFour();
      checkForColumnOfThree();
      setCurrentColorArrangement([...currentColorArrangement]);
    },100)
    return () =>clearInterval(timer);
   
  },[checkForColumnOfFour,checkForColumnOfThree,currentColorArrangement]);
 
  console.log("current ",currentColorArrangement);


  return (
    <div className="app">
       <div className="game">
          {
            currentColorArrangement.map((candyColor ,index)=>(
             <img 
             key={index}
              style={{backgroundColor:candyColor}}
              alt={candyColor}
              />
            ))}
          
       </div>     
    </div>
  );
}

export default App;
