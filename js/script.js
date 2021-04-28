const  wordEl = document.getElementById('word'),
    wrongLettersEl = document.getElementById('wrong-letters'),
    playAgainBtn = document.getElementById('play-again'),
    popup = document.getElementById('popup-container'),
    notification = document.getElementById('noitification-container'),
    finalMessage = document.getElementById('final-message'),
    figureParts = document.querySelectorAll('.figure-part'),
    resetGameBtn = document.getElementById('play-button'),
    word = ['apple', 'car','house', 'application'];
    let count = 0,
        countForLoose = 0,
        enteredLetters = [],
        wrongLetters = [],
        selectedWord;
createWord()
 // Генерируем кол-во во символов в слове , и соответственно выводим такое кол-во отделов для заполнения их буквами 
function createWord() {
    selectedWord = word[Math.floor(Math.random() * word.length)]
    selectedWord = selectedWord.split('')
    selectedWord.forEach(()=>{
        let newWord = document.createElement('span')
        newWord.classList.add('letter')
        wordEl.append(newWord)
    })
}



let rightLetters = [selectedWord.length];

// проверка букв на соответсвие нужному слову , если совпадают - победа
function checkLetter(e) {
    selectedWord.forEach((item, i) => {
        if (enteredLetters.includes(e.key) && e.key == selectedWord[i]) {
            notification.classList.add('show')
            setTimeout(() => {
                notification.classList.remove('show')
            }, 1500)
        }
        if (e.key == item && !enteredLetters.includes(e.key)) {
            rightLetters[i] = selectedWord[i]
            if (rightLetters.join('') == selectedWord.join('')) {
                popup.classList.add('visible')
                finalMessage.innerHTML = "you win"
            }
            wordEl.children[i].innerHTML = selectedWord[i]
        }
    })
    enteredLetters.push(e.key)
}

 // перезапуск игры
function resetGame() {
    popup.classList.remove('visible')
    rightLetters = []
    enteredLetters = []
    wrongLettersEl.classList.remove('visible')
    wrongLettersEl.innerHTML ='Wrong letters :'
    countForLoose = 0;
    count = 0;
    for(let i =0;i<6;i++){
        figureParts[i].classList.remove('visible')
    }
    wordEl.innerHTML=''
    createWord()
}


resetGameBtn.addEventListener('click', resetGame)
//разные действия на нажатие клавиши
window.addEventListener('keydown',e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (!selectedWord.includes(e.key)) {
            wrongLettersEl.classList.add('visible')
            wrongLetters.push(count)
            wrongLettersEl.innerHTML += `${e.key},`
        }
        if (!selectedWord.includes(e.key)) {
            figureParts[count++].classList.add('visible')
            countForLoose++;
        }
        if (countForLoose == 6) {
            popup.classList.add('visible')
            finalMessage.innerHTML = "you loose"
        }
        checkLetter(e)
    }
})