


const letters             = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const nextSiblingletters = [];
let nonRelatedLetters     = [];
let  targetedLetters      = null;
let  catchedDisplay       = null;
let  lettersContainer     = []
const colors              = { green:'#1adb4e',blue:'#0d30de',red:'#f5070f'};
const pointsDisplay       = document.querySelector('.point');
const wrongHitDisplay     = document.querySelector('.wrong-hit');
const catchWordDisplay    = document.querySelector('.word-display');
const player1             = document.querySelector(".player1");
const player2             = document.querySelector('.player2');
const inputWord           = document.querySelector('.target-word');
const startBtn            =  document.querySelector('#start');
const gamePlayArea        = document.getElementById("game-area")
let  gameHeight          = 400
let  gameWidth           = 400
let  playerPoints        =  0;
let  wrongPoints         =  0;


console.log(gamePlayArea.style.top)





// starts game 
const startGame   = function(){

    targetedLetters = inputWord.value.toUpperCase().split('')

    //  catagorizes the letters which belongs where like targeted , sibling, no-related
    for(let i = 0; i < targetedLetters.length; i++){
        
        for(let j = 0; j < letters.length; j++){
            if(targetedLetters[i] === letters[j]){
                console.log(j, i)
                
                console.log(targetedLetters[i] , letters[j])
                nextSiblingletters.push(letters[j + 1])
            }
        }
        
    }
    
     // creates array for siblings and tarted letters 
    const siblingWithTarget = targetedLetters.concat(nextSiblingletters)

    // if letters do not relate to siblings and targeted, push them into a array called noRelatedLetters
    for(let i = 0; i < letters.length; i++){
        if(siblingWithTarget.includes(letters[i])){
            return
         }else{
         nonRelatedLetters.push(letters[i])
        }
        
        }
    }





// // generates div , letters and colors them
 const generateColor = function(letterArr,divElement){




  // adds  background colors for related letters
if(letterArr.includes(inputWord.value.toUpperCase()[0])){
    divElement.style.backgroundColor = colors.green
    divElement.classList.add("green")
    
   
        
    }else if(letterArr.length === nextSiblingletters.length){
     
     divElement.style.backgroundColor = colors.blue
     divElement.classList.add("blue")
     
            
     }else if(letterArr.length > inputWord.value.toUpperCase()[0].length){
         divElement.style.backgroundColor = colors.red
         divElement.classList.add("red")
     
       

    }
}






let index = 0 
const  createDiv  = function(num , letterArr) {

    const divElement = document.createElement('div');
    divElement.classList.add("letter-div")
    generateColor(letterArr,divElement)
    divElement.textContent  = letterArr[index]
    divElement.style.left = `${num}px`;
   
    let top = 0;
    divElement.style.top = top
    gamePlayArea.append(divElement)
   
      
    moveletters();

    function moveletters() {
  
        divElement.style.top = `${top += 2}px`; 
         
        // invokes untils top value is less than 375
         if(top < 375){
                 window.requestAnimationFrame(moveletters);
                 
        }else if(top > 375){
           divElement.remove()


        }
     }

 // increament the value of array which is asign to divElement
     index +=1
    
  }







  let startPoint = 1

  gamePlayArea.addEventListener("click", function(event){
      event.stopPropagation()
      
      if(event.target.classList.contains("blue") || event.target.classList.contains("green")){
       
          console.log(" blue or green")
          playerPoints++
          pointsDisplay.textContent = playerPoints



         targetedLetters.forEach( letter => {
             console.log(letter)
             if(event.target.classList.contains("green") && event.target.textContent === letter ){
                console.log("hello i found what exaclty you are looking for")
                
            }
            
            
        })
     
        
    }else if (event.target.classList.contains("red")){
        console.log("hello i am red ")
        wrongPoints++
       
       

        wrongHitDisplay.textContent = wrongPoints
    }
    
    
    
    if(playerPoints === startPoint){
        console.log("hello do you want to call green ")
        startPoint += 1
    } 
  })










 const generateLetters = function(){
      
 startGame()

 setInterval(function() {
        createDiv(Math.floor(Math.random() * ( gameWidth - 40)), nonRelatedLetters) 


        
        
    }, 400)
    
    
    setInterval(function() {

    
           createDiv(Math.floor(Math.random() * gameWidth - 200), nextSiblingletters) 
         }, 1500 )


 }


     
startBtn.addEventListener("click", generateLetters)










































// console.log(gamePlayArea.getBoundingClientRect())

// $(".something").clientRect();
// getBoundingClientRect() // err


// checkCollition
// window.requestAnimationFrame  // takes callback as a parameter 

// setInterval
// clearInterval

    

  
    
            
            // console.log(letters)
            // console.log(targetedLetters)
            // console.log(nextSiblingletters)
            // console.log(nonRelatedLetters)
            
            
            
            
            


















/* data set */
// creates dataset for all letters
// creates empty array to hold data for sibling
// targeted word data
// empty array for targeted display
// color array 

 
/* variable to hold the data */

// points 
// wrong hit
// player1 
// player2 



/* function */

 // function that catagorized letters which belongs where like targeted , sibling, no-related
// randomletter generator 
// non-related letter generator
// targeted word call function
// function that update the points, wrong hits , letter to the borad
// function that creates a div with letter


/* sub function */

// points adds or subtract  
// game over 



