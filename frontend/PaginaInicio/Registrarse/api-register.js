let botonRegister = document.getElementById("register");

botonRegister.addEventListener("click", sendData)

console.log("Corriendo registro")
async function sendData(event) {
    event.preventDefault();

    let inputLogin = document.getElementById("user")?.value.trim();
    let inputApellido = document.getElementById("lname")?.value.trim();
    let inputGmail = document.getElementById("email")?.value.trim();
    let inputContraseña = document.getElementById("pwd")?.value.trim();

    if (!inputLogin || !inputApellido || !inputGmail || !inputContraseña) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    console.log("Enviando datos de usuario....");

    try {
        let response = await fetch('http://localhost:3000/registers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                firstName: inputLogin,
                password: inputContraseña,
                lastName:inputApellido,
                gmail: inputGmail
            })
        })

        // Si la respuesta no es OK, muestra el mensaje de error al usuario
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return;
        }

        // Si la respuesta es exitosa, guarda el token.
        let data = await response.json();
        localStorage.setItem('token', data.token);
        alert("Registro exitoso.");

        
    } catch (error) {
        console.error("Error al registrar usuario", error);
    }

}

async function redirectRoute() {
    const token = localStorage.getItem('token')

    if (!token) {
        console.error("No hay token almacenado.");
        return;
    }

    console.log('Enviando token...')
    try {
        let response = await fetch('http://localhost:3000/resumenes', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.ok) {
            console.log('Token enviado correctamente');
        } else {
            console.error('Error al enviar token', response.status);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}