import React from "react";
import { Text } from "../Utilities/Text";

const Image = ({ customStyle, imgCustomStyle }) => {

    const defaultStyle = {
        height: '100%',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const imgDefaultStyle = {
        height: '85%',
        width: '90%',
        backgroundColor: '#FF0000',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const style = customStyle ? customStyle : defaultStyle
    const imgStyle = imgCustomStyle ? imgCustomStyle : imgDefaultStyle
    return (
        <section style={style}>
            <div style={imgStyle}>
                <Text text={'No hay archivo!'}/>
            </div>
        </section>
    );
}


export { Image }