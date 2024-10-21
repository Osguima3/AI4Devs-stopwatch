# Prompts

### IA: ChatGPT 4o

## Intento 1

Eres un senior web developer. Necesito que crees una pequeña web SPA con un cronómetro y una cuenta atrás. Usa la página https://www.online-stopwatch.com/ como referencia.

- Te he añadido 3 imágenes con las pantallas que quiero. La pantalla principal ha de tener dos botones para ir a cada una de las funciones, y cada una de estas un botón para volver atrás al menú.
- Usa buenas prácticas para organizar el código, y separa estilo y lógica (pon esta última en un fichero llamado script.js)
- Añade documentación de manera adecuada con JSDoc
- No uses librerías, excepto para el estilado, para el que puedes usar algún framework.

Hazme preguntas sobre cualquier duda que tengas antes de proceder.

--

### Preguntas:

1. **Framework CSS**: ¿Prefieres algún framework de estilos en particular (Bootstrap, TailwindCSS, etc.)?
2. **Interacciones específicas**: Para el cronómetro, ¿debería ser un cronómetro simple que sólo inicie y reinicie, o debería también tener una función de pausa? ¿La cuenta atrás debe permitir pausarse también?
3. **Funcionalidad avanzada**: ¿Deseas algún tipo de sonido o alarma cuando la cuenta atrás llegue a 0?
4. **Diseño responsivo**: ¿Necesitas que la web sea totalmente responsive, o sólo debe cumplir un diseño fijo similar al de las imágenes que has compartido?

--

1) Usa tailwind
2) Ambas funciones han de poder pausar. De hecho, en la pantalla de cuenta atrás, despues de pulsar el botón de set, tienen que aparecer los mismos botones que en el cronómetro de start/stop (sustituyendo los botones numéricos y de set/clear), y una vez pulsado el botón start, este se convierte en el botón pause.
3) No, sin sonido.
4) Sí, haz que el diseño sea responsive

-- 

Necesito algunas correcciones:
- Al volver al menú, el estado de las funciones se debería limpiar con un reset.
- La visualización temporal mientras se introducen los digitos de la cuenta atrás es incorrecta. Usa el mismo calculo que usas al principio de la cuenta atrás (una vez pulsado el botón set), puesto a que esa sí es correcta.

--

- Asegúrate de incluir los milisegundos en todo momento. No se han de poder configurar en la cuenta atrás.

-- 

Centrémonos ahora en el estilado. Usando las 3 imágenes de referencia iniciales, asegurate que el estilo coincida lo máximo posible. Te describo los puntos principales pero céntrate en las imágenes para los detalles:
- Los botones del menú deberían tener una flecha, con un texto encima
- Tanto los botones como el cronómetro deberían tener un borde negro alrededor
- Los milisegundos en la visualización del tiempo deberían verse en pequeño, debajo de los segundos
- El layout de los botones numéricos ha de ocupar el mismo espacio que los botones de start/stop, para que el cronómetro no se mueva al cambiar del pad a los botones de start/stop

--

[En este punto, la IA ha empezado a olvidar contexto y ha empezado a romper partes de la app]


## Intento 2

Eres un senior web developer. Necesito que crees una pequeña web con un cronómetro y una cuenta atrás usando la página https://www.online-stopwatch.com/ como referencia.

Empecemos preparando un prompt para pulir las especificaciones, y luego poder usar para generar el resultado cuando me esté conforme.

Para empezar:

Funcionalidad:
- Ambas funciones comparten el mismo visualizador de tiempo y botones start/stop, pero la cuenta atrás ha de tener una pantalla anterior con un teclado numérico para poder configurar el tiempo.
- No se puede configurar los milisegundos en la cuenta atrás - solo horas, minutos y segundos.
- Ejemplos de como introducir el tiempo:
    * 1 - 2 - 3 pasaría a ser 00:01:23.000
    * 1 - 5 - 0 - 0 pasaría a ser 00:15:00.000
    * 1 - 0 - 0 - 0 - 0 pasaría a ser 01:00:00.000
