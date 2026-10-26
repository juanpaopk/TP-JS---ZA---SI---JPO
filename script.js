// Configuración de EmailJS
    emailjs.init({
    publicKey: "service_mmgp8h9" // Acá va la PUBLIC KEY de la cuenta de EmailJS
});

document.getElementById("miFormulario")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        // 1. Validar campos obligatorios
        const nombre = document.getElementById("nombre");
        const apellido = document.getElementById("apellido");
        const email = document.getElementById("email");
        const asunto = document.getElementById("asunto");

        let esValido = true;

        document.getElementById("errorNombre").style.display = "none";
        document.getElementById("errorApellido").style.display = "none";
        document.getElementById("errorEmail").style.display = "none";
        document.getElementById("errorAsunto").style.display = "none";

        if (nombre.value.trim().length < 3) {
            document.getElementById("errorNombre").style.display = "block";
            esValido = false;
        }

        if (apellido.value.trim() === "") {
            document.getElementById("errorApellido").style.display = "block";
            esValido = false;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email.value.trim())) {
            document.getElementById("errorEmail").style.display = "block";
            esValido = false;
        }

        if (asunto.value.trim() === "") {
            document.getElementById("errorAsunto").style.display = "block";
            esValido = false;
        }

        // 2. Validar reCAPTCHA
        const captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse) {
            alert("Por favor, completá el reCAPTCHA.");
            esValido = false;
        }

        // 3. Enviar únicamente si todas las validaciones pasan
        if (!esValido) return;

        emailjs.sendForm(
            "service_mmgp8h9", //Acá va el ID del servicio de EmailJS
            "TU_TEMPLATE_ID", //Acá va el ID de la plantilla de EmailJS si es que el form es correcto
            this
        )
        
        .then(() => {
            alert("¡Correo enviado con éxito!");
            this.reset();

            if (typeof grecaptcha !== "undefined") {
                grecaptcha.reset();
            }
        })
        
        .catch((error) => {
            console.error("Error de EmailJS:", error);
            alert("No se pudo enviar el correo. Revisá la consola.");
    });
});
