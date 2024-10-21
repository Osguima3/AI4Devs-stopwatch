// Variables globales para el cronómetro y la cuenta atrás
let isStopwatchMode = false; // Indica si estamos en modo cronómetro
let timerInterval = null; // Almacena el intervalo del cronómetro o cuenta atrás
let countdownTime = 0; // Tiempo configurado para la cuenta atrás
let remainingTime = 0; // Tiempo restante para la cuenta atrás
let isCountdownRunning = false; // Indica si la cuenta atrás está activa

/**
 * Inicializa los event listeners de los botones.
 */
function init() {
    const stopwatchBtn = document.getElementById('stopwatch-button');
    const countdownBtn = document.getElementById('countdown-button');
    const startPauseBtn = document.getElementById('start-pause-button');
    const clearBtn = document.getElementById('reset-button');
    const backBtn = document.getElementById('back-button');
    const setBtn = document.getElementById('set-button');
    const clearNumBtn = document.getElementById('clear-button');

    // Event listeners para los botones del menú principal
    stopwatchBtn.addEventListener('click', () => enterMode('stopwatch'));
    countdownBtn.addEventListener('click', () => enterMode('countdown'));

    // Event listeners para los controles (Start/Pause, Clear)
    startPauseBtn.addEventListener('click', toggleTimer);
    clearBtn.addEventListener('click', resetTimer);
    backBtn.addEventListener('click', backToMenu);

    // Event listeners para los botones del teclado numérico
    setBtn.addEventListener('click', setCountdown);
    clearNumBtn.addEventListener('click', clearCountdownInput);

    // Event listener para cada botón numérico
    document.querySelectorAll('.numeric-button').forEach(button => {
        button.addEventListener('click', handleNumericInput);
    });
}

/**
 * Cambia al modo cronómetro o cuenta atrás.
 * @param {string} mode - 'stopwatch' o 'countdown'.
 */
function enterMode(mode) {
    isStopwatchMode = (mode === 'stopwatch');
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('timer-screen').classList.remove('hidden');

    if (isStopwatchMode) {
        // Esconder teclado numérico y mostrar controles en modo cronómetro
        document.getElementById('keypad').classList.add('hidden');
        document.getElementById('controls').classList.remove('hidden');
        resetTimer(); // Reiniciar cronómetro
    } else {
        // Mostrar teclado numérico y esconder controles en modo cuenta atrás
        document.getElementById('controls').classList.add('hidden');
        document.getElementById('keypad').classList.remove('hidden');
        clearCountdownInput(); // Reiniciar cuenta atrás
    }
}

/**
 * Alterna entre iniciar y pausar el cronómetro o la cuenta atrás.
 */
function toggleTimer() {
    if (isStopwatchMode) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('start-pause-button').innerText = 'Start';
        } else {
            startTimer();
            document.getElementById('start-pause-button').innerText = 'Pause';
        }
    } else {
        if (isCountdownRunning) {
            clearInterval(timerInterval);
            isCountdownRunning = false;
            document.getElementById('start-pause-button').innerText = 'Start';
        } else if (remainingTime > 0) {
            startCountdown();
            document.getElementById('start-pause-button').innerText = 'Pause';
        } else {
            alert('Please set a valid countdown time.');
        }
    }
}

/**
 * Inicia el cronómetro.
 */
function startTimer() {
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
    }, 10);
}

/**
 * Inicia la cuenta atrás.
 */
function startCountdown() {
    isCountdownRunning = true;
    const startTime = Date.now();
    const endTime = startTime + remainingTime;

    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            remainingTime = 0;
            isCountdownRunning = false;
            alert('Time is up!');
        }

        displayTime(remainingTime);
    }, 10);
}

/**
 * Resetea el cronómetro o la cuenta atrás a su estado inicial.
 */
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('start-pause-button').innerText = 'Start';
    displayTime(0);

    if (!isStopwatchMode) {
        document.getElementById('keypad').classList.remove('hidden');
        document.getElementById('controls').classList.add('hidden');
        remainingTime = 0;
        isCountdownRunning = false;
    }
}

/**
 * Muestra el tiempo en formato HH:MM:SS.mmm.
 * @param {number} timeInMilliseconds - Tiempo en milisegundos.
 */
function displayTime(timeInMilliseconds) {
    const hours = Math.floor(timeInMilliseconds / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = (timeInMilliseconds % 1000).toString().padStart(3, '0');

    document.getElementById('time-display').innerHTML = `${hours}:${minutes}:${seconds}<span class="text-2xl">.${milliseconds}</span>`;
}


/**
 * Configura el tiempo de cuenta atrás basado en la entrada del teclado numérico.
 */
function setCountdown() {
    const timeDisplay = document.getElementById('time-display').innerText.replace(/:/g, '').slice(0, 6);
    const hours = parseInt(timeDisplay.slice(0, 2));
    const minutes = parseInt(timeDisplay.slice(2, 4));
    const seconds = parseInt(timeDisplay.slice(4, 6));

    remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (remainingTime > 0) {
        document.getElementById('keypad').classList.add('hidden');
        document.getElementById('controls').classList.remove('hidden');
    } else {
        alert('Please set a valid countdown time.');
    }
}

/**
 * Limpia la entrada del teclado numérico para la cuenta atrás.
 */
function clearCountdownInput() {
    updateCountdownDisplay('000000');
}

/**
 * Actualiza la visualización de la cuenta atrás en formato HH:MM:SS.
 * @param {string} timeStr - Tiempo en formato de cadena de 6 dígitos.
 */
function updateCountdownDisplay(timeStr) {
    const hours = timeStr.slice(0, 2);
    const minutes = timeStr.slice(2, 4);
    const seconds = timeStr.slice(4, 6);

    document.getElementById('time-display').innerHTML = `${hours}:${minutes}:${seconds}<span class="text-2xl">.000</span>`;
}

/**
 * Maneja la entrada numérica desde el teclado numérico.
 * @param {Event} event - Evento de clic del botón numérico.
 */
function handleNumericInput(event) {
    const value = event.target.innerText;
    let currentDisplay = document.getElementById('time-display').innerText.replace(/:/g, '').slice(0, 6).replace(/^0+/, '');

    if (currentDisplay.length < 6) {
        const updatedDisplay = (currentDisplay + value).padStart(6, '0');
        updateCountdownDisplay(updatedDisplay);
    }
}

/**
 * Regresa al menú principal y reinicia los estados.
 */
function backToMenu() {
    resetTimer();
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('timer-screen').classList.add('hidden');
}

window.onload = init;
