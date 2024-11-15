AOS.init();


let publicarRedirect = document.getElementById('publicar')
let loginPopupButton = document.getElementById('loginPopupButton')
let popup = document.getElementById('loginPopup')
let searchBar = document.getElementById('busqueda')

import { popupLogin } from '../controllers/popupController.js'
import { searchByQuery } from '../controllers/searchQueryController.js';
import { displayInvalidMessage, isLogged, debounce } from '../controllers/auxiliares.js';

publicarRedirect.addEventListener('click', redirectToUploads)
searchBar.addEventListener('input', search)

const loggedUser = document.getElementById('loggedUser');
const registrarDiv = document.getElementById('login');
isLogged(loggedUser, registrarDiv);

const debouncedPopup = debounce(function removePopup() {
    popup.classList.remove('show');
    popup.classList.show('hidden');
},550)

const debouncedDisplayPopup = debounce(function showPopup() {
    popup.classList.add('appear');
    popup.classList.remove('hidden');

},1000)

loginPopupButton.addEventListener('click', async ()  => {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value
    let login = await popupLogin(gmail, password);

    if (login) {
        console.log('[POPUP] Success!')
        debouncedPopup()
        await fetchForos()
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
})

function redirectToUploads() {
    window.location.href = 'ForoUpload/index.html'
}

function redirectToDetailsPage(id) {
    window.location.href = `ForoVisualizacion/index.html?id=${id}`;
}

function cleanContainer(selector) {
    console.log('Cleaning container with id:', selector)
    const container = document.getElementById('containerForos')
    const elements = container.querySelectorAll(selector)
    elements.forEach(element => element.remove())
}

async function fetchForos() {
    const token = localStorage.getItem('token');

    let response = await fetch('http://localhost:3000/foros', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        console.log('Displaying popup')
        popup.classList.remove('hidden')
        popup.classList.add('show')

        publicarRedirect.classList.remove('show');
        publicarRedirect.classList.add('hidden')
    }

    try {

        if (response.ok) {
            console.log('Getting data');
            const data = await response.json();
            console.log(data);
            populateForos(data)
        }

    } catch (error) {
        console.log('[client] ERROR: Failed to authenticate or fetching data', error);
    }
}

function populateForos(foros) {
    const containerPreguntas = document.getElementById('containerForos')
    const selector = '.pregunta'
    cleanContainer(selector)
    
    foros.forEach(pregunta => {
        console.log(pregunta)
        let div = document.createElement('div')
        let modelPregunta = `<p class="text" id="nombrePregunta">${pregunta.pregunta}</p>`

        div.addEventListener('click', () => {
            redirectToDetailsPage(pregunta.id)
        })

        div.className = 'pregunta'
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = modelPregunta
        containerPreguntas.appendChild(div)
    });
    containerPreguntas.className = 'recipienteForos'
}


async function search() {
    const endpoint = 'foros'
    const route = 'search'
    const query = searchBar.value

    const resultados = await searchByQuery(endpoint, route, query)
    populateForos(resultados)
}

fetchForos()