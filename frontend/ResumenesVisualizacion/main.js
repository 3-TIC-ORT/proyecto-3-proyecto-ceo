import { getQueryParams } from "../controllers/detailsPageController.js";

console.log('Running resumen visualizacion')

async function getResumenesDetails() {
    console.log('Getting resumen info')
    const token = localStorage.getItem('token')

    const id = await getQueryParams()
    try {

        const response = await fetch(`http://localhost:3000/resumen/visualizar?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    
        if (response.ok) {

            console.log('Got the resumen info')
            const data = await response.json()

            console.log('Received data: ', data)
            displayResumen(data)
        } 

    } catch (error) {
        console.log('Failed to get the resumen info:', error)
    }
}

async function displayResumen(resumen) {
    const informacion = document.getElementById('informacion')
    const titulo = document.getElementById('titulo')

    titulo.innerText = resumen.titulo
    informacion.innerText = resumen.descripcion

}

getResumenesDetails()

