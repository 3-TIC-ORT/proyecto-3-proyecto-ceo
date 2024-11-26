import React, { useState, useEffect } from "react";
import SearchBar, { ArticleBar } from "./shared/foros-resumenes";
import { getBarArticles } from "./controllers/api-foros-resumenes";

import { LoadingIcon } from "./Utilities/Loading-icon";

import { handleArticleClick } from "./controllers/api-details";
import { getArticleDetails } from "./controllers/api-foros-resumenes";
import { searchArticleByQuery } from "./controllers/api-foros-resumenes";

import { UploadButton } from "./shared/Upload-page";
import { Upload } from "./shared/Upload-page";
import Visualizacion from "./foros/details";

const Foros = ({ setLogged, logged }) => {
    const [criteria, setCriteria] = useState('');
    const [allForos, setAllForos] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 

    const [isSelected, setIsSelected] = useState(false)
    const [isInUpload, setIsInUpload] = useState(false)
    const [backedOut, setBackedOut] = useState(false)


    const [selectedPregunta, setSelectedPregunta] = useState(null)

    const forosContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'auto',
        width: '100vw',
    };

    const mainContentStyle = {
        minHeight: isSelected ? '' : '100vh',
        height: isSelected ? '90vh' : 'auto',
        width: '100%',
    };

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

    useEffect(() => {
        if (!isInUpload) {
            fetchArticles();
        }
    }, []);

    useEffect(() => {
        console.log('checking update..')

        if (backedOut || logged) {
            console.log('Updating..')
            fetchArticles()
            setBackedOut(false)
        }

    }, [backedOut, logged]);

    useEffect(() => {
        console.log(isInUpload)
    }, [isInUpload])

    const fetchByQuery = async () => {
        try {
            setIsLoading(true);
            setAllForos([]);

            const preguntas = await searchArticleByQuery('foros', criteria);
            setAllForos(preguntas); 
            console.log(allForos)
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchByQuery()
        }, 300);
        return () => clearTimeout(timeoutId);

    }, [criteria])

    const resetAllArticles = () => setAllForos([]);

    return (
        <main style={forosContentStyle}>
            {!isInUpload && !isSelected? <SearchBar setCriteria={setCriteria} noFilter={true}/> : ''} 
            {isInUpload ? (
                <Upload setIsInUpload={setIsInUpload} setBackedOut={setBackedOut}/>
            ) : (
            <section style={mainContentStyle} className="foros">
                {isLoading ? <LoadingIcon/> : ''}
                {isLoading ? resetAllArticles : ''}

                {isSelected && selectedPregunta && !isLoading ? (
                    <Visualizacion
                        title={selectedPregunta.pregunta}
                        info={selectedPregunta.textoExplicativo}
                        setIsSelected={setIsSelected}
                        postId={selectedPregunta.id}
                        setBackedOut={setBackedOut}
                        creatorId={selectedPregunta.userId}
                    />
                ) : (

                    allForos.map((pregunta) => (
                        <ArticleBar
                            key={pregunta.id}
                            text={pregunta.pregunta}
                            onClick={async () =>
                                await handleArticleClick(
                                    pregunta.id,
                                    'foros',
                                    setIsLoading,
                                    setIsInUpload,
                                    setAllForos,
                                    setIsSelected,
                                    setSelectedPregunta
                                )
                            }
                        />
                    ))
                )}
                {!isSelected && !isInUpload ? <UploadButton setIsInUpload={setIsInUpload} /> : ''}
            </section>
            )}
        </main>
    );
}

export default Foros