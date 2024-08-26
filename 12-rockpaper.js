let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/* (This works same as the code after the '||' operator )
if(!score){
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/

let isAutoPlay = false;
let intervalID;

//const autoPlay = () =>{}
function autoPlay(){
  if(!isAutoPlay){
    intervalID = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  }
  else{
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('scissor');
});


document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissor');
  }
  });

function playGame(playerMove){
const compMove = pickCompMove();
let result = '';

if (playerMove === 'scissor'){
  if (compMove === 'rock'){
  result = 'You lose';
  }
  else if(compMove === 'paper'){
    result = 'You win';
  }
  else if(compMove === 'scissor'){
    result = 'Tie';
  }
}
else if(playerMove === 'paper'){
  if (compMove === 'rock'){
    result = 'You win';
  }
  else if(compMove === 'paper'){
    result = 'Tie';
  }
  else if(compMove === 'scissor'){
    result = 'You lose';
  }
}
else if(playerMove === 'rock'){
  if (compMove === 'rock'){
    result = 'Tie';
  }
  else if(compMove === 'paper'){
    result = 'You lose';
  }
  else if(compMove === 'scissor'){
    result = 'You win';
  }
} 

if (result === 'You win'){
  score.wins += 1;
}
else if (result === 'You lose'){
  score.losses += 1;
}
else if(result === 'Tie'){
  score.ties +=1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();


document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${compMove}-emoji.png" class="move-icon">
Computer`;


}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickCompMove(){

const randomNumber = Math.random();
let compMove = '';

if(randomNumber >= 0 && randomNumber < 1/3){
  compMove = 'rock';
}
else if(randomNumber >= 1/3 && randomNumber < 2/3){
  compMove = 'paper';
}
else if(randomNumber >= 2/3 && randomNumber < 1){
  compMove = 'scissor';
}
console.log(compMove);

return compMove;
}