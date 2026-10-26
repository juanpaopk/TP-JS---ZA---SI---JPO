document.getElementById('miFormulario').addEventListener('submit', function(event) {
    // Detener el envío por defecto para validar primero
    event.preventDefault();

    // Obtener los elementos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const asunto = document.getElementById("asunto");

    // Obtener los contenedores de error
    const errorNombre = document.getElementById("errorNombre");
    const errorApellido = document.getElementById("errorApellido");
    const errorEmail = document.getElementById("errorEmail");
    const errorAsunto = document.getElementById("errorAsunto");

    // Inicializar estado de validez
    let esValido = true;

    // Ocultar errores previos
    errorNombre.style.display = "none";
    errorApellido.style.display = "none";
    errorEmail.style.display = "none";
    errorAsunto.style.display = "none";


    // 1. Validar Nombre (Obligatorio y mínimo 3 caracteres)
    if (nombre.value.trim().length < 3) {
        errorNombre.style.display = "block";
        esValido = false;
    }

    // 2. Validar Apellido (Obligatorio)
    if (apellido.value.trim() === "") {
            errorApellido.style.display = "block";
            esValido = false;
    }

    // 3. Validar Email (Formato válido y sin espacios)
    // Expresión regular que valida formato de mail estándar y prohíbe espacios vacíos
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tieneEspacios = /\s/.test(email.value);

    if (!regexEmail.test(email.value) || tieneEspacios || email.value === "") {
        errorEmail.style.display = "block";
        esValido = false;
    }

    const captchaResponse = grecaptcha.getResponse();

    // 4. Validar Asunto (Obligatorio)
    if (asunto.value.trim() === "") {
            errorAsunto.style.display = "block";
            esValido = false;
    }

    // 5. Validar que el reCAPTCHA esté completado
    if (!captchaResponse) {
    alert("Por favor, completá el reCAPTCHA.");
    esValido = false;
    }

    // 6. Si todo es correcto, se puede proceder con el envío o acción requerida
    if (esValido) {
        alert("¡Formulario enviado con éxito!");
        // Aquí puedes usar: this.submit(); si deseas enviar el formulario de verdad.
        }
});
