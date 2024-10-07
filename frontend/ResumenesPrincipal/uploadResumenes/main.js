let formData = new FormData();
let dropZone = document.getElementById('drop-area');
let publicar = document.getElementById('publish')
let likeDiv = document.getElementById('like')
let dislikeDiv = document.getElementById('dislike')

const deleteButton = document.getElementById('deleteFile')
const fileNameDisplay = document.getElementById('fileName')
const uploadedDiv = document.getElementById('uploadedFile')
const textSpan = document.getElementById('text1')

let clicks = 0

let like = 0;
let dislike = 0;
let importado = false;
let filtros = ['fisica', 'matematica', 'ingles', 'educacion-judia', 'historia', 'biologia', 'etica', 'economia']
console.log('Running resumenes')

filtros.forEach(filtro => {
    const select = document.getElementById('filtro')
    const option = document.createElement('option')
    option.text = filtro

    select.appendChild(option)
});

dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; 
})

dropZone.addEventListener('drop', function(e) {
    e.preventDefault()
    e.stopPropagation()
    importado = true;
    console.log('Getting the file')
    file = e.dataTransfer.files[0]
    formData.append('archivo', file); 
    switchState(e, file)
})

publicar.addEventListener('click', sendResumenes)

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
}


function switchState(e, file) {
    console.log('checking state')
    if (importado) {
        textSpan.className = 'hidden'
        dropZone.classList = 'drop-Area whiteBackground'

        uploadedDiv.classList = 'show align'
        fileNameDisplay.innerHTML = 'hola'
    }
}
