let boomTimeOut;
let readyTimer;
let initiated;
const ticTocSound = new Audio("sounds/TicToc.mp3");
ticTocSound.loop = true;
const explosionSound = new Audio("sounds/Explosion01.mp3");
const readyCountSound = new Audio("sounds/Count.wav");
const readySound = new Audio("sounds/Ready.wav");

function randomInterval(min, max) {
    const randomTime = min + (max - min) * Math.random();
    const roundedTime = Math.ceil(randomTime / 1000) * 1000;
    return roundedTime;
}

function changeLabel(text) {
    const label = document.getElementById("label");
    label.innerText = text;
}

function clearReadyTimer() {
    clearInterval(readyTimer);
    readyTimer = null;
}

function clearBoomTimeOut() {
    clearTimeout(boomTimeOut);
    boomTimeOut = null;
}

function clearBoomTimeOut() {
    clearTimeout(boomTimeOut);
    boomTimeOut = null;
}

function resetSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}

function onStart() {
    if (readyTimer || boomTimeOut) return;
    resetGame();
    getReady(startTimer);
}

function onStop() {
    resetGame();
    changeLabel("Ready?");
}

function resetGame() {
    clearReadyTimer();
    clearBoomTimeOut();
    resetSound(ticTocSound);
    resetSound(explosionSound);
}

function startTimer() {
    const time = randomInterval(3000, 15000);
    ticTocSound.play();
    boomTimeOut = setTimeout(() => {
        changeLabel("Boom!!!");
        clearBoomTimeOut();
        resetSound(ticTocSound);
        explosionSound.play();
    }, time);
}

function getReady(callback) {
    let count = 3;
    readyCountSound.play();
    changeLabel(count--);
    readyTimer = setInterval(() => {
        if (!count) {
            changeLabel("Go!");
            readySound.play();
            clearReadyTimer();
            return callback();
        }
        changeLabel(count);
        readyCountSound.play();
        count -= 1;
    }, 1000);
}
