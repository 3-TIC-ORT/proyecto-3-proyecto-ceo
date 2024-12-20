import { getDetails } from "../../controllers/getDetailsController.js";
import { fetchUserById } from '../../controllers/fetchUserController.js'
import { tryDeletePost } from '../../controllers/deletePostController.js'
import { handleComentario } from "../../controllers/comentarioController.js";
import { debouncedExitPage } from "../../controllers/auxiliares.js";
import { checkUserAuthorization } from "../../controllers/userAuthorization.js";

const endpoint = 'objetos'
let route = 'visualizar'
//---------------------------------------------------------------//
let gmailUser = document.getElementById('gmailUser')
let nombreUser = document.getElementById('nombreUser')
let nombre = document.getElementById('nombre')
let contacto = document.getElementById('contacto')
//---------------------------------------------------------------//
const previsualizacion = document.getElementById('imgContainer')
const deleteButton = document.getElementById('deletePost')
const body = document.getElementById('masterContainer')
const askDiv = document.getElementById('authorize')
const accept = document.getElementById('accept')
const cancel = document.getElementById('cancel')
//---------------------------------------------------------------//
function addEventListeners() {
    deleteButton.addEventListener('click', askAuthorization)
    accept.addEventListener('click', displayMessage)
    cancel.addEventListener('click', hidePopup)

    window.addEventListener('unload', removeEventListeners)
}

addEventListeners()

let ID;
let userID;
const model = 'objeto'

async function displayObjeto() {
    let descripcion = document.getElementById('descripcion')
    let tituloObj = document.getElementById('title')
    
    const img = document.createElement('img')

    try {
        const objeto = await getDetails(endpoint, route)
        console.log(objeto)
        route = 'user'
        const user = await fetchUserById(endpoint, route, objeto.userId)
        if (!objeto) {
            console.log('[objetos] ERROR, no data received')
        } 

        userID = user.id
        
        gmailUser.innerHTML = user.gmail
        nombreUser.innerHTML = user.firstName + ' ' +  user.lastName
        descripcion.innerHTML = objeto.informacion
        tituloObj.innerHTML = objeto.titulo.toUpperCase();

        const fetchImg = async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/image/${id}/${model}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Failed to fetch image at:', objeto);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching:', error);
                return null;
            }
        };

        const url = await fetchImg(objeto.id)
        
        ID = objeto.id
        const mimeType = objeto.foto_format

        img.src = url
        img.type = mimeType;
        img.className = 'img'

        previsualizacion.appendChild(img)

        const authorized = await checkUserAuthorization(model, objeto.id)

        if (authorized == true) {
            console.log('Authorized:', authorized)
            giveAccess()
        } else {
            console.log('Unauthorized')
            console.log(authorized)
        }

    } catch (error) {
        console.log('[objetos] ERROR, failed at getting details:', error)
    }

}

function askAuthorization() {
    askDiv.classList = 'show popup blur-effect'
    body.classList = 'body blur-effect'
}

function hidePopup() {
    askDiv.classList = 'hidden'
    body.classList = 'body'
}

async function deletePost() {
    route = 'delete'
    const deletion = await tryDeletePost(endpoint, route, ID)
}

async function displayMessage() {
    body.classList.add('blur-effect')
    askDiv.classList = 'hidden'
    messageDisplay.classList.add("appear")
    removeEventListeners()
    await deletePost()
    debouncedExitPage()
}

function giveAccess() {
    deleteButton.classList.remove('hidden')
    deleteButton.classList.remove('no-events')
}


function removeEventListeners() {
    deleteButton.removeEventListener('click', askAuthorization);
    accept.removeEventListener('click', displayMessage);
    cancel.removeEventListener('click', hidePopup);

    window.removeEventListener('unload', removeEventListeners)
}

displayObjeto()