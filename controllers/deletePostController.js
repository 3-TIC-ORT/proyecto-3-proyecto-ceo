
async function tryDeletePost(endpoint, route, id) {
    const token = localStorage.getItem('token')

    try {
        let response = await fetch(`http://localhost:3000/${endpoint}/${route}?id=${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            console.log('Model was deleted.')
        }
    } catch (error) {
        console.log('ERROR, Model was not deleted:', error)
    }
}

export { tryDeletePost }
