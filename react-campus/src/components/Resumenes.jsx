import React, { useState, useEffect } from "react";
import SearchBar from "./shared/foros-resumenes";
import { getBarArticles } from "./controllers/api-foros-resumenes";
import { ArticleBar } from "./shared/foros-resumenes";
import { LoadingIcon } from "./Utilities/Loading-icon";

import { getArticleDetails } from "./controllers/api-foros-resumenes";
import Visualizacion from "./resumenes/details";

import { Upload } from "./resumenes/Upload-page"
import { UploadButton } from "./shared/uploadForos-Resumen";


import { searchArticleByQuery } from "./controllers/api-foros-resumenes";

const Resumenes = ({ logged, setLogged }) => {

    const [criteria, setCriteria] = useState('');
    const [allResumenes, setAllResumenes] = useState([]); 
    const [file, setFile] = useState(null)

    const [isLoading, setIsLoading] = useState(true); 
    const [selectedResumen, setSelectedResumen] = useState(null)

    const [isSelected, setIsSelected] = useState(false)
    const [isInUpload, setIsInUpload] = useState(false)
    const [backedOut, setBackedOut] = useState(false)

    const [filtro, setFiltro] = useState('')

    const resumenesContentStyle = {
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
    }, [backedOut]);

    useEffect(() => {
        if (logged) {
            fetchArticles()
        }
	}, [logged]);



    const fetchByQuery = async () => {
        try {
            setIsLoading(true);
            setAllResumenes([]);

            const resumenes = await searchArticleByQuery('resumen', criteria, filtro);
            setAllResumenes(resumenes); 
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

    }, [criteria, filtro])

    const handleResumenClick = async (id) => {
        try {
            setIsLoading(true);
            setIsInUpload(false);
            setAllResumenes([]);
            
            const route = 'resumen'
            const details = await getArticleDetails(route, id); 
            console.log('details:', details);

            if (!details.archivo || !details.archivo.data) {
                throw new Error('Archivo data is missing or invalid');
            }
    
            const bufferData = new Uint8Array(details.archivo.data);
            const blobType = details.format === 'pdf' ? 'application/pdf' : 'application/octet-stream';
            const blob = new Blob([bufferData], { type: blobType });
    
            const fileURL = URL.createObjectURL(blob)
            console.log('hola1')
            setFile(fileURL)
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
        if (!isSelected && file) {
            URL.revokeObjectURL(file);
            setFile(null);
        }
    }, [isSelected, file]);

    const resetAllArticles = () => {
        setAllResumenes([])
    }
    

    return (
        <main style={resumenesContentStyle}>
            {!isInUpload && !isSelected? <SearchBar setCriteria={setCriteria} setFiltro={setFiltro} /> : ''} 
            {isInUpload ? (
                <Upload setIsInUpload={setIsInUpload} setBackedOut={setBackedOut}/>
            ) : (
            <section style={mainContentStyle} className="resumenes">
                {isLoading ? <LoadingIcon/> : ''}
                {/* {isLoading ? resetAllArticles : ''} */}

                {isSelected && selectedResumen && !isLoading ? (
                    <Visualizacion
                        title={selectedResumen.titulo}
                        info={selectedResumen.descripcion}
                        setIsSelected={setIsSelected}
                        postId={selectedResumen.id}
                        setBackedOut={setBackedOut}
                        setFile={setFile}
                        file={file}
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

export default Resumenes