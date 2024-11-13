import { debouncedExitPage } from "../../controllers/auxiliares.js";
import { displayInvalidMessage } from "../../controllers/auxiliares.js";

let formData = new FormData();
let button = document.getElementById('publish')
const dropZone = document.getElementById('drop-area')
const textSpan = document.getElementById('text1')
const deleteButton = document.getElementById('deleteFile')
const fileNameDisplay = document.getElementById('fileName')
const uploadedDiv = document.getElementById('uploadedFile')
//------------------------------------------------------//
const askDiv = document.getElementById('authorize')
const accept = document.getElementById('accept')
const cancel = document.getElementById('cancel')

const body = document.getElementById('body')

let importado;
let file;

function addEventListeners() {
    button.addEventListener('click', displayMessage)

    deleteButton.addEventListener('click', askAuthorization)
    accept.addEventListener('click', deleteFile)
    cancel.addEventListener('click', hidePopup)

    dropZone.addEventListener('dragover', dropFile)
    dropZone.addEventListener('drop', getFile)
    dropZone.addEventListener('dragleave', dragLeave);
    
    window.addEventListener('unload', exitPage)
}

addEventListeners()

function checkState(file) {
    console.log('checking state')
    if (importado) {
        textSpan.className = 'hidden'
        dropZone.classList = 'whiteBackground'

        uploadedDiv.classList = 'show align'
        fileNameDisplay.innerHTML = file.name
    }
}

function deleteFile() {
    formData.delete('archivo')
    file = null
    textSpan.className = 'show';
    dropZone.className = 'drop-Area'

    uploadedDiv.classList = 'hidden'
    fileNameDisplay.innerHTML = '';
    importado = false; 
    window.location.reload()
}

async function sendObjeto() {
    const titulo = document.getElementById('titulo').value
    const informacion = document.getElementById('descripcion').value
    const token = localStorage.getItem('token')

    try {
        formData.append('titulo', titulo)
        formData.append('informacion', informacion)

        let response = await fetch('http://localhost:3000/send-objetos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (response.ok) {
            console.log('Sucess!')
        }
    } catch (error) {
        console.log(error)
        console.log('Failed to send objeto')
    }
}

function askAuthorization() {
    askDiv.classList = 'show popup'
    body.classList = 'recipiente blur-effect'
}

function hidePopup() {
    askDiv.classList = 'hidden'
    body.classList = 'recipiente'
}

function removeEventListeners() {
    button.removeEventListener('click', displayMessage)

    deleteButton.removeEventListener('click', askAuthorization)
    accept.removeEventListener('click', deleteFile)
    cancel.removeEventListener('click', hidePopup)

    dropZone.removeEventListener('dragover', dropFile)
    dropZone.removeEventListener('drop', getFile)
    dropZone.removeEventListener('dragleave', dragLeave);

    window.removeEventListener('unload', exitPage)
}

function getFile(e) {
    e.preventDefault()
    e.stopPropagation()
    importado = true;
    console.log('Getting the file')
    dropZone.classList.remove('drag-over');
    file = e.dataTransfer.files[0]
    formData.append('foto', file); 
    checkState(file);
}

function dragLeave() {
    dropZone.classList.remove('drag-over'); 
}

function dropFile(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; 
    dropZone.classList.add('drag-over');
}

async function displayMessage() {
    const messageDisplay = document.getElementById('messageDisplay')
    const messageText = document.getElementById('message')

    const titulo = document.getElementById('titulo').value
    const informacion = document.getElementById('descripcion').value
    let text = 'Porfavor llene todos los campos.'

    if (!titulo || !informacion) {
        displayInvalidMessage(messageDisplay, messageText, text)
        return;
    }

    if (!file) {
        text = 'Porfavor añada una foto.'
        displayInvalidMessage(messageDisplay, messageText, text)
        return;
    }

    await sendObjeto()
    messageText.classList.remove('blackText')
    messageText.classList.add('greenText')
    messageText.innerHTML = 'Publicado exitosamente!';
    body.classList.add('blur-effect')
    askDiv.classList = 'hidden'
    messageDisplay.classList.add('appear')
    removeEventListeners()
    debouncedExitPage()
}


function exitPage() {
    removeEventListeners()
}