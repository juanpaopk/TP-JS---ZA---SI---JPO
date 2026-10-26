    // 1. Obtener campos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const asunto = document.getElementById("asunto");

    let esValido = true;

    // 2. Ocultar mensajes de error anteriores
    document.getElementById("errorNombre").style.display = "none";
    document.getElementById("errorApellido").style.display = "none";
    document.getElementById("errorEmail").style.display = "none";
    document.getElementById("errorAsunto").style.display = "none";

    // 3. Validar campos obligatorios
    if (nombre.value.trim().length < 3) {
        document.getElementById("errorNombre").style.display = "block";
        esValido = false;
    }

    if (apellido.value.trim() === "") {
        document.getElementById("errorApellido").style.display = "block";
        esValido = false;
    }

    // Expresión regular para validar el formato del correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.value.trim())) {
        document.getElementById("errorEmail").style.display = "block";
        esValido = false;
    }

    if (asunto.value.trim() === "") {
        document.getElementById("errorAsunto").style.display = "block";
        esValido = false;
    }

    // 4. Validar reCAPTCHA
    if (typeof grecaptcha === "undefined" || !grecaptcha.getResponse()) {
        alert("Por favor, completá el reCAPTCHA.");
        esValido = false;
    }

    // 5. Si hay errores, no enviar
    if (!esValido) return;

    // 6. Enviar con EmailJS
    emailjs.sendForm(
        "service_mmgp8h9",
        "TU_TEMPLATE_ID",
        this
    )
    .then(() => {
        alert("¡Correo enviado con éxito!");
        this.reset();
        grecaptcha.reset();
    })
    .catch((error) => {
        console.error("Error de EmailJS:", error);
        alert("No se pudo enviar el correo. Revisá la consola.");
    });
