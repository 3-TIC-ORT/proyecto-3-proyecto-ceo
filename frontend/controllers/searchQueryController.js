async function searchByQuery(endpoint, route, query, filtro) {
    const token = localStorage.getItem('token')

    try {
        console.log('Params:', query, filtro)
        let response = await fetch(`http://localhost:3000/${endpoint}/${route}?query=${query}&filtro=${filtro}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()
        if (response.ok) {
            console.log('Search was succesfull!!')
            console.log('Retrieved data:', data)
            return data;
        }

    } catch (error) {
        console.log(`Failed to search by query in: [${endpoint}/${route}]`, error)
    }
}

export { searchByQuery }

