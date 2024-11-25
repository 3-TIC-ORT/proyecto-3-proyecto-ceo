
import React from "react";
import { Text } from "../Utilities/Text";
import { deletePost } from "../controllers/api-delete";
import { Icon } from "../Utilities/Icon";
import { Image } from "./Image";
import { Input } from "../Utilities/Inputs";

const CustomDiv = ({ 
    customHeight, 
    text, 
    customTextStyle, 
    customStyle, 
    image, 
    extraDivStyle, 
    setIsSelected, 
    deleteButtonAction,
    id,
    setBackedOut,
    imgPrevisualizacion,
    input,
}) => {

    const defaultStyle = {
        width: '80%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        margin: '1.25%',
        height: customHeight,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '2.5%',
    }

    const handlePreviousButton = () => {
        setIsSelected(false)
        setBackedOut(true)
    }    

    const handleDeleteClick = async () => {
        await deletePost('resumen', 'delete', id)
    }
 
    const style = customStyle ? customStyle : defaultStyle;

    const iconStyle = {
        position: 'absolute',
        right: '55%',
    }

    const arrowStyle = {
        margin: '2.5%',
    }

    return (
        <div style={style} className="customDiv">
            {deleteButtonAction ? <Icon iconStyle={iconStyle} src={'img/TachitoBasura.svg'} onClick={deleteButtonAction}/> : ''}
            {image ? <Icon onClick={handlePreviousButton} src={image} iconStyle={arrowStyle}/> : ''}
            <Text text={text} customTextStyle={customTextStyle}/>
            {extraDivStyle ? <div className="interactiveButton" style={extraDivStyle}><Text text={'Descargar Archivo..'}/></div> : ''}
            {imgPrevisualizacion ? <Image/> : ''}
        </div>  
    );
}

export { CustomDiv };