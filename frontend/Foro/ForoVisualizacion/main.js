
import { getQueryParams } from "../../controllers/detailsPageController.js";
console.log('Running preguntas visualizacion')

async function getPreguntasDetails() {
    console.log('Getting preguntas info')
    const token = localStorage.getItem('token')

    const id = await getQueryParams()

    try {

        const response = await fetch(`http://localhost:3000/foros/open?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    
        if (response.ok) {

            console.log('Got the pregunta info')
            const data = await response.json()

            console.log('Received data: ', data)
            displayPregunta(data)
        } 

    } catch (error) {
        console.log('Failed to get the resumen info:', error)
    }
}


async function displayPregunta(pregunta) {
    const informacion = document.getElementById('informacion')
    const titulo = document.getElementById('titulo')

    titulo.innerText = pregunta.titulo
    informacion.innerText = pregunta.descripcion

}

getPreguntasDetails()