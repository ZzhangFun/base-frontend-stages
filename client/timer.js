let time = 0;

const timeFormatParser = (time) => {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return `${hours}:${minutes}:${seconds}`
};

const increaseTimer = () => {
    time++;
    const timeContent = document.getElementById('time-content');
    if (timeContent) {
        timeContent.innerHTML = timeFormatParser(time);
    }
}

const reloadTimer = () => {
    clearTimeout(timer);
    time = 0;
    timer = setInterval(increaseTimer, 1000);
    document.getElementById('time-content').innerHTML = timeFormatParser(time);
}

let timer = setInterval(increaseTimer, 1000);
