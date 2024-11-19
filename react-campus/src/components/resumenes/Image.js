import React from "react";
import { Text } from "../Utilities/Text";

const Image = ({}) => {

    const defaultStyle = {
        height: '100%',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
    }

    const imgStyle = {
        height: '85%',
        width: '90%',
        backgroundColor: '#FF0000',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <section style={defaultStyle}>
            <div style={imgStyle}>
                <Text text={'No hay archivo!'}/>
            </div>
        </section>
    );
}


export { Image }