
const getBarArticles = async (route, setLogged) => {
    const token = localStorage.getItem('token')

    try {
        let response = await fetch(`http://localhost:3000/${route}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.status == 403) {
            setLogged(false)
        }

        if (!response.ok) {
            console.log('Failed')
            return [];
        } else {
            console.log('Fetched data successfully');
            const data = await response.json()
            return data;
        }

    } catch(error) {
        console.error('Failed to fetch data:', error);
        return [];
    
    } finally {
        console.log('Finished businness')
    }
}

const getArticleDetails = async (route, id) => {
    const token = localStorage.getItem('token')

    try {
        let response = await fetch(`http://localhost:3000/${route}/visualizar?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (!response.ok) {
            console.log('Failed')

        } else {
            console.log('Fetched article by ID successfully');
            const data = await response.json()
            return data;
        }

    } catch(error) {
        console.error('Failed to fetch article by ID:', error);
    } finally {
        console.log('Finished businness')
    }
}

const uploadBarArticle = async (endpoint, title, descripcion, file, filtros) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()

    formData.append('titulo', title)
    formData.append('descripcion', descripcion)
    formData.append('archivo', file)
    formData.append('filtros', filtros)

    try {

        let response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (response.ok) {
            console.log('Success!')
        }
    } catch (error) {
        console.log(error)
        console.log(`Failed to send at ${endpoint}`)
    }
}

const searchArticleByQuery = async (endpoint, query, filtros) => {
    const token = localStorage.getItem('token')

    try {
        let response = await fetch(`http://localhost:3000/${endpoint}/search?query=${query}&filtro=${filtros}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            console.log('Success!')
            const data = await response.json()
            return data;
        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        console.log(`Failed to send at ${endpoint}`)
        return []
    }
}

export { searchArticleByQuery}
export { getBarArticles };
export { getArticleDetails };
export { uploadBarArticle };