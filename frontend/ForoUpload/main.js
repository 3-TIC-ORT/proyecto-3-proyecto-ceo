let formData = new FormData();
let dropZone = document.getElementById('drop-area');
let publicar = document.getElementById('publish')

dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; 
})

dropZone.addEventListener('drop', function(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('Getting the file')
    file = e.dataTransfer.files[0]
    formData.append('foto', file); 
})

publicar.addEventListener('click', sendForos)

async function sendForos() {
    const pregunta = document.getElementById('pregunta').value
    const textoExplicativo = document.getElementById('textoExplicativo').value
    
    formData.append('pregunta', pregunta)
    formData.append('textoExplicativo', textoExplicativo)

    console.log(formData)

    try {
        let response = fetch('http://localhost:3000/send-foro', {
            method: 'POST',
            body: formData
        }) 
    } catch (error) {
        console.log('LPTM')
        console.log(error)
    }
}