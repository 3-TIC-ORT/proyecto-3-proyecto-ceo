import React from "react";
import { Text } from "./Text";

const Button = ({ id, buttonCustomStyle, onClick, publishing, text }) => {
    const buttonDefaultStyle = {
        border: '1px solid black',
        width: '15%',
        height: '10%',
        borderRadius: '20px',
        backgroundColor: '#28A745',
    }

    return (
        <button 
            style={buttonCustomStyle ? buttonCustomStyle : buttonDefaultStyle } 
            id={`${id}`}
            className="boton"
            onClick={onClick}
        >
            <Text text={text}/>
        </button>  
    );
}

export { Button }