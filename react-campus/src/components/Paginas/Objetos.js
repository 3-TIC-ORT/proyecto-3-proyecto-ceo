import React, { useState, useEffect} from "react";
import { Text } from "../Utilities/Text";
import { Image } from "../shared/Image";
import { getBarArticles } from "../controllers/api-foros-resumenes";
import Upload from "../shared/UploadPage-Int-Obj";
import { UploadButton } from "../shared/uploadForos-Resumen";

import Visualizacion from "../intercambios/details";
import { handleArticleClick } from "../controllers/api-details";
import { fetchBlob } from "../controllers/api-details";

const Intercambios = ({ setLogged, logged}) => {

    const [isSelected, setIsSelected] = useState(false)
    const [allObjetos, setAllObjetos] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [isInUpload, setIsInUpload] = useState(false)

    const [backedOut, setBackedOut] = useState(false)
    const [selectedObjetos, setSelectedObjeto] = useState([])
    const [imageUrls, setImageUrls] = useState({})

    const ContentStyle = {
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

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const objetos = await getBarArticles('objetos', setLogged);
            setAllObjetos(objetos); 
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImage = async (rawImg, id) => {
        
        const url = await fetchBlob('image', 'objeto', id)
        console.log('Created URL:', url);

        setImageUrls(prev => ({
            ...prev,
            [id]: url
        }));

        return url;
    }

    useEffect(() => {
        return () => {
            Object.values(imageUrls).forEach(url => {
                console.log("Revoking URL...", url);
                URL.revokeObjectURL(url);
            });
        };
    }, []); 

    useEffect(() => {
        if (!isInUpload) {
            fetchPosts()
        }
    }, [])

    useEffect(() => {
        if (logged) {
            fetchPosts()
        } else {
            setAllObjetos([])
            setIsSelected(false)
            setSelectedObjeto([])
        }
    }, [logged])
    
    return (
        <main className="intercambios" style={ContentStyle}> 
            {isInUpload ? (
                <Upload setSelectedPost={setSelectedObjeto} setIsInUpload={setIsInUpload}/>
            ) : (

                <section style={mainContentStyle} className={isSelected ? 'post-details' : 'post-display'}>
                    {selectedObjetos && isSelected ? (
                        <Visualizacion 
                            descripcion={selectedObjetos.informacion} 
                            titulo={selectedObjetos.titulo}
                            userId={selectedObjetos.userId}
                            setIsSelected={setIsSelected} 
                            setBackedOut={setBackedOut}
                            fileFormat={selectedObjetos.foto_format}
                            id={selectedObjetos.id}
                        />
                    ) : (
                        allObjetos.map((objeto) => (
                            <Post
                                key={objeto.id} 
                                text={objeto.titulo} 
                                onClick={async () =>
                                    await handleArticleClick(
                                        objeto.id,
                                        'intercambios',
                                        setIsLoading,
                                        setIsInUpload,
                                        setLogged,
                                        setIsSelected,
                                        setSelectedIntercambio
                                    )
                                }
                                url={() => handleImage(objeto.foto, objeto.id)}
                            />
                        ))
                    )}
                    {!isSelected && !isInUpload && <UploadButton setIsInUpload={setIsInUpload}/>}
                </section>
            )}
        </main>
    );
}

const Post = ({ text, onClick, url }) => {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            const imgUrl = await url();
            setImageUrl(imgUrl);
        };

        fetchImageUrl();
    }, []);

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
        maxHeight: '46vh',
        width: '90%',
        backgroundColor: '#FF0000',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black'
    }

    return (
        <article style={defaultStyle} className="post" onClick={onClick}>
            <Image file={imageUrl} customStyle={customStyle} imgCustomStyle={imgCustomStyle}/>
            <Text text={text}/>
        </article>
    );
}

export default Intercambios