- Al introducir el tiempo y pulsar el botón set, se mostrarían los botones start y stop
- Usa buenas prácticas para organizar el código, y separa estilo y lógica (pon esta última en un fichero llamado script.js).
- No uses funciones anónimas para event handlers, define las funciones por separado.
- No uses librerías, excepto tailwind para el estilado.

Estilado:
- Te he añadido 3 imágenes con las pantallas que quiero. Úsalas como referencia para estilar los componentes
- El menú principal ha de tener dos botones para navegar a las funciones, y éstas han de tener un botón para volver.
- El teclado numérico ha de ocupar el mismo espacio visual que los botones de start/stop, para que cuando unos se oculten para pasar a mostrarse los otros, el resto de elementos visuales no salten de sitio.

Otros
- Añade documentación de manera adecuada con JSDoc, incluyendo descripciones de todas las funciones y de sus parámetros.

---

- Quiero que la cuenta esté activa, el botón de start se convierta en un botón de pausa.
- Quiero que el estilado sea fiel a las referencias, con botones grandes y marcos negros redondeados, y el mismo estilo para la visualización del tiempo.
- La visualización de los milisegundos ha de ser más pequeña que el resto, y ha de estar debajo de los segundos
- Al navegar de vuelta al menu principal, el estado tiene que resetearse
- Haz que los numeros estén en dos filas (0-4, 5-9). Tendrán que tener la mitad del alto que los botones de start/stop para que en total 
ocupen el mismo espacio.

---

- Cada vez que se pulse un numero, se tiene que actualizar la visualización
- Cuando se pulse el botón set, se tienen que esconder los números, el botón set y clear, para pasar a mostrar los botones start/pause y clear
- Quiero que cuando se pulse el botón de clear al usar la funcionalidad de cuenta atrás, que vuelva a aparecer el teclado numérico

---

- Quiero añadir tests para comprobar que todo funciona bien.
- Quiero que uses un framework ligero que no necesite npm. Pon los tests en un fichero aparte.
- No incluyas código en el prompt, como mucho pon un ejemplo.
  
---

- Añade un test para comprobar que al pulsar el botón pause, el tiempo se detenga y se vuelva a mostrar el botón de start
- Añade tests para la navegación entre el menú y las pantallas
- Asegurate que los tests interaccionan con el DOM directamente, en lugar de llamar funciones script

---

Hay alguna pregunta o cambio más que creas que se pueda añadir?

---

### **[ChatGPT]** Sugerencias para mejorar:

#### Accesibilidad (A11Y):

Uso de teclado: ¿Te gustaría añadir tests y soporte para que los botones de la interfaz (Start, Pause, Clear, Set, etc.) sean accesibles mediante el teclado? Esto podría involucrar añadir atributos tabindex y eventos como keydown.
Arias y roles: Podrías agregar atributos aria-label y roles para mejorar la accesibilidad de los elementos interactivos (como los botones y el teclado numérico).

#### Animaciones:

Transiciones suaves: Si deseas que la interfaz sea más fluida, podrías considerar añadir transiciones suaves entre el teclado numérico y los botones de control. Esto también podría reflejarse en los tests (verificar que las transiciones de visibilidad se ejecutan correctamente).

#### Funcionalidad de Reseteo automático:

Podrías considerar que el botón Clear no solo reinicie el cronómetro o la cuenta atrás y muestre el teclado numérico, sino también que reseteé los valores de entrada del tiempo para evitar confusión.

#### Gestión de errores en la cuenta atrás:

Prevención de errores: Podrías querer manejar situaciones donde el usuario intente iniciar una cuenta atrás sin configurar correctamente el tiempo (por ejemplo, si el tiempo configurado es 00:00:00).
Indicador visual: Tal vez podrías agregar un pequeño indicador visual o mensaje cuando se produzca un error en la entrada de tiempo para mejorar la experiencia del usuario.

#### Tests adicionales:

Simulación de error: Un test para verificar qué sucede si el usuario intenta iniciar la cuenta atrás sin haber configurado un tiempo válido.
Rendimiento: ¿Te interesaría incluir pruebas de rendimiento? Por ejemplo, para asegurarte de que la cuenta atrás y el cronómetro se comportan bien incluso si se ejecutan durante largos periodos.

