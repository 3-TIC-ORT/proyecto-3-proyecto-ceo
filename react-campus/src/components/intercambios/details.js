import React, {useEffect, useState} from "react";
import { CustomDiv } from "../shared/CustomDiv";
import { Image } from "../shared/Image";

const Visualizacion = ({ titulo }) => {

    const defaultStyle = {
        height: '90%',
        width: '85%',
        display: 'flex',
        flexDirection: 'row',
        margin: '2%'
    }

    const customDivStyle = {
        height: '15%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        marginBottom: '2%'
    }

    const customBigDivStyle = {
        height: '65%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px'
    }

    return (
        <div style={defaultStyle}>
            <div className="data-display">
                <CustomDiv text={titulo} customStyle={customDivStyle}/>
                <CustomDiv customStyle={customBigDivStyle}/>
            </div>
            <Image/>
        </div>
    );
}

export default Visualizacion