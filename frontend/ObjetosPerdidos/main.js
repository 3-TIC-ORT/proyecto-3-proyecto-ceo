
AOS.init()

import { popupLogin } from "../controllers/popupController.js"

const uploadButton = document.getElementById('publicar')
const popup = document.getElementById('loginPopup')
const loginPopupButton = document.getElementById('loginPopupButton')

loginPopupButton.addEventListener('click', ()  => {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value

    popupLogin(gmail, password)
})

uploadButton.addEventListener('click', redirectToUploads)

console.log('running objetos')
async function fetchObjetos() {
    const token = localStorage.getItem('token')

    try {  
        let response = await fetch(`http://localhost:3000/objetos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            console.log('Failed')
            popup.classList.remove('hidden')
            popup.classList.add('show')
            
            publicarRedirect.classList.remove('show');
            publicarRedirect.classList.add('hidden')

        
        }

        const data = await response.json();

        populateObjetos(data)
    } catch (error) {
        console.log(error)
        console.log('Failed to fetch OBJETOS')
    }
}

async function populateObjetos(objetos) {
    const recipienteObjetos = document.getElementById('recipiente')

    for (const objeto of objetos) {
        console.log('Adding objeto')
        const mimeType = objeto.foto_format

        const fetchImg = async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/image/${id}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Failed to fetch image at:', objeto);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching:', error);
                return null;
            }
        };

        const url = await fetchImg(objeto.id)
        console.log('URL CREATED:', url)
        console.log(objeto.foto_format)
        console.log(objeto)

        const modelObjeto = document.createElement('p');
        modelObjeto.id = 'titulo';
        modelObjeto.textContent = objeto.titulo;
    
        const div = document.createElement('div')

        div.addEventListener('click', () => {
            redirectToDetailsPage(objeto.id)
            URL.revokeObjectURL(url);
        })

        div.className = 'objeto'
        div.setAttribute('data-aos', 'fade-up');

        const img = document.createElement('img');
        img.src = url;
        img.type = mimeType;
        img.className = 'img'

        div.appendChild(img);
        div.appendChild(modelObjeto);
        recipienteObjetos.appendChild(div)
    };
}

function redirectToDetailsPage(id) {
    window.location.href = `ObjetosPerdidosVisualizacion/index.html?id=${id}`
}

function redirectToUploads() {
    window.location.href = 'ObjUpload/index.html'
}

fetchObjetos()