#### Estado persistente (opcional):

Guardado de estado: Si quieres que la app recuerde el estado del cronómetro o la cuenta atrás al cambiar entre pantallas (o incluso después de recargar la página), podrías añadir algún tipo de almacenamiento local (localStorage) y tests para verificar que esta funcionalidad se comporta correctamente.

---

- Incorpora la gestión de errores con sus tests correspondientes
- Usa una transición de barrido lateral hacia la izquierda para entrar a los diferentes modos, y un barrido hacia la derecha para volver al 
menú

---

- Organiza un poco el prompt para simplificarlo

---

## Prompt final

Eres un senior web developer. Necesito que crees una pequeña web con un cronómetro y una cuenta atrás usando la página 
https://www.online-stopwatch.com/ y las imágenes como referencia.

### Funcionalidad:

1. **Interfaz compartida de cronómetro y cuenta atrás**:
    - Ambas funciones comparten el mismo visualizador de tiempo y botones de control (**Start/Pause** y **Clear**).
    - Para la **cuenta atrás**, habrá una pantalla previa con un teclado numérico que permite configurar horas, minutos y segundos (sin milisegundos). La visualización del tiempo se actualizará en tiempo real a medida que se ingresan los números.
    - Al pulsar **Set**, el teclado numérico y los botones **Set** y **Clear** se ocultarán, y aparecerán los botones **Start/Pause** y **Clear**.

2. **Control del cronómetro y la cuenta atrás**:
    - **Start/Pause**: Al pulsar **Start**, el cronómetro o la cuenta atrás comenzarán, y el botón cambiará a **Pause**. Pulsar **Pause** detendrá la cuenta temporalmente y cambiará el botón de nuevo a **Start**.
    - **Clear**: Reinicia el cronómetro o la cuenta atrás a cero. En el caso de la cuenta atrás, al pulsar **Clear**, se mostrará nuevamente el teclado numérico para configurar un nuevo tiempo.

3. **Manejo de errores en la cuenta atrás**:
    - Si el usuario intenta iniciar la cuenta atrás sin configurar un tiempo válido (por ejemplo, `00:00:00`), se mostrará un mensaje de error para evitar que comience.

4. **Animaciones de transiciones suaves**:
    - **Barrido lateral hacia la izquierda**: Al entrar en los modos de **cronómetro** o **cuenta atrás** desde el menú principal.
    - **Barrido lateral hacia la derecha**: Al regresar al menú principal desde cualquiera de los modos.

5. **Restablecimiento de estado al volver al menú**:
    - Al regresar al menú principal, el estado de las pantallas de cronómetro y cuenta atrás debe reiniciarse:
        - **Cronómetro**: El tiempo debe volver a cero y el botón debe volver a **Start**.
        - **Cuenta atrás**: El teclado numérico debe reaparecer para permitir una nueva configuración del tiempo.

### Buenas prácticas: separación de lógica y estilo

- **Estilo**:
    - **Tailwind CSS** será utilizado para el estilado de los componentes, y todo el código relacionado con el estilo debe estar en el archivo **HTML** utilizando las clases de Tailwind, sin mezclarlo con la lógica.

- **Lógica**:
    - Todo el código relacionado con la lógica del cronómetro y la cuenta atrás debe estar en un archivo **JavaScript** independiente (`script.js`). No se debe utilizar código de estilo directamente en el JavaScript.

### Estilado con Tailwind CSS:

El proyecto debe utilizar **Tailwind CSS** para estilizar los componentes de la interfaz. Elementos clave para el estilado:

- **Botones**: Grandes, con bordes redondeados y marcos negros.
- **Visualización del tiempo**: Segundos de mayor tamaño, con milisegundos más pequeños debajo de los segundos.
- **Teclado numérico**: Organizado en dos filas (`0`-`4`, `Set` y `5`-`9`, `Clear`), con botones que ocupan la mitad de la altura de los 
  botones **Start/Pause** y **Clear**.

### JSDoc:

El código en el archivo **JavaScript** debe estar bien documentado utilizando **JSDoc** para describir el propósito de cada función y sus parámetros. Aquí tienes un **ejemplo** para una función:

