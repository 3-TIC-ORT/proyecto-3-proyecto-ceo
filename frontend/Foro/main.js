AOS.init();


let publicarRedirect = document.getElementById('publicar')
let loginPopupButton = document.getElementById('loginPopupButton')
let popup = document.getElementById('loginPopup')

import { popupLogin } from '../controllers/popupController.js'

publicarRedirect.addEventListener('click', redirectToUploads)

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
    window.location.href = '../ForoUpload/index.html'
}

function redirectToDetailsPage(id) {
    window.location.href = `../ForoVisualizacion/index.html?id=${id}`;
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

fetchForos()