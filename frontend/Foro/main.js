AOS.init();


let publicarRedirect = document.getElementById('publicar')
let loginPopupButton = document.getElementById('loginPopupButton')
let popup = document.getElementById('loginPopup')
let searchBar = document.getElementById('busqueda')

import { popupLogin } from '../controllers/popupController.js'
import { searchByQuery } from '../controllers/searchQueryController.js';

publicarRedirect.addEventListener('click', redirectToUploads)
searchBar.addEventListener('input', search)

loginPopupButton.addEventListener('click', ()  => {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value

    if (popupLogin(gmail, password)) {
        console.log('[POPUP] Success!')
        popup.classList.remove('show');
        popup.classList.add('hidden');

        publicarRedirect.classList.remove('hidden');
        publicarRedirect.classList.add('show')

        fetchForos()
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