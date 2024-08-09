import { METHODS } from "http";

let inputLogin = document.getElementById("inputInserte").value;
let inputApellido = document.getElementById("inputApellido").value;
let inputGmail = document.getElementById("inputGmail).value");
let inputContraseña = document.getElementById("inputContraseña").value;

let boton = document.getElementById("BContinuar") 

boton.addEventListener("click", sendData)

async function sendData() {
    let response = fetch('/send-register', {
        method: 'POST',
        headers: {
            'Content type': 'application/json'
        },
        body: {
            firstName:inputLogin,
            password:inputContraseña,
            lastName:inputApellido,
            gmail: inputGmail,
        }
    })
}