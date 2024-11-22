
import React from "react";
import { Button } from "../Utilities/Buttons";

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

export { UploadButton }