import { handleComentario } from "../controllers/api-comentario";

const getPreguntasDetails = async (id, seccion, method, creatorId) => {
    console.log('Getting preguntas info')

    try {
        let route = 'fetch';
        let contenido = '';

        const comentarios = await handleComentario(route, seccion, id, creatorId, contenido, method)
        return comentarios;

    } catch (error) {
        console.log('Failed to get the pregunta info:', error)
    }
}

export { getPreguntasDetails }