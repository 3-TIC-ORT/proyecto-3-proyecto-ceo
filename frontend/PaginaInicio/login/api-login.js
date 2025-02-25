let botonLogin = document.getElementById("BContinuar");

botonLogin.addEventListener("click", sendData);
console.log("Corriendo login");

async function sendData(event) {
    event.preventDefault();

    let inputMail = document.getElementById("email")?.value.trim();
    let inputUsuario = document.getElementById("nombreUsuario")?.value.trim();
    let inputConstrasena = document.getElementById("password")?.value.trim();

    if (!inputMail || !inputUsuario || !inputConstrasena) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    console.log("Validando datos usuario....");

    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                password: inputConstrasena,
                firstName: inputUsuario,
                gmail:inputMail,
            })
        })

        if (!response.ok) {
            let errorMessage = await response.text();
            alert(errorMessage || "Error al iniciar sesión.");
            return;
        }

        let data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            alert("Login exitoso.");
        } else {
            alert("No se recibió un token válido.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al intentar iniciar sesión.");
    }
}