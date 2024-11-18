import React, { useState, useEffect } from "react";
import SearchBar from "./shared/foros-resumenes";
import { getBarArticles } from "./controllers/api-foros-resumenes";
import { ArticleBar } from "./shared/foros-resumenes";
import { LoadingIcon } from "./Utilities/Loading-icon";
import { Text } from "./Utilities/Text";
import { getArticleDetails } from "./controllers/api-foros-resumenes";

const Resumenes = ({ setLogged }) => {
    const [criteria, setCriteria] = useState('');
    const [allResumenes, setAllResumenes] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [selectedResumen, setSelectedResumen] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    const resumenesContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'auto',
        width: '100vw',
    };

    const mainContentStyle = {
        height: 'auto',
        width: '100%',
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setIsLoading(true);
                const resumenes = await getBarArticles('resumen', setLogged);
                setAllResumenes(resumenes); 
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleResumenClick = async (id) => {
        try {
            setIsLoading(true);
            setIsSelected(true)
            
            const route = 'resumen'
            const details = await getArticleDetails(route, id); 
            setSelectedResumen(details);
        } catch (error) {
            console.error('Error fetching resumen details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main style={resumenesContentStyle}>
            <SearchBar setCriteria={setCriteria}/>
            <section style={mainContentStyle} className="resumenes">
                { isLoading ? <LoadingIcon/> : ''}

                {isSelected ? '' : allResumenes.map((resumen) => (
                    <ArticleBar 
                        key={resumen.id} 
                        text={resumen.titulo} 
                        filter={resumen.filtros} 
                        onClick={() => handleResumenClick(resumen.id)}
                    />
                ))}

            </section>
        </main>
    );
}

export default Resumenes