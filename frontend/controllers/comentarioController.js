async function handleComentario(route, seccion, postId, idCreator,contenido, method) {
    const token = localStorage.getItem('token')
    try {
        let response = await fetch(`http://locahost:3000/comentarios/${route}`, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                seccion: seccion,
                idPost: postId,
                contenido: contenido,
                idCreator: idCreator,
            })
        })
    } catch (error) {
        console.log('[controller] ERROR, failed to fetch comentario:', error)
    }
}

export { handleComentario }