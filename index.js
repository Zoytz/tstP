const textArea = document.querySelector('.form__input');
const resetButton = document.getElementById('resetButton');
const overallTitle = document.querySelector('.titles__span_type_overall');
const counterTitle = document.querySelector('.titles__span_type_counter');

let start = 0;
let end = 0;
let timerId = 0;
let pause = 0;
let pauseStart = 0;
let pauseEnd = 0;

function clearParameters () {
    pause = 0;
    pauseStart = 0;
    start = 0;
    end = 0;
}

function handlePause () {
  pauseStart = Date.now() - 5000;
  clearTimeout(timerId);
}

function handleResetAll() {
  textArea.value = '';
  counterTitle.textContent = 0;
  overallTitle.textContent = 0;
  clearParameters();
}

function handleInput (pauseTime) {
  if(!start) {
    start = Date.now();
  }
  if(pauseStart) {
    pauseEnd = Date.now();
    console.log('pause end', pauseEnd, 'pauseStart', pauseStart, 'pause', pause)
    pause = pause + (pauseEnd - pauseStart);
    console.log('pause end', pauseEnd, 'pauseStart', pauseStart, 'pause', pause)
    pauseStart = 0;
  }
  overallTitle.textContent = textArea.value.length;
  now = Date.now();
  const wastedTime = (now - start - pauseTime) / 1000 / 60;
  counterTitle.textContent = Math.floor(textArea.value.length / wastedTime);
  if (timerId) {
    clearTimeout(timerId);
    timerId = 0;
  }
  timerId = setTimeout(() => handlePause(pause), 5000);
}


textArea.addEventListener('input', () => handleInput(pause));
resetButton.addEventListener('click', handleResetAll);
