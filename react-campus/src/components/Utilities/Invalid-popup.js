import React from "react";
import { Text } from "./Text";

const InvalidPopup = ({ show, error, text }) => {
    const hide = {
        opacity: '0',
    }

    if (!error) {
        return;
    }

    return (
        <div style={show ? show : hide} id="messageDisplay">
            <Text text={text ? text : 'No se pudo completar la operacion.'}/>
        </div>
    );
}

export { InvalidPopup }