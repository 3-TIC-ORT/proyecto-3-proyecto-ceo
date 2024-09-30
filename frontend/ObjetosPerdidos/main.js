
AOS.init()

async function fetchObjetos() {
    const token = localStorage.getItem('token')

    try {  
        let response = await fetch('http://localhost:3000/objetos', {
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

        const data = response.json;

        populateObjetos(data)
    } catch (error) {
        
    }
}

function populateObjetos(objetos) {
    const recipienteObjetos = document.getElementById('recipiente')

    objetos.forEach(objeto => {
        const div = document.createElement('div')
        const modelObjeto = `        
        <div class="imagen">
            <img src="../../backend/uploads/archivo-1727190438664-162306634.webp" alt="">
        </div>
        <p id="titulo">${objeto.informacion}</p>`

        div.addEventListener('click', () => {
            redirectToDetailsPage(objeto.id)
        })

        div.className = 'objeto'
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = modelObjeto
        
    });
}

function redirectToDetailsPage(id) {
    window.location.href = `ObjetosPerdidosVisualizacion/index.html?id=${id}`
}

fetchObjetos()