
let formData = new FormData();
let button = document.getElementById('publish')
const dropZone = document.getElementById('dropArea')

button.addEventListener('click', sendObjeto)

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


async function sendObjeto() {
    const titulo = document.getElementById('titulo').value
    const informacion = document.getElementById('informacion').value
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
            window.location.reload()
        }
    } catch (error) {
        console.log(error)
        console.log('Failed to send objeto')
    }
}