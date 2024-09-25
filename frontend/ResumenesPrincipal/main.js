AOS.init();

let publicarRedirect = document.getElementById('publicar')
let loginPopupButton = document.getElementById('loginPopupButton')
let popup = document.getElementById('loginPopup')


publicarRedirect.addEventListener('click', redirectToUploads)
loginPopupButton.addEventListener('click', popupLogin )


function redirectToUploads() {
    window.location.href = '../ResumenesUpload/index.html'
}

async function popupLogin() {
    let gmail = document.getElementById('gmail').value
    let password = document.getElementById('password').value

    console.log('Login through the popup-')
    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gmail: gmail,
            password: password
        })
    })

    if (response.ok) {
        let data = await response.json() 
        localStorage.setItem('token', data.token)
        fetchResumenes()
        popup.classList.remove('show');
        popup.classList.add('hidden');

        publicarRedirect.classList.remove('hidden');
        publicarRedirect.classList.add('show')
    }
}

async function fetchResumenes() {
    const token = localStorage.getItem('token');

    let response = await fetch('http://localhost:3000/resumen', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        console.log('Displaying popup')
        popup.classList.remove('hidden')
        popup.classList.add('show')

        publicarRedirect.classList.remove('show');
        publicarRedirect.classList.add('hidden')
    }

    try {

        if (response.ok) {
            console.log('Getting data');
            const data = await response.json();
            console.log(data);
            populateResumenes(data)
        }

    } catch (error) {
        console.log('[client] ERROR: Failed to authenticate or fetching data', error);
    }
}

function populateResumenes(resumenes) {
    const containerResumenes = document.getElementById('containerResumenes')
    resumenes.forEach(resumen => {
        console.log(resumen)
        let div = document.createElement('div')
        let modelResumen = 
        `<p class="text" id="nombreResumen">${resumen.titulo}</p>
        <div class="text" id="info">
            <p>Tema: ${resumen.filtros} </p>

            <div class="recomendacion" id="likes">
                <img src="/frontend/img/Like.svg" class="thumbs" alt="">
                <p id="numeroLikes">33</p>
            </div>
            <div class="recomendacion" id="dislikes">
                <img src="/frontend/img/Dislike.svg" class="thumbs" alt="">
                <p id="numeroDislikes">33</p>
            </div>

        </div>` 
        div.className = 'resumen'
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = modelResumen
        containerResumenes.appendChild(div)
    });
    containerResumenes.className = 'recipienteResumen'
}

fetchResumenes()