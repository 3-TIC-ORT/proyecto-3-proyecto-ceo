
import React from "react";
import { useEffect, useState } from "react";
import { Filter, Input } from "../Utilities/Inputs";
import { Icon } from "../Utilities/Icon";
import DropZone from "./Drop-zone";
import { Button } from "../Utilities/Buttons";
import { uploadBarArticle } from "../controllers/api-foros-resumenes";
 
const Upload = ({ setIsInUpload, setBackedOut }) => {
    const [title, setTitle] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [file, setFile] = useState(null)
    const [filtros, setFiltro] = useState('')

    const defaultStyle = {
        height: '90vh',
        width: '100%',
    }

    const boxStyle = {
        height: '80%',
        width: '70%',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30px'
    }

    const handleUploadClick = async () => {
        try {
            console.log('Uploading...')
            const uploadArticle = await uploadBarArticle('send-resumen', title, descripcion, file, filtros )
        } catch (error) {
            console.log('Failed', error)
        }
    }

    return (
        <div style={defaultStyle} className="upload-page">
            <div style={boxStyle}>
                <TitleInput setIsInUpload={setIsInUpload} setTitle={setTitle} title={title} setBackedOut={setBackedOut}/>
                <MainInput setDescripcion={setDescripcion} descripcion={descripcion} />
                <Inputs file={file} setFile={setFile} setFiltro={setFiltro}/>
                <UploadButton onClick={() => handleUploadClick()}/>
            </div>
        </div>  
    );
}

const Inputs = ({ file, setFile,  setFiltro }) => {
    const defaultStyle = {
        height: '15%',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    }

    const customStyle = {
        width: '30%',
    }

    const options = ['Matematicas', 'Lengua', 'Etica', 'Edu-judia', 'Fisica', 'Economia', 'Historia']
    
    return (
        <section style={defaultStyle}>
            <DropZone setFile={setFile} file={file}/>
            <Filter customStyle={customStyle} options={options} setFiltro={setFiltro}/>
        </section>
    );
};

const MainInput = ({ setDescripcion, descripcion }) => {

    const customStyle = { 
        height: '100%',
        width: '80%',
        borderRadius: '10px',
        fontSize: '1.4rem',
        paddingLeft: '1%',
    }   

    const customBoxStyle = {
        height: '30%',
        width: '100%',
    }
    const handleDescripcionChange  = (e) => {
        setDescripcion(e.target.value)
    }
     
    return (
        <Input 
            tag="textarea" 
            customBoxStyle={customBoxStyle} 
            customStyle={customStyle} 
            placeholder={'Tu descripcion...'}
            single={true}
            value={descripcion}
            onChange={(e) => handleDescripcionChange(e)}
        />
    );
};

const TitleInput = ({ setIsInUpload, title, setTitle, setBackedOut}) => {
    const defaultStyle = {
        width: '80%',
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

    const customStyle = {
        height: '80%',
        width: '85%',
        borderRadius: '10px',
        border: '1px solid black',
        fontSize: '2rem'
    }

    const customBoxStyle = {
        height: '60%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }

    const handlePreviousButton = () => {
        setIsInUpload(false)
        setBackedOut(true)
    }  

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    return (
        <section style={defaultStyle}>
            <Icon onClick={handlePreviousButton} src={'img/Back-Arrow.svg'}/>
            <Input 
                customBoxStyle={customBoxStyle} 
                customStyle={customStyle} 
                placeholder={'El titulo...'} 
                tag="input"
                value={title}
                onChange={(e) => handleTitleChange(e)}
            />
        </section>
    )
}

const UploadButton = ({ onClick }) => {

    const defaultStyle = {
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '7.5%'
    }

    const buttonCustomStyle = {
        height: '80%',
        width: '40%',
        borderRadius: '10px',
        backgroundColor: '#007BFF'
    }

    return (
        <div style={defaultStyle}>
            <Button onClick={onClick} buttonCustomStyle={buttonCustomStyle} text={'Publicar!'}/>
        </div>
    );
}

export { Upload }