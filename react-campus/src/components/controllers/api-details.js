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

export default handleArticleClick