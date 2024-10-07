import { popupLogin } from "../controllers/popupController.js";
import { searchByQuery } from "../controllers/searchQueryController.js";
import { divColorFilter } from "../controllers/colorAssigningController.js";

AOS.init();

let publicarRedirect = document.getElementById('publicar')
let loginPopupButton = document.getElementById('loginPopupButton')
let popup = document.getElementById('loginPopup')
let searchInput = document.getElementById('busqueda')
let filtros = document.getElementById('filtros')

publicarRedirect.addEventListener('click', redirectToUploads)
searchInput.addEventListener('input', search)
filtros.addEventListener('input', search)
loginPopupButton.addEventListener('click', ()  => {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value

    popupLogin(gmail, password)
})

async function fetchResumenes() {
    const token = localStorage.getItem('token');

    let response = await fetch('http://localhost:3000/resumen', {
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
            populateResumenes(data)
        }

    } catch (error) {
        console.log('[client] ERROR: Failed to authenticate or fetching data', error);
    }
}

async function populateResumenes(resumenes) {
    const containerResumenes = document.getElementById('containerResumenes')
    const selector = '.resumen'
    cleanContainer(selector)

    for (const resumen of resumenes) { 
        console.log(resumen)
        let { style, dotStyle } = await divColorFilter(resumen.filtros)
        let div = document.createElement('div')
        let modelResumen = 
        `<p class="text" id="nombreResumen">${resumen.titulo}</p>
        <div class="text" id="info">
            <div class='${style}'>${resumen.filtros}<div class='${dotStyle}'></div></div>

            <div class="recomendacion" id="likes">
                <img src="/frontend/img/Like.svg" class="thumbs" alt="">
                <p id="numeroLikes">33</p>
            </div>
            <div class="recomendacion" id="dislikes">
                <img src="/frontend/img/Dislike.svg" class="thumbs" alt="">
                <p id="numeroDislikes">33</p>
            </div>

        </div>` 
        div.className = 'resumen'
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = modelResumen

        div.addEventListener('click', () => {
            redirectToDetailsPage(resumen.id)
        })
        

        containerResumenes.appendChild(div)
    };
    containerResumenes.className = 'recipienteResumen'
}

function redirectToDetailsPage(id) {
    window.location.href = `visualizacionResumenes/index.html?id=${id}`;
}

function redirectToUploads() {
    window.location.href = 'uploadResumenes/index.html'
}

function cleanContainer(selector) {
    console.log('Cleaning container with id:', selector)
    const container = document.getElementById('containerResumenes')
    const elements = container.querySelectorAll(selector)
    elements.forEach(element => element.remove())
}

async function search() {
    const endpoint = 'resumen'
    const route = 'search'

    const query = searchInput.value
    const filtro = filtros.value

    const resultados = await searchByQuery(endpoint, route, query, filtro)

    populateResumenes(resultados)
}

fetchResumenes()

