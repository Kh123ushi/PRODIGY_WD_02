const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapsContainer = document.getElementsByClassName("laps")[0];
const clearLapsButton = document.getElementsByClassName("lap-clear-button")[0];

let isPlay = false;
let setCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let sec;
let centiSec;
let min;
let lapCount = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        
        // Minute update
        min = setInterval(() => {
            minute.innerHTML = `${minCounter.toString().padStart(2, '0')} :`;
            ++minCounter;
        }, 60 * 1000);
        
        // Second update
        sec = setInterval(() => {
            if (setCounter === 60) {
                setCounter = 0;
            }
            second.innerHTML = `&nbsp;${setCounter.toString().padStart(2, '0')} : `;
            ++setCounter;
        }, 1000);

        // Centisecond update
        centiSec = setInterval(() => {
            centiSecond.innerHTML = `&nbsp;${centiCounter.toString().padStart(2, '0')}`;
            ++centiCounter;
            if (centiCounter === 100) {
                centiCounter = 0;
            }
        }, 10);

        isPlay = true;

    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
    }
    toggleButton();
}

const reset = () => {
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
    isPlay = false;
    setCounter = 0;
    centiCounter = 0;
    minCounter = 0;
    lapCount = 0;
    lapsContainer.innerHTML = '';
    clearLapsButton.classList.add("hidden");
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    playButton.innerHTML = 'Play';
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = "&nbsp;0";
    minute.innerHTML = "0 :";
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");

    lapCount++;
    number.innerHTML = `#${lapCount}`;
    timeStamp.innerHTML = ` ${minCounter.toString().padStart(2, '0')} : ${setCounter.toString().padStart(2, '0')} : ${centiCounter.toString().padStart(2, '0')}`;

    li.appendChild(number);
    li.appendChild(timeStamp);
    lapsContainer.appendChild(li);

    clearLapsButton.classList.remove("hidden");
}

const clearLaps = () => {
    lapsContainer.innerHTML = '';
    clearLapsButton.classList.add("hidden");
    lapCount = 0;
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearLapsButton.addEventListener("click", clearLaps);
