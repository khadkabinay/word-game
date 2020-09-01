
// z has to manage for logic becasuse z has no nextSbling letter

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const  nextSiblingletters = [];
let nonRelatedLetters = [];
let  targetedLetters = null;
let  catchedDisplay  = null;
const colors    = { green:'#1adb4e',blue:'#0d30de',red:'#f5070f'};
const pointsDisplay    = document.querySelector('.point');
const wrongHitDisplay    = document.querySelector('.wrong-hit');
const catchWordDisplay    = document.querySelector('.word-display');
const gamePlayArea  = document.getElementById("game-area")
const player1    = document.querySelector(".player1");
const player2    = document.querySelector('.player2');
const inputWord  = document.querySelector('.target-word');
const startBtn  =  document.querySelector('#start');


console.log(gamePlayArea.getBoundingClientRect())

// $(".something").clientRect();
// getBoundingClientRect() // err





// starts game 
const startGame   = function(){
    // creates function that catagorized letters which belongs where like targeted , sibling, no-related
     targetedLetters = inputWord.val().toUpperCase().split('')
    for(let i = 0; i < targetedLetters.length; i++){
        
        for(let j = 0; j < letters.length; j++){
            if(targetedLetters[i] === letters[j]){
                console.log(j, i)
                
                console.log(targetedLetters[i] , letters[j])
                nextSiblingletters.push(letters[j + 1])
            }
        }
        
    }
    
    const newArr = targetedLetters.concat(nextSiblingletters)
    
    for(let i = 0; i < letters.length; i++){
        if(newArr.includes(letters[i])){
         console.log (" hello i found it ")
            
        }else{
         console.log("hello dear i cant find what you are looking for ")
            nonRelatedLetters.push(letters[i])
        }
        
        }

        
 }






// generates divs bucket and letters and colors them
 const generateLetter  = function(letterArr){
    const bucketDiv = $("<div>")
    bucketDiv.addClass('bucketDiv')
    gamePlayArea.append(bucketDiv)
   

     for(let i = 0; i < letterArr.length; i++){
    let letterDiv = $("<div></div>")
    letterDiv.text(letterArr[i])
    letterDiv.addClass("letter-div")
     if(letterArr.includes(inputWord.val().toUpperCase()[0])){

          letterDiv.css("background-color", colors.green)

          
        }else if(letterArr.length === nextSiblingletters.length){
            
            letterDiv.css("background-color",colors.blue)
        }else if(letterArr.length > inputWord.val().toUpperCase()[0].length){
   
            letterDiv.css("background-color",colors.red)

    }

    gamePlayArea.append(letterDiv)

   }







 }

























// checkCollition
// positionToInterger
// rightEdge // leftEdge
//  window.requestAnimationFrame  //
// setInterval
// clearInterval


// function positionToInteger(p) {
//     return parseInt(p.split('px')[0]) || 0
//   }  // helps convert the pixel to number 

    
    
startBtn.addEventListener("click", startGame)
    
    // class Player {
        //  constructor(name , letters ){
            //      this.letters = letters
            //      this.name = name;
            //      this.points = 0;
            //      this.wrongHits = 0;
            //      this.totalPoints = 0;
            
            //  }
            
            
            
            
            // 
            
            //  console.log(newArr)
            
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

 // creates function that catagorized letters which belongs where like targeted , sibling, no-related
// randomletter generator 
// non-related letter generator
// targeted word call function
// function that update the points, wrong hits , letter to the borad
// function that creates a div with letter


/* sub function */

// points adds or subtract  
// game over 



// class name

// gameStart
// play 
// player
// winner

