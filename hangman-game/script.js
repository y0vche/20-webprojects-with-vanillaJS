const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const notification = document.getElementById('notification-container');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];  
const wrongLetters = [];

 
function displayWord() {
 wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
        <span class='letter'>
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
      )
   .join('')}
 `;

 const innerWord = wordEl.innerText.replace(/\n/g, '');  

 if (innerWord === selectedWord) {
  finalMessage.innerText = 'Congratulations! You won!'
  popup.style.display = 'flex';
 }  
}

 
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>': ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  
  
  figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

 
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost! 🤦‍♂️";
    popup.style.display = 'flex';
  }
}

 
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}


 
window.addEventListener('keydown', e => {
  
  const letter = e.key.toLowerCase();
  
  if (/^[a-z,A-Z/i]$/i.test(letter)) {

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }    
 }
});

 
playAgainBtn.addEventListener('click', () => {
   
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();