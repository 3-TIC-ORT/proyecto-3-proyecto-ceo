
import React from "react";
import { Text } from "../Utilities/Text";
import { deletePost } from "../controllers/api-delete";
import { Icon } from "../Utilities/Icon";
import { Image } from "./Image";

const CustomDiv = ({ 
    customHeight, 
    text, 
    customTextStyle, 
    customStyle, 
    image, 
    extraDivStyle, 
    setIsSelected, 
    showDelete,
    id,
    setBackedOut,
    imgPrevisualizacion,
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

    return (
        <div style={style} className="customDiv">
            {showDelete ? <Icon iconStyle={iconStyle} src={'img/TachitoBasura.svg'} onClick={handleDeleteClick}/> : ''}
            {image ? <Icon onClick={handlePreviousButton} src={image}/> : ''}
            <Text text={text} customTextStyle={customTextStyle}/>
            {extraDivStyle ? <div className="interactiveButton" style={extraDivStyle}><Text text={'Descargar Archivo..'}/></div> : ''}
            {imgPrevisualizacion ? <Image/> : ''}
        </div>  
    );
}

export { CustomDiv };