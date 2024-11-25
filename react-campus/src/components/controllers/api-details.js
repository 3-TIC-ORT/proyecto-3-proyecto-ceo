import Header from "../Header";
import { getArticleDetails } from "./api-foros-resumenes";

const handleArticleClick = async ( 
    id, 
    route, 
    setIsLoading, 
    setIsInUpload, 
    setAllArticles, 
    setIsSelected, 
    setSelectedArticle,
) => {
    try {
        setIsLoading(true);
        setIsInUpload(false);
        setAllArticles([]);
        
        const details = await getArticleDetails(route, id); 
        setSelectedArticle(details);
        setIsSelected(true);
    } catch (error) {
        console.error('Error fetching article details:', error);
        setIsSelected(false);
    } finally {
        setIsLoading(false);
    }
}

const getPostExtraInfo = async (endpoint, id) => {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/user?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data  = response.json()
        if (response.ok) {
            console.log('Success! extra info was retrieved.')
            return data;
        }

    } catch (error) {
        console.log('Failed to get extra info on:', endpoint)
    }
}

const fetchBlob = async (endpoint, model, id) => {
    const token = localStorage.getItem('token')
    console.log('ID:', id, 'Model:', model);

    try {
        const response = await fetch(`http://localhost:3000/${endpoint}/${id}/${model}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        } else {
            console.error('Failed to fetch blob at:', model, id);
            return null;
        }
    } catch (error) {
        console.error('Error fetching blob:', error);
        return null;
    }
}

const fetchUserById = async (endpoint, route, id) => {
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
export { fetchBlob }
export { getPostExtraInfo }
export { handleArticleClick }