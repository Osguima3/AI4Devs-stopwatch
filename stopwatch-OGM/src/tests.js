QUnit.module('Stopwatch Functionality', function(hooks) {
    hooks.beforeEach(function() {
        // Simular la inicialización de la aplicación
        init();
        // Reiniciar el cronómetro
        resetTimer();
    });

    QUnit.test('Start and Pause the Stopwatch', function(assert) {
        // Simular la navegación al modo de cronómetro
        enterMode('stopwatch');

        // Verificar que el botón de inicio está presente
        const startPauseBtn = document.getElementById('start-pause-button');
        assert.ok(startPauseBtn, 'Start/Pause button exists');

        // Simular clic en el botón de "Start"
        startPauseBtn.click();
        assert.equal(startPauseBtn.innerText, 'Pause', 'Button changes to "Pause" after starting');

        // Simular clic en el botón de "Pause"
        startPauseBtn.click();
        assert.equal(startPauseBtn.innerText, 'Start', 'Button changes back to "Start" after pausing');
    });

    QUnit.test('Clear Stopwatch resets to 00:00:00.000', function(assert) {
        // Simular la navegación al modo de cronómetro
        enterMode('stopwatch');

        // Simular clic en el botón de "Start"
        const startPauseBtn = document.getElementById('start-pause-button');
        startPauseBtn.click();

        // Pausar el cronómetro y luego hacer clic en "Clear"
        startPauseBtn.click(); // Pause the timer
        const clearBtn = document.getElementById('reset-button');
        clearBtn.click(); // Clear the timer

        // Verificar que el cronómetro ha sido reiniciado, incluyendo milisegundos
        const timeDisplay = document.getElementById('time-display').innerText;
        assert.equal(timeDisplay, '00:00:00.000', 'Stopwatch resets to 00:00:00000 after clearing');
    });
});

QUnit.module('Countdown Functionality', function(hooks) {
    hooks.beforeEach(function() {
        // Simular la inicialización de la aplicación
        init();
        // Reiniciar la cuenta atrás
        resetTimer();
    });

    QUnit.test('Setting countdown updates display', function(assert) {
        // Simular la navegación al modo de cuenta atrás
        enterMode('countdown');

        // Simular la introducción de un tiempo en el teclado numérico
        handleNumericInput({ target: { innerText: '1' } }); // Ingresar '1'
        handleNumericInput({ target: { innerText: '5' } }); // Ingresar '5'
        handleNumericInput({ target: { innerText: '0' } }); // Ingresar '0'
        handleNumericInput({ target: { innerText: '0' } }); // Ingresar '0'
        handleNumericInput({ target: { innerText: '3' } }); // Ingresar '3'
        handleNumericInput({ target: { innerText: '0' } }); // Ingresar '0'

        const timeDisplay = document.getElementById('time-display').innerText;

        // Verificar que la pantalla muestra el tiempo correctamente formateado
        assert.equal(timeDisplay, '15:00:30', 'Countdown time is displayed as 15:00:30 after input');
    });

    QUnit.test('Start and pause countdown', function(assert) {
        // Simular la navegación al modo de cuenta atrás
        enterMode('countdown');

        // Simular la configuración de un tiempo
        updateCountdownDisplay('005000'); // 00:50:00

        // Simular clic en "Set"
        const setBtn = document.getElementById('set-button');
        setBtn.click();

        // Iniciar la cuenta atrás
        const startPauseBtn = document.getElementById('start-pause-button');
        startPauseBtn.click();
        assert.equal(startPauseBtn.innerText, 'Pause', 'Button changes to "Pause" after starting countdown');

        // Pausar la cuenta atrás
        startPauseBtn.click();
        assert.equal(startPauseBtn.innerText, 'Start', 'Button changes back to "Start" after pausing countdown');
    });

    QUnit.test('Error when starting countdown with 00:00:00', function(assert) {
        // Simular la navegación al modo de cuenta atrás
        enterMode('countdown');

        // Intentar iniciar la cuenta atrás sin configurar un tiempo válido
        const setBtn = document.getElementById('set-button');
        setBtn.click();

        // Simular clic en "Start"
        const startPauseBtn = document.getElementById('start-pause-button');
        const done = assert.async();  // Hacer que QUnit espere el resultado asíncrono

        // Capturar el mensaje de alerta usando una función de prueba
        window.alert = function(message) {
            assert.equal(message, 'Please set a valid countdown time.', 'Error alert shown when trying to start countdown with 00:00:00');
            done();
        };

        startPauseBtn.click();  // Intentar iniciar la cuenta atrás sin tiempo válido
    });

    QUnit.test('Clear countdown resets to keypad input', function(assert) {
        // Simular la navegación al modo de cuenta atrás
        enterMode('countdown');

        // Simular la configuración de un tiempo
        updateCountdownDisplay('005000'); // 00:50:00

        // Iniciar la cuenta atrás y luego hacer clic en "Clear"
        const setBtn = document.getElementById('set-button');
        setBtn.click();
        const clearBtn = document.getElementById('reset-button');
        clearBtn.click(); // Clear the timer

        const keypadVisible = !document.getElementById('keypad').classList.contains('hidden');

        // Verificar que el teclado numérico reaparece después de limpiar la cuenta atrás
        assert.ok(keypadVisible, 'Keypad is visible again after clearing countdown');
    });
});
