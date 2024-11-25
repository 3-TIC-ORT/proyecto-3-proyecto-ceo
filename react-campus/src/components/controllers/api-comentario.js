

const handleComentario = async (route, seccion, postId, idCreator, contenido, method) => {
    const token = localStorage.getItem('token')
    
    try {

        console.log(route, method)
        let url = `http://localhost:3000/comentarios/${route}`
        let info = {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
        
        if (method !== 'GET') {
            info.body = JSON.stringify({
                seccion: seccion,
                idPost: postId,
                contenido: contenido,
                idCreator: idCreator,
            })
        } else {
            url = `http://localhost:3000/comentarios/${route}?idPost=${postId}&idCreator=${idCreator}&seccion=${seccion}`
        }
 
        let response = await fetch(url, info)
        const data = await response.json()
        console.log('Data received:', data);
        return data;
        
    } catch (error) {
        console.log('[controller] ERROR, failed to fetch comentario:', error)
    }
}

export { handleComentario }