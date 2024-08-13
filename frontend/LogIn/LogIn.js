
let boton = document.getElementById("BContinuar") 

boton.addEventListener("click", sendData)

console.log("hola")
async function sendData(event) {
    event.preventDefault();

    let inputLogin = document.getElementById("InputInserte").value;
    let inputApellido = document.getElementById("InputApellido").value;
    let inputGmail = document.getElementById("InputGmail").value;
    let inputContraseña = document.getElementById("InputContraseña").value;

    console.log("Sending user data....")

    console.log(inputLogin)
    console.log(inputGmail)
    console.log(inputContraseña)
    console.log(inputApellido)


    let response = await fetch('/send-register', {

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
}