import { getQueryParams } from "../../controllers/queryParamsController.js";
import { fetchUserById } from "../../controllers/fetchUserController.js";
import { fetchBlob } from "../../controllers/blobController.js";
import { tryDeletePost } from "../../controllers/deletePostController.js";
import { debounce } from "../../controllers/auxiliares.js";
import { checkUserAuthorization } from "../../controllers/userAuthorization.js";

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js'

console.log('Running resumen visualizacion')

const endpoint = 'resumen'
let route = 'user'
const model = 'resumen'
let format;


let ID = await getQueryParams()
let zoomLevel = 3;
const url = await fetchBlob(model, ID)

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const container = document.getElementById('imgContainer');
const body = document.getElementById('masterContainer')
const messageDisplay = document.getElementById('messageDisplay')

const downloadButton = document.getElementById('download')
const nextButton = document.getElementById('nextPage')
const prevButton = document.getElementById('prevPage')
const deleteButton = document.getElementById('deletePost')

const askDiv = document.getElementById('authorize')
const accept = document.getElementById('accept')
const cancel = document.getElementById('cancel')


let currentPage = 1;
let pdfDoc = null;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - canvas.offsetLeft;
    startY = e.pageY - canvas.offsetTop;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
});

function addEventListeners() {
    downloadButton.addEventListener('click', fetchFile)
    window.addEventListener('beforeunload', exitPage);

    container.addEventListener('mouseleave', dragleave);
    container.addEventListener('mouseup', dragleave);
    container.addEventListener('mousemove', varyPosition);

    deleteButton.addEventListener('click', askAuthorization)
    accept.addEventListener('click', displayMessage)
    cancel.addEventListener('click', hidePopup)

    prevButton.addEventListener('click', prevPage)
    nextButton.addEventListener('click', nextPage)

}
addEventListeners()


function dragleave() {
    isDragging = false;
}

function varyPosition(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const walkX = (x - startX) * 1; 
    const walkY = (y - startY) * 1; 
    container.scrollLeft = scrollLeft - walkX;
    container.scrollTop = scrollTop - walkY;
}

const debouncedExitPage = debounce(function exit() {
    window.location.href = '../index.html'
}, 2150)

async function getResumenesDetails() {
    console.log('Getting resumen info')
    const token = localStorage.getItem('token')
    try {

        const response = await fetch(`http://localhost:3000/resumen/visualizar?id=${ID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {

            console.log('Got the resumen info')
            const data = await response.json()

            format = data.format
            console.log('Received data: ', data)
            displayResumen(data)
        } 

    } catch (error) {
        console.log('Failed to get the resumen info:', error)
    }
}

async function fetchFile() {
    try {
        const link = document.createElement('a');
        link.href = url
        link.download = `download.${format}`;
        document.body.appendChild(link);
        link.click();
        
        removeEventListeners();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); 
    } catch (error) {
        console.error('[client] ERROR, Failed to fetch the file:', error)
    }
}

async function displayResumen(resumen) {
    const informacion = document.getElementById('descripcion')
    const titulo = document.getElementById('title')
    const filtro = document.getElementById('filtro')
    const userName = document.getElementById('nombreUser')

    const userCreator = await fetchUserById(endpoint, route, resumen.userId)
    const authorized = await checkUserAuthorization(model, resumen.id)

    console.log(userCreator)

    if (authorized == true) {
        console.log('Authorized:', authorized)
        giveAccess()
    } else {
        console.log('Unauthorized')
        console.log(authorized)
    }

    filtro.innerText = resumen.filtros
    userName.innerText = userCreator.firstName + ' ' + userCreator.lastName
    titulo.innerText = resumen.titulo
    informacion.innerText = resumen.descripcion
};

function giveAccess() {
    deleteButton.classList.remove('hidden')
    deleteButton.classList.remove('no-events')
}

async function loadPdf(url) {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDoc = await loadingTask.promise;
    renderPage(currentPage);
}

async function renderPage(pageNum) {
    const page = await pdfDoc.getPage(pageNum)
    const viewport = page.getViewport({ scale: zoomLevel })

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };

    await page.render(renderContext).promise;
}


canvas.addEventListener('wheel', (e) => {
    e.preventDefault(); 
    const zoomAmount = 0.05; 

    if (e.deltaY < 0) {
        zoomLevel += zoomAmount; 
    } else {
        zoomLevel = Math.max(1.0, zoomLevel - zoomAmount); 
    }
    applyZoom(zoomLevel); 
});

function applyZoom(scale) {
    canvas.style.transform = `scale(${scale})`;
}

function exitPage() {
    removeEventListeners()
}

getResumenesDetails()

await loadPdf(url)




function nextPage() {
    if (currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
}




function askAuthorization() {
    askDiv.classList = 'show popup'
    body.classList = 'blur-effect'
}

async function displayMessage() {
    body.classList = 'blur-effect'
    askDiv.classList = 'hidden'
    messageDisplay.classList.add("appear")
    await deletePost()
    debouncedExitPage()
}


function hidePopup() {
    askDiv.classList = 'hidden'
    body.classList = ''
}

async function deletePost() {
    route = 'delete'
    const deletion = await tryDeletePost(endpoint, route, ID)
}



function removeEventListeners() {
    downloadButton.removeEventListener('click', fetchFile)
    window.removeEventListener('beforeunload', exitPage);

    container.removeEventListener('mouseleave', dragleave);
    container.removeEventListener('mouseup', dragleave);
    container.removeEventListener('mousemove', varyPosition);

    deleteButton.removeEventListener('click', askAuthorization)
    accept.removeEventListener('click', deletePost)
    cancel.removeEventListener('click', hidePopup)

}

