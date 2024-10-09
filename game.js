function createWordList() {
    const baseWords = ["apple", "grape", "peach", "mango", "berry", "lemon", "melon", "plum", "pear","banana"];
    const baseWord = baseWords[Math.floor(Math.random() * baseWords.length)];
    const similarWords = Array(8).fill(baseWord);
    let differentWord = baseWord.split("");
    const changeIndex = Math.floor(Math.random() * baseWord.length);
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let differentLetter;
    
    do {
        differentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (differentLetter === baseWord[changeIndex]);
    
    differentWord[changeIndex] = differentLetter;
    differentWord = differentWord.join("");
    
    const words = [...similarWords, differentWord];
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    
    return { words, differentWord };
}

function playGame() {
    const { words, differentWord } = createWordList();
    
    let gameContainer = document.getElementById('gameContainer');
    if (!gameContainer) {
        gameContainer = document.createElement('div');
        gameContainer.id = 'gameContainer';
        gameContainer.style.display = 'grid';
        gameContainer.style.gridTemplateColumns = 'repeat(3, 100px)';
        gameContainer.style.gridGap = '10px';
        document.body.appendChild(gameContainer);
    } else {
        gameContainer.innerHTML = "";
    }
    
    let timeoutReached = false;
    const timer = setTimeout(() => {
        timeoutReached = true;
        alert("시간이 초과되었습니다! 2초 내에 답을 선택해야 합니다.");
        highlightCorrectAnswer();
    }, 2000);

    words.forEach((word) => {
        const wordBlock = document.createElement('div');
        wordBlock.textContent = word;
        wordBlock.style.border = '1px solid black';
        wordBlock.style.padding = '20px';
        wordBlock.style.textAlign = 'center';
        wordBlock.style.cursor = 'pointer';
        
        wordBlock.addEventListener('click', () => {
            if (timeoutReached) {
                return;
            }
            clearTimeout(timer);
            
            if (word === differentWord) {
                alert("정답입니다! 잘했어요!");
                nextRound();
            } else {
                alert(`틀렸습니다. 정답은 '${differentWord}'이었습니다.`);
                highlightCorrectAnswer();
            }
        });
        
        gameContainer.appendChild(wordBlock);
    });

    function highlightCorrectAnswer() {
        Array.from(gameContainer.children).forEach((block) => {
            if (block.textContent === differentWord) {
                block.style.backgroundColor = 'blue';
            }
        });
    }

    function nextRound() {
        playGame();
    }
}

document.addEventListener('DOMContentLoaded', playGame);