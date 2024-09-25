
async function fetchResumenes() {
    const token = localStorage.getItem('token');


    let response = fetch('http://localhost:3000/resumen', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (response.ok) {
        console.log('Data fetched successfully');
        const data = await response.json();
        console.log(data);
        populateResumenes(data)
    } else {
        console.log('[client] ERROR: Failed to authenticate or fetching dats');
    }
}

function populateResumenes(resumenes) {
    resumenes.forEach(resumen => {
        
    });

}