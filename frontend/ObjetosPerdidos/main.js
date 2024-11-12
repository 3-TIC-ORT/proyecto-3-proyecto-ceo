
AOS.init()

import { popupLogin } from "../controllers/popupController.js"
import { isLogged, debounce, displayInvalidMessage } from "../controllers/auxiliares.js"

const uploadButton = document.getElementById('publicar')
const popup = document.getElementById('loginPopup')
const loginPopupButton = document.getElementById('loginPopupButton');


const loggedUser = document.getElementById('loggedUser')
const registrarDiv = document.getElementById('login')
isLogged(loggedUser, registrarDiv)

const debouncedDisplayPopup = debounce(function showPopup() {
    popup.classList.add('appear');
    popup.classList.remove('hidden');

},1000)

const debouncedPopup = debounce(function removePopup() {
    popup.classList.remove('show');
    popup.classList.show('hidden');
},550)

const model = 'objeto'

function addListeners() {
    loginPopupButton.addEventListener('click', log)
    uploadButton.addEventListener('click', redirectToUploads)
    window.addEventListener('beforeunload', exitPage);
}

addListeners()

async function fetchObjetos() {
    const token = localStorage.getItem('token')

    try {  
        let response = await fetch(`http://localhost:3000/objetos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            console.log('Failed')
            popup.classList.remove('hidden')
            popup.classList.add('show')
            
            uploadButton.classList.remove('show');
            uploadButton.classList.add('hidden')

        }

        const data = await response.json();
        clearObjetos();
        populateObjetos(data); 
    } catch (error) {
        console.log('Failed to fetch OBJETOS:', error);
    }
}

function clearObjetos() {
    const recipienteObjetos = document.getElementById('recipiente');
    recipienteObjetos.innerHTML = ''; 
    killUrls(); 
}


async function populateObjetos(objetos) {
    const recipienteObjetos = document.getElementById('recipiente')

    for (const objeto of objetos) {
        console.log('Adding objeto')
        const mimeType = objeto.foto_format

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
        console.log('URL CREATED:', url)
        console.log(objeto.foto_format)
        console.log(objeto)

        const modelObjeto = document.createElement('p');
        modelObjeto.id = 'titulo';
        modelObjeto.textContent = objeto.titulo;
    
        const div = document.createElement('div')

        div.addEventListener('click', () => {
            URL.revokeObjectURL(url);
            redirectToDetailsPage(objeto.id)
        })

        div.className = 'objeto'
        div.setAttribute('data-aos', 'fade-up');

        const img = document.createElement('img');
        img.src = url;
        img.type = mimeType;
        img.className = 'img'

        div.appendChild(img);
        div.appendChild(modelObjeto);
        recipienteObjetos.appendChild(div)
    };
}

async function killUrls() {
    const images = document.querySelectorAll('.img')

    images.forEach(image => {
        console.log('Removing url')
        URL.revokeObjectURL(image.src);
    });
}

function redirectToDetailsPage(id) {
    window.location.href = `ObjVisualizacion/index.html?id=${id}`
    killUrls()
    removeListeners()
}

function redirectToUploads() {
    window.location.href = 'ObjUpload/index.html'
    killUrls()
    removeListeners()
}


function removeListeners() {
    loginPopupButton.removeEventListener('click', log)
    uploadButton.removeEventListener('click', redirectToUploads)
    window.removeEventListener('beforeunload', exitPage);
}

async function log() {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value
    let login = await popupLogin(gmail, password);

    if (login) {
        console.log('[POPUP] Success!')
        debouncedPopup()
        await fetchObjetos()
    } else {
        const messageDisplay = document.getElementById('messageDisplay')
        const messageText = document.getElementById('message')
        let text = 'No se pudo iniciar sesion..'
        console.warn('No se pudo iniciar sesion')
        popup.classList.remove('show');
        popup.classList.add('hidden');
        displayInvalidMessage(messageDisplay, messageText, text)
        debouncedDisplayPopup()
    }

}

function exitPage() {
    killUrls()
    removeListeners()
}

fetchObjetos()