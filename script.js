/* 1.- Agregar Re-CAPTCHA

2.- Validar los campos
2.1.- Que no permita avanzar sin los primeros tres campos
2.2.- El resto es opcional
2.3.- El input mail debe ser en formato mail y sin espacios
2.4.- El campo "Nombre" debe tener un mínimo de 3 chars

3.- Enviar el form a un servicio -> E-mail.JS

Primeros 3 puntos es de acá a 15 días miércoles

4.- Crear un log-in con una base de datos en Firebase

4.1.- Correo (que valide si existe)
4.2.- Contraseña (que valide que sea correcta)
4.3.- Re-captcha de "no soy un robot"
4.4.- Botón de submit
4.5.- "¿Olvidaste tu contraseña?" - Que efectivamente funcione

5.- Crear cuenta - Dentro del Log-in
5.1.- Nombre y apellido
5.2.- Mail
5.3.- Contraseña

6.- Usuario admin
6.1.- Que tenga ABM de productos
6.2.- Rol admin en NoSQL*/


document.getElementById('miFormulario').addEventListener('submit', function(event) {
    // Detener el envío por defecto para validar primero
    event.preventDefault();

    // Obtener los elementos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");

    // Obtener los contenedores de error
    const errorNombre = document.getElementById("errorNombre");
    const errorApellido = document.getElementById("errorApellido");
    const errorEmail = document.getElementById("errorEmail");

    // Inicializar estado de validez
    let esValido = true;

    // Ocultar errores previos
    errorNombre.style.display = "none";
    errorApellido.style.display = "none";
    errorEmail.style.display = "none";

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

    // Si todo es correcto, se puede proceder con el envío o acción requerida
    if (esValido) {
        alert("¡Formulario enviado con éxito!");
        // Aquí puedes usar: this.submit(); si deseas enviar el formulario de verdad.
        }
});


const captchaResponse = grecaptcha.getResponse();


// Validar que el reCAPTCHA esté completado
if (!captchaResponse) {
    alert("Por favor, completá el reCAPTCHA.");
    return;
}
