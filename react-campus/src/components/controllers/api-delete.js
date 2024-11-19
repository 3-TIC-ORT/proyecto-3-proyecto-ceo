

const checkDeleteAuthorization = async (model, postId) => {
    const token = localStorage.getItem('token');
    try {
        let response = await fetch(`http://localhost:3000/authorization/${model}/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }, 
            method: 'GET'
        });
        console.log('response:', response)
        if (response.status == 200) {
            console.log('User has authorization!');
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log('[client] ERROR, failed to check USER authorization:', error)
    }
}


const deletePost = async (endpoint, route, id) => {
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

export { deletePost }
export { checkDeleteAuthorization }
    