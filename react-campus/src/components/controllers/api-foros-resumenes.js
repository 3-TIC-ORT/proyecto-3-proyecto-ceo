

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

export { getBarArticles };
export { getArticleDetails };