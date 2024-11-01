import { getDetails } from "../../controllers/getDetailsController.js";
import { fetchUserById } from '../../controllers/fetchUserController.js'
import { tryDeletePost } from '../../controllers/deletePostController.js'
import { handleComentario } from "../../controllers/comentarioController.js";

const endpoint = 'intercambios'
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
deleteButton.addEventListener('click', askAuthorization)
accept.addEventListener('click', deletePost)
cancel.addEventListener('click', hidePopup)

let ID;
let userID;
const model = 'intercambio'

async function displayObjeto() {
    let descripcion = document.getElementById('descripcion')
    let tituloObj = document.getElementById('title')
    
    const img = document.createElement('img')

    try {
        const intercambio = await getDetails(endpoint, route)
        console.log(intercambio)
        route = 'user'
        const user = await fetchUserById(endpoint, route, intercambio.userId)
        if (!intercambio) {
            console.log('[intercambio] ERROR, no data received')
        } 

        userID = user.id
        
        gmailUser.innerHTML = user.gmail
        nombreUser.innerHTML = user.firstName + ' ' +  user.lastName
        descripcion.innerHTML = intercambio.informacion
        tituloObj.innerHTML = intercambio.titulo.toUpperCase();

        const fetchImg = async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/image/${id}/${model}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Failed to fetch image at:', intercambio);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching:', error);
                return null;
            }
        };

        const url = await fetchImg(intercambio.id)
        ID = intercambio.id
        const mimeType = intercambio.foto_format

        img.src = url
        img.type = mimeType;
        img.className = 'img'

        previsualizacion.appendChild(img)
    } catch (error) {
        console.log('[intercambios] ERROR, failed at getting details:', error)
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
    window.location.href = '../index.html';
}

displayObjeto()