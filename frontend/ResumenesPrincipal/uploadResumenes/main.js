let formData = new FormData();
let dropZone = document.getElementById('drop-area');
let publicar = document.getElementById('publish')
let likeDiv = document.getElementById('like')
let dislikeDiv = document.getElementById('dislike')

const deleteButton = document.getElementById('deleteFile')
const fileNameDisplay = document.getElementById('fileName')
const uploadedDiv = document.getElementById('uploadedFile')
const textSpan = document.getElementById('text1')
//------------------------------------------------------//
const askDiv = document.getElementById('authorize')
const accept = document.getElementById('accept')
const cancel = document.getElementById('cancel')

function addEventListeners() {
    deleteButton.addEventListener('click', askAuthorization)
    accept.addEventListener('click', deleteFile)
    cancel.addEventListener('click', hidePopup)
    dropZone.addEventListener('dragover', dropFile)
    dropZone.addEventListener('drop', getFile)
    publicar.addEventListener('click', sendResumenes)
    window.addEventListener('unload', exitPage)
}


let clicks = 0

let like = 0;
let dislike = 0;
let importado = false;
let filtros = ['fisica', 'matematica', 'ingles', 'educacion-judia', 'historia', 'biologia', 'etica', 'economia']
console.log('Running resumenes')

addEventListeners()
filtros.forEach(filtro => {
    const select = document.getElementById('filtro')
    const option = document.createElement('option')
    option.text = filtro

    select.appendChild(option)
});

async function sendResumenes() {

    const titulo = document.getElementById('titulo').value
    const descripcion = document.getElementById('descripcion').value
    const filtros = document.getElementById('filtro').value
    
    formData.append('titulo', titulo)
    formData.append('descripcion', descripcion)
    formData.append('filtros', filtros)
    formData.append('like', like)
    formData.append('dislike', dislike)

    console.log(formData)

    try {
        const token = localStorage.getItem('token');

        let response = fetch('http://localhost:3000/send-resumen', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }) 
    } catch (error) {
        console.log('LPTM')
        console.log(error)
    }
    window.location.reload()
}


function checkState(e, file) {
    console.log('checking state')
    if (importado) {
        textSpan.className = 'hidden'
        dropZone.classList = 'drop-Area whiteBackground'

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

function askAuthorization() {
    askDiv.classList = 'show popup'
}

function hidePopup() {
    askDiv.classList = 'hidden'
}

function getFile(e) {
    e.preventDefault()
    e.stopPropagation()
    importado = true;
    console.log('Getting the file')
    dropZone.classList.remove('drag-over');
    file = e.dataTransfer.files[0]
    formData.append('archivo', file); 
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



function removeEventListeners() {
    deleteButton.removeEventListener('click', askAuthorization)
    accept.removeEventListener('click', deleteFile)
    cancel.removeEventListener('click', hidePopup)
    dropZone.removeEventListener('dragover', dropFile)
    dropZone.removeEventListener('drop', getFile)
    publicar.removeEventListener('click', sendResumenes)
    window.removeEventListener('unload', exitPage)
}

function exitPage() {
    removeEventListeners()
}