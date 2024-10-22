
async function fetchUserById(endpoint, route, id) {
    const token = localStorage.getItem('token')
    try {
        console.log('Fetching user by id')
        let response = await fetch(`http://localhost:3000/${endpoint}/${route}?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) 
        let data = await response.json()
        return data;
    } catch (error) {
        console.log('[controller] ERROR, Failed to fetch user by id:', error)
    }

}

export { fetchUserById }