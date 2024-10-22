
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

function addEventListeners() {
    button.addEventListener('click', sendIntercambio)

    deleteButton.addEventListener('click', askAuthorization)
    accept.addEventListener('click', deleteFile)
    cancel.addEventListener('click', hidePopup)

    dropZone.addEventListener('dragover', dropFile)
    dropZone.addEventListener('drop', getFile)
    dropZone.addEventListener('dragleave', dragLeave);
    
    window.addEventListener('unload', exitPage)
}

addEventListeners()

function checkState(e, file) {
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

async function sendIntercambio() {
    const titulo = document.getElementById('titulo').value
    const informacion = document.getElementById('descripcion').value
    const token = localStorage.getItem('token')

    try {
        formData.append('titulo', titulo)
        formData.append('informacion', informacion)

        let response = await fetch('http://localhost:3000/send-intercambio', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (response.ok) {
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
        console.log('Failed to send intercambio')
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
    button.removeEventListener('click', sendIntercambio)
    deleteButton.removeEventListener('click', askAuthorization)
    accept.removeEventListener('click', deleteFile)
    cancel.removeEventListener('click', hidePopup)
    dropZone.removeEventListener('dragover', dropFile)
    dropZone.removeEventListener('drop', getFile)
    dropZone.removeEventListener('dragleave', dragLeave);
}

function getFile(e) {
    e.preventDefault()
    e.stopPropagation()
    importado = true;
    console.log('Getting the file')
    dropZone.classList.remove('drag-over');
    file = e.dataTransfer.files[0]
    formData.append('foto', file); 
    checkState(e, file)
}

function dragLeave() {
    dropZone.classList.remove('drag-over'); 
}

function dropFile(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('Dropped a file')
    e.dataTransfer.dropEffect = 'copy'; 
    dropZone.classList.add('drag-over');
}

function exitPage() {
    removeEventListeners()
}