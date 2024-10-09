import { getDetails } from "../../controllers/getDetailsController.js";
import { findUserById } from "../../controllers/userIdFinderController.js";
const endpoint = 'objetos'
const route = 'visualizar'


async function displayObjeto() {
    let gmail = document.getElementById('gmail')
    let nombre = document.getElementById('nombreUser')
    let descripcion = document.getElementById('descripcion')

    try {
        const objeto = await getDetails(endpoint, route)
        const user = await findUserById(objeto.id)
        if (!objeto) {
            console.log('[objetos] ERROR, no data received')
        } 
        gmail.innerHTML = user.gmail
        nombre.innerHTML = user.firstName
        descripcion.innerHTML = objeto.informacion

    } catch (error) {
        console.log('[objetos] ERROR, failed at getting details:', error)
    }

}

displayObjeto()