```javascript
/**
 * Inicia el cronómetro y cambia el botón de Start a Pause.
 * @returns {void}
 */
function startTimer() {
    // Lógica de inicio del cronómetro
}
```

### Organización del proyecto:

1. **HTML**:
    - Todo el código relacionado con la estructura y el estilo visual debe estar en el archivo **HTML**, utilizando **Tailwind CSS** para el diseño.
    - No mezclar lógica de JavaScript en el archivo HTML.

2. **JavaScript**:
    - La lógica de la aplicación debe estar en el archivo **JavaScript** independiente (`script.js`), evitando mezclar estilos o clases de CSS en el código.
    - Las funciones deben ser reutilizables y bien estructuradas para seguir buenas prácticas de desarrollo.

### Tests (usando **QUnit** interactuando con el DOM):

Los tests deberán interactuar directamente con el DOM y verificar el comportamiento de la interfaz:

1. **Tests para el cronómetro**:
    - **Iniciar y cambiar botón de Start a Pause**: Simular la pulsación del botón **Start** y verificar que el cronómetro comienza y que el botón cambia a **Pause**.
    - **Pausar y reiniciar**: Simular la pulsación de **Pause** para detener el cronómetro y **Clear** para reiniciarlo.

2. **Tests para la cuenta atrás**:
    - **Configurar y actualizar visualización**: Verificar que al ingresar números en el teclado numérico, la visualización del tiempo se actualiza en tiempo real.
    - **Ocultar teclado numérico y mostrar controles**: Verificar que el teclado numérico se oculta y los controles **Start/Pause** y **Clear** aparecen al pulsar **Set**.
    - **Error en cuenta atrás sin tiempo válido**: Verificar que se muestra un mensaje de error si no se configura un tiempo válido.
    - **Reiniciar cuenta atrás**: Simular la pulsación del botón **Clear** y verificar que el teclado numérico reaparece para configurar un nuevo tiempo.

3. **Tests de transiciones con animación de barrido**:
    - Verificar que las transiciones de barrido lateral (izquierda y derecha) se ejecutan correctamente al navegar entre las pantallas.

**Ejemplo de test**:

```javascript
QUnit.test('Simulación de navegación al cronómetro desde el menú', function(assert) {
  // Simular pulsación del botón que navega al cronómetro
  document.querySelector("#stopwatch-button").click();
  
  // Verificar que la pantalla cambió al cronómetro
  const currentScreen = document.querySelector("#screen").innerText;
  assert.equal(currentScreen, 'Cronómetro', "La pantalla debería mostrar el cronómetro.");
});
```

---

Los botones del teclado numérico no funcionan. Revisa que estén bien conectados.

---

Tengo estos errores:

Stopwatch resets to 00:00:00 after clearing@ 3 ms
Expected: 	
"00:00:00"
Result: 	
"00:00:00000"

Countdown time is displayed as 01:50:30 after input@ 2 ms
Expected: 	
"01:50:30"
Result: 	
"00:00:00000"

Del segundo error, el código está comprobando si el display ya tiene 6 dígitos, pero empieza con 6 0s, así que ya no introduce ninguno.
Haz un trim de los 0s por la izquierda

---

El layout de los números no es el correcto. Debería estar en dos filas
Cambia el orden a 0-4, Set en la primera, y 5-9, Clear en la segunda

---

Los botones de start/stop y de selección de modo deberían ser más grandes, para ocupar el mismo espacio que las dos filas de números
Haz que los botones de cambio de modo y de start/clear tengan el mismo ancho, y que ocupen un ancho acorde al resto de la página

---

Dos pequeñas correcciones:
- Los botones y la visualización del timer deberían tener un marco negro redondeado
- Asegurate que los botones correspondientes están visibles/escondidos al cambiar de modo. A veces se ve el teclado en el modo de cronómetro

---

Añade flechas a las dos opciones del menú como en la imagen de referencia, y quita el texto de choose mode

---

Las flechas deberían ser mucho más grandes, señalando hacia arriba para el cronometro y para abajo para la cuenta atras.
Haz que el marco alrededor del timer sea fijo, para que no varíe con el tamaño de la letra dentro
