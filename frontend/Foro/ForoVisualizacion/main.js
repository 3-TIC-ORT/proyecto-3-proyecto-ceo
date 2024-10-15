

import { handleComentario } from "../../controllers/comentarioController.js";
import { fetchUserById } from "../../controllers/fetchUserController.js";
import { getQueryParams } from "../../controllers/queryParamsController.js";

console.log('Running preguntas visualizacion')
const sendButton = document.getElementById('send')
const input = document.getElementById('input')
let seccion = 'foros'
let postId;
let route;
let method;
let contenido;
let idCreator;


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
            method = 'GET'
            route = 'get'
            contenido = ''
            postId = data.id;
            const comentarios = await handleComentario(route, seccion, postId, contenido, method )

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

    for (const comentario in comentarios) {
        const user = await fetchUserById(comentario.idCreator)
        let model = `
        <div class="respuesta">
            <div id="contenido">
                <div id="nombreUser">${user.firstName}</div>
                <div id="contenidoRes">${comentario.contenido}</div>
            </div>
        </div>`

        containerComentarios.appendChild(model)
    };

}

async function sendComment() {
    route = 'send'
    method = 'POST'
    contenido = input.value
    idCreator;
    let res = await handleComentario(route, seccion, postId, idCreator, contenido, method)
    console.log('sending comment')
}

getPreguntasDetails()
