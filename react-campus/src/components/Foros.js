import React, { useState, useEffect } from "react";
import SearchBar, { ArticleBar } from "./shared/foros-resumenes";
import { getBarArticles } from "./controllers/api-foros-resumenes";
import { LoadingIcon } from "./Utilities/Loading-icon";

const Foros = ({ setLogged }) => {
    const [criteria, setCriteria] = useState('');
    const [allForos, setAllForos] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 

    const forosContentStyle = {
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
                const foros = await getBarArticles('foros', setLogged);
                setAllForos(foros); 
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);


    return (
        <main style={forosContentStyle}>
            <SearchBar setCriteria={setCriteria}/>
            <section style={mainContentStyle} className="resumenes">
                {allForos.map((pregunta) => (
                    <ArticleBar key={pregunta.id}/>
                ))}
                { isLoading ? <LoadingIcon/> : ''}
            </section>
        </main>
    );
}

export default Foros