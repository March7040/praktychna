document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio('audio/switch-light-04-82204.mp3');
    const winSound = new Audio('audio/marimba-win-b-3-209679.mp3');
    const loseSound = new Audio('audio/fail-144746.mp3');

    const game = () => {
        let playerScore = 0;
        let computerScore = 0;
        let moves = 0;

        const playGame = () => {
            const rockBtn = document.querySelector('.rock');
            const paperBtn = document.querySelector('.paper');
            const scissorBtn = document.querySelector('.scissor');
            const playerOptions = [rockBtn, paperBtn, scissorBtn];
            const computerOptions = ['rock', 'paper', 'scissors'];

            playerOptions.forEach(option => {
                option.addEventListener('click', function () {
                    clickSound.play();
                    const movesLeft = document.querySelector('.movesleft');
                    moves++;
                    movesLeft.innerText = `Лишилось кроків: ${10 - moves}`;

                    const choiceNumber = Math.floor(Math.random() * 3);
                    const computerChoice = computerOptions[choiceNumber];

                    winner(this.classList[0], computerChoice);

                    if (moves === 10) {
                        gameOver(playerOptions, movesLeft);
                    }
                });
            });
        };

        const winner = (player, computer) => {
            const result = document.querySelector('.result');
            const playerScoreBoard = document.querySelector('.p-count');
            const computerScoreBoard = document.querySelector('.c-count');

            if (player === computer) {
                result.textContent = 'Нічия';
            } else if (player === 'rock') {
                if (computer === 'paper') {
                    result.textContent = 'Бот обрав папір, бот +1';
                    computerScore++;
                    computerScoreBoard.textContent = computerScore;
                } else {
                    result.textContent = 'Бот обрав ножиці, ви +1!';
                    playerScore++;
                    playerScoreBoard.textContent = playerScore;
                }
            } else if (player === 'scissor') {
                if (computer === 'rock') {
                    result.textContent = 'Бот обрав камінь, бот +1';
                    computerScore++;
                    computerScoreBoard.textContent = computerScore;
                } else {
                    result.textContent = 'Бот обрав папір, ви +1!';
                    playerScore++;
                    playerScoreBoard.textContent = playerScore;
                }
            } else if (player === 'paper') {
                if (computer === 'scissor') {
                    result.textContent = 'Бот обрав ножиці, бот +1';
                    computerScore++;
                    computerScoreBoard.textContent = computerScore;
                } else {
                    result.textContent = 'Бот обрав камінь, ви +1!';
                    playerScore++;
                    playerScoreBoard.textContent = playerScore;
                }
            }
        };

        const gameOver = (playerOptions, movesLeft) => {
            const chooseMove = document.querySelector('.move');
            const result = document.querySelector('.result');
            const reloadBtn = document.querySelector('.reload');

            playerOptions.forEach(option => {
                option.style.display = 'none';
            });

            chooseMove.innerText = 'Гру закінчено!';
            movesLeft.style.display = 'none';

            if (playerScore > computerScore) {
                result.style.fontSize = '2rem';
                result.innerText = 'Ви виграли!';
                result.style.color = 'white';
                winSound.play();
            } else if (playerScore < computerScore) {
                result.style.fontSize = '2rem';
                result.innerText = 'Ви програли(';
                result.style.color = 'white';
                loseSound.play();
            } else {
                result.style.fontSize = '2rem';
                result.innerText = 'Нічия';
                result.style.color = 'white';
            }
            reloadBtn.innerText = 'Заново';
            reloadBtn.style.display = 'flex';
            reloadBtn.addEventListener('click', () => {
                window.location.reload();
            });
        };

        playGame();
    };

    game();
});
