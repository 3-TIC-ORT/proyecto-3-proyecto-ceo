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

export { getPostExtraInfo }
export { handleArticleClick }