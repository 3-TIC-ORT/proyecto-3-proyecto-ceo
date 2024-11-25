import React, { useState } from "react";
import { Input } from "../Utilities/Inputs";
import { Icon } from "../Utilities/Icon";
import { Button } from "../Utilities/Buttons";
import { Text } from "../Utilities/Text";
import DropZone from "../Utilities/Drop-zone";
import { sendPost } from "../controllers/uploadLogic";

const Upload = ({ setSelectedPost, setIsInUpload}) => {
    const [file, setFile] = useState(null)
    const [descripcion, setDescripcion] = useState('')
    const [titulo, setTitulo] = useState('')
    const [error, setError] = useState(false)
    const [publishing, setPublishing] = useState('')

    const defaultStyle = {
        height: '90vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const mainContainer = {
        height: '80%',
        width: '70%',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }

    const rowStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '20%',
        width: '100%',
    }

    const customBoxStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width: '80%',
    }

    const customBigBoxStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '40%',
        width: '92.5%',
    }

    const customBigInput = {
        width: '95%',
        height: '80%',
        border: 'solid 2px black',
        borderRadius: '10px',
        fontSize: '1.5rem',
        paddingLeft: '2.5%',
        paddingTop: '1%'
    }
    
    const endpoint = 'send-intercambio';

    const handleDescripcionChange  = (e) => {
        setDescripcion(e.target.value)
    }

    const handleTitleChange  = (e) => {
        setTitulo(e.target.value)
    }

    const handleBackButton = () => {
        setSelectedPost([])
        setIsInUpload(false)
    }

    return (
        <div style={defaultStyle}>
            <div style={mainContainer}>
                <div style={rowStyle}>
                    <Icon src={'img/Back-Arrow.svg'} onClick={handleBackButton}/>
                    <Input 
                        tag="input" 
                        placeholder={'Nombre del libro..'} 
                        customBoxStyle={customBoxStyle} 
                        onChange={(e) => handleTitleChange(e)}
                    />
                </div>
                <Input 
                    customStyle={customBigInput} 
                    customBoxStyle={customBigBoxStyle} 
                    tag="textarea" 
                    placeholder={'Añade informacion sobre el libro..'}
                    onChange={(e) => handleDescripcionChange(e)}
                />

                <LowerSection 
                    onClick={() => sendPost(
                        file,
                        descripcion,
                        titulo,
                        setPublishing,
                        setError,
                        endpoint
                    )}
                    setFile={setFile}
                />
            </div>
        </div>
    );
}

const LowerSection = ({ onClick, setFile }) => {

    const defaultStyle = {
        width: '100%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    }

    const warningStyle = {
        height: '15%',
        width: '60%',
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        fontSize: '1.3em',
        fontWeight: '300',
    }   

    const customButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        borderRadius: '10px',
        border: 'solid 1px black',
        height: '20%',
        width: '40%',
        transition: '0.4s ease',
    }

    return (
        <div style={defaultStyle}>
            <DropZone customHeight={'22.5%'} setFile={setFile}/>

            <div style={warningStyle} className="text">
                Se mostrara su gmail para facilitar ponerse en contacto.
            </div>

            <Button 
                id={'send'} 
                buttonCustomStyle={customButtonStyle} 
                customClass={'publishButton'}
                text={'Publicar'}
                onClick={onClick}
            />
        </div>
    ); 
}

export default Upload