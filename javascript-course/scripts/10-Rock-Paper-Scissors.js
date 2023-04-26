const hand_element = document.querySelector('.JS-Hand')
const player_element = document.querySelector('.JS-Score')

const score = {
    wins: 0,
    losses: 0,
    ties: 0,
    player: '0',
    cpu: '0',
    result: '0'
}

const saved = JSON.parse(localStorage.getItem('score'));
if (saved) {
    score.losses = saved.losses;
    score.wins = saved.wins
    score.ties = saved.ties
    score.player = saved.player
    score.cpu = saved.cpu
    score.result = saved.result
}
            
update_score(score.player, score.cpu, score.result)

document.querySelector('.JS-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.JS-paper-button')
.addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.JS-scissors-button')
.addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown',  (event) => {
    if (event.key === 'r'){
        playGame('rock')
    }
    if (event.key === 'p'){
        playGame('paper')
    }
    if (event.key === 's'){
        playGame('scissors')
    }
});


function playGame(playerHand)
{
    let result = ' ';
    const cpuHand = CPU_move();
    if ((cpuHand === 'rock' && playerHand === 'scissors') || (cpuHand ==='paper' && playerHand === 'rock') || (cpuHand === 'scissors' && playerHand === 'paper'))
    {result='You lose'}
    else if ((cpuHand === 'scissors' && playerHand === 'rock') || (cpuHand ==='rock' && playerHand === 'paper') || (cpuHand === 'paper' && playerHand === 'scissors'))
    {result='You WON!'}
    else if (cpuHand === playerHand)
    {result='Tie'}

    if (result === 'You WON!')
    {score.wins = score.wins+1}
    else if (result === 'You lose')
    {score.losses = score.losses+1}
    else if (result === 'Tie')
    {score.ties = score.ties+1}
    score.player = playerHand
    score.cpu = cpuHand
    score.result = result
    localStorage.setItem('score', JSON.stringify(score));
    // alert(`You picked ${playerHand}. Computer picked ${cpuHand}. ${result}`)
    update_score(playerHand, cpuHand, result)
    
}

function update_score(playerHand, cpuHand, result)
{
    console.log(playerHand)
    playerHand = string_to_hand(playerHand)
    cpuHand = string_to_hand(cpuHand)
    if (cpuHand !== '0') 
    {
        hand_element.innerHTML = `Player hand: ${playerHand}|| CPU hand: ${cpuHand} ${result}`
    }
    else 
    {
        hand_element.innerHTML = 'Player hand: || CPU hand: '
    }
    player_element.innerHTML = `Player score: ${score.wins} || CPU score: ${score.losses} || Ties: ${score.ties}`
}
            
function CPU_move()
{
    let cpuMove = ' ';
    const randNum = Math.random();
    if (randNum >=0 && randNum<1/3) 
    {cpuMove ='rock'}
    else if (randNum >=1/3 && randNum<2/3) 
    {cpuMove ='paper';}
    else if (randNum >=2/3 && randNum<1) 
    {cpuMove ='scissors';}
    return cpuMove
}
function string_to_hand(string) 
{   
    if (string === 0) 
    {
        return 0
    }
    if(string === 'rock') 
    {
        return '&#9994'
    }
    if(string === 'paper') 
    {
        return '&#9995'
    }
    if(string === 'scissors') 
    {
        return '&#9996'
    }
}

function reset()
{
    score.losses = score.wins = score.ties = 0;
    localStorage.removeItem('score');
    update_score(0,0,0)
    hand_element.innerHTML = 'Player hand: || CPU hand: '
}
            
let isAutoPlaying = false
let interId
function autoplay() {
    if (!isAutoPlaying) {
        interId = setInterval(() => {
            const playerHandAuto = CPU_move();
            playGame(playerHandAuto);
        }, 1000)
        isAutoPlaying = true
    } else 
    {
        clearInterval(interId);
        isAutoPlaying = false;
    }
}