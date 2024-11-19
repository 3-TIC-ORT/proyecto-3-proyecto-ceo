import React, { useState, useEffect } from "react";
import SearchBar from "./shared/foros-resumenes";
import { getBarArticles } from "./controllers/api-foros-resumenes";
import { ArticleBar } from "./shared/foros-resumenes";
import { LoadingIcon } from "./Utilities/Loading-icon";
import { Text } from "./Utilities/Text";
import { getArticleDetails } from "./controllers/api-foros-resumenes";
import Visualizacion from "./resumenes/details";
import { Button } from "./Utilities/Buttons";
import { Upload } from "./resumenes/Upload-page"

const Resumenes = ({ setLogged }) => {
    const [criteria, setCriteria] = useState('');
    const [allResumenes, setAllResumenes] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [selectedResumen, setSelectedResumen] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [isInUpload, setIsInUpload] = useState(false)
    const [backedOut, setBackedOut] = useState(false)

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
    useEffect(() => {
        if (!isInUpload) {
            fetchArticles();
        }
    }, []);
    useEffect(() => {
        console.log('checking update..')

        if (backedOut) {
            console.log('Updating..')
            fetchArticles()
            setBackedOut(false)
        }
    }, [backedOut])

    const handleResumenClick = async (id) => {
        try {
            setIsLoading(true);
            setIsInUpload(false);
            
            const route = 'resumen'
            const details = await getArticleDetails(route, id); 
            setSelectedResumen(details);
            setIsSelected(true);

        } catch (error) {
            console.error('Error fetching resumen details:', error);
            setIsSelected(false);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        console.log('is selected:', isSelected)
    }, [isSelected]); 
    

    return (
        <main style={resumenesContentStyle}>
      {!isInUpload ? <SearchBar setCriteria={setCriteria}/> : ''} 
        {isInUpload ? (
            <Upload setIsInUpload={setIsInUpload} setBackedOut={setBackedOut}/>
        ) : (
            <section style={mainContentStyle} className="resumenes">
                {isLoading ? <LoadingIcon/> : ''}

                {isSelected && selectedResumen ? (
                    <Visualizacion
                        title={selectedResumen.titulo}
                        info={selectedResumen.descripcion}
                        setIsSelected={setIsSelected}
                        postId={selectedResumen.id}
                    />
                ) : (

                    allResumenes.map((resumen) => (
                        <ArticleBar
                            key={resumen.id}
                            text={resumen.titulo}
                            filter={resumen.filtros}
                            onClick={() => handleResumenClick(resumen.id)}
                        />
                    ))

                )}

                {!isSelected ? <UploadButton setIsInUpload={setIsInUpload} /> : ''}
            </section>
        )}
        </main>
    );
}

const UploadButton = ({ setIsInUpload }) => {

    const handleUploadButtonClick = () => {
        setIsInUpload(true)
    }

    const buttonCustomStyle = {
        position: 'fixed',
        border: '1px solid black',
        right: '5%',
        bottom: '10%',
        height: '7.5%',
        width: '20%',
        backgroundColor: '#007BFF',
        borderRadius: '20px',
        zIndex: '999',
    }
    return (
        <Button onClick={handleUploadButtonClick} buttonCustomStyle={buttonCustomStyle} text={'Upload'} customClass='uploadButt'/>
    );
}
export default Resumenes