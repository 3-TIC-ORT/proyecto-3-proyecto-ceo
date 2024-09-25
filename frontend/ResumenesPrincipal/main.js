
async function fetchResumenes() {
    const token = localStorage.getItem('token');


    let response = await fetch('http://localhost:3000/resumen', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

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
        div.innerHTML = modelResumen
        containerResumenes.appendChild(div)
    });
    containerResumenes.className = 'recipienteResumen'
}

fetchResumenes()