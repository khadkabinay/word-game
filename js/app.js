
                // letters for word game
                const letters             = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

                let letterGroup           = {
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
                const inputWord           = document.querySelector('.target-word');
                const startBtn            =  document.querySelector('#start');
                const gamePlayArea        = document.getElementById("game-area")
                const gameLevel           = document.getElementById("game-level")
                let  gameHeight           = 400
                let  gameWidth            = 400
                let  playerPoints         =  0;
                let  wrongPoints          =  0;   
                let  isGameOver           = false;








                // starts game 
                const startGame   = function(){

                    
                    // takes string and return and converts into an array 
                        letterGroup.targetedLetters = inputWord.value.toUpperCase().split('')
                    

                    //  catagorizes the letters which belongs where like targeted , sibling, no-related
                    for(let i = 0; i < letterGroup.targetedLetters.length; i++){
                        
                        for(let j = 0; j < letters.length; j++){
                            if(letterGroup.targetedLetters[i] === letters[j]){
                            
                                
                                console.log(letterGroup.targetedLetters[i] , letters[j])
                                letterGroup.nextSiblingletters.push(letters[j + 1])
                            }
                        }
                    }
                        
                    
                    
                    // creates array for siblings and tarted letters 
                    const siblingWithTarget = letterGroup.targetedLetters.concat(letterGroup.nextSiblingletters)

                

                    // if letters do not relate to siblings and targeted, push them into a array called noRelatedLetters
                    for(let i = 0; i < letters.length; i++){
                        if(siblingWithTarget.includes(letters[i])){
                            continue
                        }else if (!siblingWithTarget.includes(letters[i])){
                            letterGroup.nonRelatedLetters.push(letters[i])
                        }
                        
                        }
                    
                    
                    } 
                    
                    
                    



                // display a message  game is over  
                const displayMessage = function(){

                    if(isGameOver){
                        const msgBox = document.createElement("div")
                        msgBox.classList.add('msg-game-over')

                        
                            if(catchWordDisplay.textContent.length === inputWord.value.length){
                            msgBox.style.backgroundColor = "green"
                            msgBox.textContent = `Congratulations !!! \n You Won !!!` 
                            gamePlayArea.append(msgBox)
                        
                            }else if (catchWordDisplay.textContent.length === 1 || (catchWordDisplay.textContent.length === 0)){
                            msgBox.textContent = `Sorry !! You collect ${catchWordDisplay.textContent.length}  letter.`
                            gamePlayArea.append(msgBox)

                        }else if (catchWordDisplay.textContent.length < inputWord.value.length) {
                            msgBox.textContent = `Sorry !! You only collect ${catchWordDisplay.textContent.length} letters`
                            gamePlayArea.append(msgBox)


                        }
                        
                        
                    
                    }

                }






                //  stops the animation when game is over
                const stopAnimation = function( element ,index){
                    if((playerPoints < 0)||(wrongPoints >= Math.floor(inputWord.value.length/2) ||(index  > inputWord.value.length - 1)) ){
                        window.cancelAnimationFrame(requestAnimation)
                        element.remove()
                        isGameOver = true
                        startBtn.textContent = "PLAY AGAIN" 
                        setTimeout(displayMessage, 1500)
                        clearInterval(setTimeId)

                                
                    
                    }


                }



                //helps run the green color for every other blue color is clicked . 
                let  index = 0;
                

                // // generates div , letters and colors them
                const generateColor = function(num, speed = parseInt(gameLevel.value)){
                    



                    // generaters random number 
                let randomColor  = Math.floor(Math.random() * colors.length)
                let randomLetter  = Math.floor(Math.random() * letters.length)
                let ranNextSibling = Math.floor(Math.random() * letterGroup.nextSiblingletters.length)
                let ranTartLetter = Math.floor(Math.random() * letterGroup.targetedLetters.length)
                

                // creates divs for each letter
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
                    stopAnimation(divElement,index);

                }




                
                




                // defines the logic for when point is added or subtracted
                let startPoint = 1

                const play = function(event){
                    event.stopPropagation()


                    // color blue adds points  
                    if(event.target.style.backgroundColor === colors[2]){
                        playerPoints++
                        pointsDisplay.textContent = playerPoints
                        event.target.remove()
                    
                // color green adds points 
                    }else if ( event.target.style.backgroundColor === colors[0]){
                        playerPoints++
                        pointsDisplay.textContent = playerPoints
                        const  greenCircle = document.querySelector('.green')
                        catchWordDisplay.textContent += event.target.textContent
                        catchWordDisplay.style.color = "#9f0af5"
                        event.target.remove()


                        // color red reduce points and adds wrong hits point 
                    }else if(event.target.style.backgroundColor === colors[1]){
                        playerPoints -= 2
                        pointsDisplay.textContent = playerPoints
                        wrongPoints++
                        wrongHitDisplay.textContent = wrongPoints
                        event.target.remove()
                        

                    
                        
                    }
                    
                    
                    
                    
                    
                }






                // calls two functions , startGame and generateColor
                const generateLetters = function(){
                    
                    if (isGameOver){
                        isGameOver = false
                        window.location.reload(true)
                        

                        startGame()
                        if(!isGameOver){
                        setTimeId =   setInterval(function() {
                            generateColor(Math.floor(Math.random() * ( gameWidth - 90))) 
                        }, 300)
                            
                        
                    
                    
                        }
                    }

                    const gameRuleElement = document.querySelector(".game-rule")
                    gameRuleElement.remove()
                
                        startGame()
                        if(!isGameOver){
                        setTimeId =   setInterval(function() {
                            generateColor(Math.floor(Math.random() * ( gameWidth - 90))) 
                        }, 300)
                            
                        
                    
                    
                        }
                    }






    
             
                startBtn.addEventListener("click" , generateLetters)
                gamePlayArea.addEventListener("click" , play)


