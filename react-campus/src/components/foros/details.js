import React, { useState, useEffect } from "react";
import { checkDeleteAuthorization } from "../controllers/api-delete";
import { getPreguntasDetails } from "./getPreguntas";

import { Text } from "../Utilities/Text";
import { CustomDiv } from "../shared/CustomDiv";
import { Image } from "../shared/Image";
import { fetchUserById } from "../controllers/api-details";
import { Input } from "../Utilities/Inputs";
import { Icon } from "../Utilities/Icon";
import { sendPost } from "../controllers/uploadLogic";
import { handleComentario } from "../controllers/api-comentario";
import { fetchBlob } from "../controllers/api-details";

const Visualizacion = ({ title, info, setIsSelected, postId, setBackedOut, creatorId }) => {
    const [allComentarios, setAllComentarios] = useState([])
    const [comentario, setComentario] = useState('')
    const [publishing, setPublishing] = useState(false)
    const [error, setError] = useState(false)
    const [url, setUrl] = useState('')


    useEffect(() => {
        const fetchComentarios = async () => {
            const response = await getPreguntasDetails(postId, 'foros', 'GET', creatorId);

            if (response) {
                const comentariosWithNames = await Promise.all(
                    response.map(async (comentario) => {
                        const user = await fetchUserById('comentarios', 'user', comentario.idCreator);
                        return {
                            ...comentario,
                            userName: user ? user.firstName : 'User desconocido',
                        };
                    })
                );
                setAllComentarios(comentariosWithNames);
            }
        };
        fetchComentarios();
    }, [postId]);

    useEffect(() => {

        const fetchImage = async () => {
            try {
                const fileUrl = await fetchBlob('image', 'foro', postId)
                setUrl(fileUrl);

            } catch (error) {
                console.error("Failed to fetch image:", error);
            }
        }; 

        fetchImage()

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    
    }, [postId]);
    
    const handleComentarioChange = (e) => {
        setComentario(e.target.value)
    }

    const defaultStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100vw',
        minHeight :'90vh',
        height: 'auto',
        margin: '1vh'
    }

    const commentSection = {
        height: 'auto',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div className="foros-vis" style={defaultStyle}>
            <Info 
                url={url}
                title={title} 
                info={info} 
                setIsSelected={setIsSelected} 
                setBackedOut={setBackedOut}
                postId={postId}
                handleComentarioChange={handleComentarioChange}
                handleSendButton={() => handleComentario(
                    'send',
                    'foros',
                    postId,
                    '',
                    comentario,
                    'POST'
                )}
            />

            <section style={commentSection}>
                {allComentarios.map((comentario) => (
                    <Comentario
                        key={comentario.id}
                        name={comentario.userName} 
                        text={comentario.contenido}
                    />
                ))}
            </section>
        </div>
    );
}


const Info = ({ 
    title, 
    info, 
    setIsSelected, 
    postId, 
    setBackedOut, 
    handleComentarioChange, 
    handleSendButton,
    url,
}) => {
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const isAuthorized = await checkDeleteAuthorization('resumen', postId);
                setShowDelete(isAuthorized); 
            } catch (error) {
                console.error('Error checking authorization:', error);
                setShowDelete(false); 
            }
        };
        checkAuthorization();
    }, [postId]); 

    const defaultStyle = {
        width: '80vw',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const customTitleText = {
        fontSize: '2rem',
    }

    const customStyle = {
        width: '100%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        margin: '1.25%',
        height: '12.5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxShadow: '4px 6px 2px rgba(0, 0, 0, 0.35)' ,
    }

    const customInputBox = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '85%',
    }

    const rotatedArrowStyle = {
        rotate: '180deg'
    }

    return (
        <section style={defaultStyle}>
            <CustomDiv 
                image={'img/Back-Arrow.svg'} 
                customHeight={'12.5%'} 
                text={title} 
                customTextStyle={customTitleText}
                setIsSelected={setIsSelected}
                showDelete={showDelete}
                id={postId}
                setBackedOut={setBackedOut}
                customStyle={customStyle}
            />
            <CenterDiv info={info} url={url}/>
            <div style={customStyle}>
                <Input tag="textarea" placeholder={'Comentario...'} customBoxStyle={customInputBox} onChange={(e) => handleComentarioChange(e)}/>
                <Icon src={'img/Back-Arrow.svg'} iconStyle={rotatedArrowStyle} onClick={handleSendButton}/>
            </div>
        </section>
    );
}

const CenterDiv = ({ info, url }) => {

    const customInfoStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        alignItems:' center',
        justifyContent: 'flex-end',
        paddingLeft: '2.5%',
        boxShadow: '4px 6px 2px rgba(0, 0, 0, 0.35)' ,
    }

    const customStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '60%',
        width: '100%',
        
    }

    const leftSideInfo = {
        display: 'flex',
        width: '50%',
        height: '100%',
    }

    return (
        <section style={customStyle}>
            <div style={customInfoStyle}>
                <div style={leftSideInfo}>
                    <Text text={info}/>
                </div>
                <Image file={url}/>
            </div>
        </section>
    );
}

const Comentario = ({ text, name, idCreator }) => {
    
    const defaultStyle = {
        height: 'auto',
        minHeight: '10vh',
        width: '80vw',
        backgroundColor: '#D9D9D9',
        borderRadius: '20px',
        margin: '1vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '1rem',
        boxShadow: '4px 6px 2px rgba(0, 0, 0, 0.225)',
    }
    
    const customTextStyle = {
        fontWeight: '250',
        fontSize: '1.2rem',
    }

    const customNameStyle = {
        marginTop: '1rem',
        marginBottom: '0',
        fontSize: '1.3rem',
    }

    return (
        <div style={defaultStyle} className="comment">
            <Text customTextStyle={customNameStyle} text={name}/>
            <Text customTextStyle={customTextStyle} text={text}/>
        </div>
    );
}
export default Visualizacion;
export { CenterDiv }