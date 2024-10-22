

import { handleComentario } from "../../controllers/comentarioController.js";
import { fetchUserById } from "../../controllers/fetchUserController.js";
import { getQueryParams } from "../../controllers/queryParamsController.js";

console.log('Running preguntas visualizacion')
const sendButton = document.getElementById('send')
const input = document.getElementById('input')

let seccion = 'foros'
let route;
let method = 'GET'
let endpoint;

let contenido;
let idCreator;
let postId; 

sendButton.addEventListener('click', sendComment)

async function getPreguntasDetails() {
    console.log('Getting preguntas info')
    const token = localStorage.getItem('token')

    const id = await getQueryParams()

    try {

        const response = await fetch(`http://localhost:3000/foros/open?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }, 
        });
    
        if (response.ok) {
            console.log('Got the pregunta info')
            const data = await response.json()
            console.log('Received data: ', data)
            route = 'fetch'
            contenido = ''
            postId = data.id;
            const comentarios = await handleComentario(route, seccion, postId, idCreator, contenido, method)

            displayPregunta(data, comentarios)
        } 

    } catch (error) {
        console.log('Failed to get the resumen info:', error)
    }
}


async function displayPregunta(pregunta, comentarios) {
    const informacion = document.getElementById('text')
    const titulo = document.getElementById('title')
    const containerComentarios = document.getElementById('comentarios')

    titulo.innerHTML = pregunta.pregunta;
    informacion.innerHTML = pregunta.textoExplicativo;

    route = 'user'
    endpoint = 'comentarios'
    for (const comentario of comentarios) {

        console.log('CREATOR ID:', comentario.idCreator)
        const user = await fetchUserById(endpoint, route, comentario.idCreator)
        console.log('USER INFO:', user)

        console.log('displaying respuesta....')
        let div = document.createElement('div')
        div.className = 'respuesta'

        let model = `
        <div id="contenido">
            <div id="nombreUser">${user.firstName}</div>
            <div id="contenidoRes">${comentario.contenido}</div>
        </div>`
        

        div.innerHTML = model
        containerComentarios.appendChild(div)
    };

}

async function sendComment() {
    route = 'send'
    method = 'POST'
    contenido = input.value
    idCreator;
    let res = await handleComentario(route, seccion, postId, idCreator, contenido, method)
    console.log('sending comment')
    window.location.reload()
}

getPreguntasDetails()
