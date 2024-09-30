
let formData = new FormData();
let button = document.getElementById('publish')

button.addEventListener('click', sendObjeto)

async function sendObjeto() {
    const titulo = document.getElementById('titulo').value
    const informacion = document.getElementById('informacion').value

    try {
        formData.append('titulo', titulo)
        formData.append('informacion', informacion)

        let response = await fetch('http://localhost:3000/send-objetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: formData
        })

    } catch (error) {
        
    }
}