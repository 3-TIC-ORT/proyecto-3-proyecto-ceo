
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

const model = 'intercambio'
uploadButton.addEventListener('click', redirectToUploads)

console.log('running objetos')
async function fetchObjetos() {
    const token = localStorage.getItem('token')

    try {  
        let response = await fetch(`http://localhost:3000/intercambios`, {
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

        populateIntercambios(data)
    } catch (error) {
        console.log(error)
        console.log('Failed to fetch INTERCAMBIOS')
    }
}

async function populateIntercambios(intercambios) {
    const recipienteIntercambios = document.getElementById('recipiente')

    for (const intercambio of intercambios) {
        console.log('Adding intercambio')
        const mimeType = intercambio.foto_format

        const fetchImg = async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/image/${id}/${model}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Failed to fetch image at:', intercambio);
                    return null; 
                }
            } catch (error) {
                console.error('Error fetching:', error);
                return null;
            }
        };

        const url = await fetchImg(intercambio.id)
        console.log('URL CREATED:', url)
        console.log(intercambio.foto_format)
        console.log(intercambio)

        const modelIntercambio = document.createElement('p');
        modelIntercambio.id = 'titulo';
        modelIntercambio.textContent = intercambio.titulo;
    
        const div = document.createElement('div')
        div.addEventListener('click', () => {
            redirectToDetailsPage(intercambio.id)
            URL.revokeObjectURL(url);
        })

        div.className = 'objeto'
        div.setAttribute('data-aos', 'fade-up');

        const img = document.createElement('img');
        img.src = url;
        img.type = mimeType;
        img.className = 'img'

        div.appendChild(img);
        div.appendChild(modelIntercambio);
        recipienteIntercambios.appendChild(div)
    };
}

function redirectToDetailsPage(id) {
    window.location.href = `visualizacion/index.html?id=${id}`
    URL.revokeObjectURL();
}

function redirectToUploads() {
    window.location.href = 'upload/index.html'
    URL.revokeObjectURL();
}

fetchObjetos()