/*
  Brayden Coghill
  300347436
  Rock Paper Scissors
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let userScore = 0;
let compScore = 0;

function userChoice() {
  return new Promise((resolve) => {
    readline.question('Please choose Rock, Paper, Scissors, or type "quit" to exit: ', (choice) => {
      choice = choice.toLowerCase();
      if (choice === 'rock' || choice === 'paper' || choice === 'scissors' || choice === 'quit') {
        resolve(choice);
      } else {
        console.log('Invalid choice, please try again.');
        resolve(userChoice());
      }
    });
  });
}

function computerChoice() {
  let compChoice = Math.floor((Math.random() * 3));
  return compChoice === 0 ? 'rock' : compChoice === 1 ? 'paper' : 'scissors';
}

function winner(user, comp) {
  if (user === comp) {
    return 'It\'s a tie!';
  } else if (user === 'rock' && comp === 'scissors' || user === 'paper' && comp === 'rock' || user === 'scissors' && comp === 'paper') {
    userScore++;
    return 'You win!';
  } else {
    compScore++;
    return 'Computer wins!';
  }
}

async function gamePlay() {
  console.log('Welcome to Rock, Paper, Scissors!\n');
  while (true) {
    let user = await userChoice();
    if (user === 'quit') {
      console.log('Thanks for playing!');
      break;
    }
    let comp = computerChoice();
    let result = winner(user, comp);
    if (result === 'You win!') {
      console.log(`You won this round! You chose ${user}, Computer chose ${comp}. ${result}\n
      Score - User: ${userScore} Computer: ${compScore}\n`);
    } else if (result === 'Computer wins!') {
      console.log(`You lost this round! You chose ${user}, Computer chose ${comp}. ${result}\n
      Score - User: ${userScore} Computer: ${compScore}\n`);
    } else {
      console.log(`It's a tie! You chose ${user}, Computer chose ${comp}. ${result}\n
      Score - User: ${userScore} Computer: ${compScore}\n`);
    }

    if (userScore === 3) {
      console.log('Congratulations! You won best of 3!');
      break;
    } else if (compScore === 3) {
      console.log('The computer won best of 3. Better luck next time!');
      break;
    }
  }
  readline.close();
}

gamePlay();
