import React, { useState, useEffect} from "react";
import { Text } from "../Utilities/Text";
import { Image } from "../shared/Image";
import { getBarArticles } from "../controllers/api-foros-resumenes";
import UploadForos from "../intercambios/UploadPage";
import { UploadButton } from "../shared/uploadForos-Resumen";

import Visualizacion from "../intercambios/details";
import { handleArticleClick } from "../controllers/api-details";

const Intercambios = ({ setLogged, logged}) => {

    const [isSelected, setIsSelected] = useState(false)
    const [allIntercambios, setAllIntercambios] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [isInUpload, setIsInUpload] = useState(false)

    const [backedOut, setBackedOut] = useState(false)
    const [selectedIntercambio, setSelectedIntercambio] = useState([])

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
        width: isSelected ? '100%' : '90%',
        display:'flex',
        justifyContent: 'flex-start',
    };

    const detailsStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const intercambios = await getBarArticles('intercambios', setLogged);
            setAllIntercambios(intercambios); 
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isInUpload) {
            fetchPosts()
        }
    }, [])

    useEffect(() => {
        if (logged) {
            fetchPosts()
        } else {
            setAllIntercambios([])
            setIsSelected(false)
            setSelectedIntercambio([])
        }
    }, [logged])
    
    return (
        <main className="intercambios" style={forosContentStyle}> 
            {isInUpload ? (
                <UploadForos/>
            ) : (

                <section style={mainContentStyle} className={isSelected ? 'post-details' : 'post-display'}>
                    {selectedIntercambio && isSelected ? (
                        <Visualizacion 
                            descripcion={selectedIntercambio.informacion} 
                            titulo={selectedIntercambio.titulo}
                            id={selectedIntercambio.userId}
                            setIsSelected={setIsSelected} 
                            setBackedOut={setBackedOut}/>
                    ) : (
                        allIntercambios.map((intercambio) => (
                            <Post
                                key={intercambio.id} 
                                text={intercambio.titulo} 
                                onClick={async () =>
                                    await handleArticleClick(
                                        intercambio.id,
                                        'intercambios',
                                        setIsLoading,
                                        setIsInUpload,
                                        setLogged,
                                        setIsSelected,
                                        setSelectedIntercambio
                                    )
                                }
                            />
                        ))
                    )}
                    {!isSelected && !isInUpload && <UploadButton setIsInUpload={setIsInUpload}/>}
                </section>
            )}
        </main>
    );
}

const Post = ({ text, onClick }) => {

    const defaultStyle = {
        height: '55vh',
        width: '25vw',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        justifyContent: 'space-around',
        margin: '2.7%'
    }

    const customStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }

    const imgCustomStyle = {
        height: '95%',
        width: '90%',
        backgroundColor: '#FF0000',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <article style={defaultStyle} className="post" onClick={onClick}>
            <Image customStyle={customStyle} imgCustomStyle={imgCustomStyle}/>
            <Text text={text}/>
        </article>
    );
}

export default Intercambios