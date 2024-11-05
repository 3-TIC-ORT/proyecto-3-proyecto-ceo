let botonRegister = document.getElementById("register") 

botonRegister.addEventListener("click", sendData)

console.log("running register")
async function sendData(event) {
    event.preventDefault();

    let inputLogin = document.getElementById("user").value;
    let inputApellido = document.getElementById("lname").value;
    let inputGmail = document.getElementById("email").value;
    let inputContraseña = document.getElementById("pwd").value;

    console.log("Sending user data....")

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

    let data = await response.json()
    localStorage.setItem('token', data.token)

}

async function redirectRoute() {
    const token = localStorage.getItem('token')

    console.log('sending the token')
    let response = await fetch('http://localhost:3000/resumenes', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    
    if (response.ok) {
        console.log('Hurray!!!!, se mando el token')
    }
}