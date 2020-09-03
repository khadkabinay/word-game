

// letters for word game
const letters             = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let letterGroup     = {
    targetedLetters:null,
    nextSiblingletters : [],
    nonRelatedLetters : []
}
let  catchedDisplay       = null
let  lettersContainer     = []
const colors              = ["rgb(39, 224, 18)","rgb(168, 50, 82)","rgb(38, 32, 212)"]
const pointsDisplay       = document.querySelector('.point');
const wrongHitDisplay     = document.querySelector('.wrong-hit');
const catchWordDisplay    = document.querySelector('.word-display span');
const player1             = document.querySelector(".player1");
const player2             = document.querySelector('.player2');
const inputWord           = document.querySelector('.target-word');
const startBtn            =  document.querySelector('#start');
const gamePlayArea        = document.getElementById("game-area")
const gameLevel           = document.getElementById("game-level")
let  gameHeight          = 400
let  gameWidth           = 400
let  playerPoints        =  0;
let  wrongPoints         =  0;
let  isGameOver         = false;








// starts game 
const startGame   = function(){

    if(typeof inputWord.value === 'string'){


    
     // takes string and return and converts into an array 
    letterGroup.targetedLetters = inputWord.value.toUpperCase().split('')
    console.log(letterGroup.targetedLetters)

    //  catagorizes the letters which belongs where like targeted , sibling, no-related
    for(let i = 0; i < letterGroup.targetedLetters.length; i++){
        
        for(let j = 0; j < letters.length; j++){
            if(letterGroup.targetedLetters[i] === letters[j]){
                console.log(j, i)
                
                console.log(letterGroup.targetedLetters[i] , letters[j])
                letterGroup.nextSiblingletters.push(letters[j + 1])
            }
        }
    }
        
    
    
     // creates array for siblings and tarted letters 
    const siblingWithTarget = letterGroup.targetedLetters.concat(letterGroup.nextSiblingletters)

    console.log(siblingWithTarget)

    // if letters do not relate to siblings and targeted, push them into a array called noRelatedLetters
    for(let i = 0; i < letters.length; i++){
        if(siblingWithTarget.includes(letters[i])){
            continue
         }else if (!siblingWithTarget.includes(letters[i])){
            letterGroup.nonRelatedLetters.push(letters[i])
        }
        
        }
    } else {

        alert("i am taking only string")
    }
    
    
    
    
    }

   
    



//  stops the animation when game is over
const stopAnimation = function(gameOver, elm){
    if(gameOver){
        window.cancelAnimationFrame(requestAnimation)
        elm.remove()

    }


}




let  index = 0;
let  startScore  = inputWord.length
 



// // generates div , letters and colors them
 const generateColor = function(num, speed = parseInt(gameLevel.value)){

    // generaters random number 
   let randomColor  = Math.floor(Math.random() * colors.length)
   let randomLetter  = Math.floor(Math.random() * letters.length)
   let ranNextSibling = Math.floor(Math.random() * letterGroup.nextSiblingletters.length)
   let ranTartLetter = Math.floor(Math.random() * letterGroup.targetedLetters.length)
 

   // creates divs 
   const divElement = document.createElement('div');
   divElement.classList.add("letter-div")

   // takes the value from the argument and passes into num so that css value left is going to have dynamic position
    divElement.style.left = `${num}px`;
   

 // checks which color is going to be appended into dom . applies all properties .
     if(randomColor === 1){
    divElement.classList.add("red")
    divElement.style.backgroundColor = colors[randomColor]
    divElement.textContent = letters[randomLetter]

    }else if( randomColor === 2){
            divElement.classList.add("blue")
            divElement.style.backgroundColor = colors[randomColor]
            divElement.textContent = letterGroup.nextSiblingletters[ranNextSibling]


    }else if(randomColor === 0){
          if(playerPoints > index) {
              divElement.classList.add("green")

              // calls this function when blue is clicked in certain number of time.
            setTimeout(function(){
                    divElement.style.backgroundColor = colors[0]
                    divElement.textContent = letterGroup.targetedLetters[index]
                    index++
                    },200)

                     }
         
            

                }
    
     // defines a top value so that box will generate on top and slide down            
    let top = 0;
    divElement.style.top = top
    gamePlayArea.append(divElement)
    
    // moves all letters down
    startAnimation();


  
 function startAnimation () {
    divElement.style.top = `${top += speed}px`; 
        
        // invokes untils top value is less than 375
        if(top < 375){
         requestAnimation  =  window.requestAnimationFrame(startAnimation)

         //hits 375 , element removes from dom
        }else if(top > 375){
            divElement.remove()
         }
    
    }


    // stops the animation when game is over
    stopAnimation(isGameOver,divElement);

}





// calls two functions , startGame and generateColor
const generateLetters = function(){

    startGame()
    setInterval(function() {
       generateColor(Math.floor(Math.random() * ( gameWidth - 90))) 
   }, 300)
       
}



 

const playSecondRound = function(isOver){
    const msgBox = document.createElement("div")
    const playBtn = document.createElement('button')
    playBtn.textContent = "Play"
    playBtn.classList.add("play-btn")
    msgBox.classList.add('msg-game-over')
    msgBox.textContent = "Next Player"
     if(isOver){
             msgBox.append(playBtn)
            gamePlayArea.append(msgBox)

     }
       
   


    const playButton = document.querySelector('.play-btn')
    playButton.addEventListener("click", function(){
    player1.textContent = playerPoints
      playerPoints        =  0;
      wrongPoints         =  0;
      pointsDisplay.textContent = 0;
      wrongHitDisplay.textContent = 0;
      catchWordDisplay.textContent = null;

      isGameOver        = false;
      msgBox.remove()
      generateLetters()
      if(isGameOver){
        msgBox.remove()
        
 
      }

    
     })

        

}



















// defines the logic for when point is added or subtracted
let startPoint = 1

const play = function(event){
    event.stopPropagation()

    // color blue adds points  
    if(event.target.style.backgroundColor === colors[2]){
        const  blueCircle = document.querySelector('.blue')
    
        console.log("score is adding")
        playerPoints++
        pointsDisplay.textContent = playerPoints
        blueCircle.remove()
       
   // color green adds points 
    }else if ( event.target.style.backgroundColor === colors[0]){
        playerPoints++
        pointsDisplay.textContent = playerPoints
        const  greenCircle = document.querySelector('.green')
        catchWordDisplay.append(greenCircle.textContent)
        catchWordDisplay.style.color = "#9f0af5"
        greenCircle.remove()


        // color red reduce points and adds wrong hits point 
    }else if(event.target.style.backgroundColor === colors[1]){
        console.log("score is going down")
        const   redCircle = document.querySelector('.red')
        playerPoints -= 2
        pointsDisplay.textContent = playerPoints
        wrongPoints++
        wrongHitDisplay.textContent = wrongPoints
        redCircle.remove()
        

        // game over logic // if both condition is met , it will return true 
            if(playerPoints < 0 || wrongPoints >= Math.floor((inputWord.value.length/2))){
            isGameOver = true
            playSecondRound(isGameOver)
            

            
         
        }
        
    }
    
    
    
    
    
}







startBtn.addEventListener("click" , generateLetters)
gamePlayArea.addEventListener("click" , play)









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



