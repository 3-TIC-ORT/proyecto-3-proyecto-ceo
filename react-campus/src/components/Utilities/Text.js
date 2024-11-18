
import React from "react"

const Text = ({ text, customTextStyle }) => {

    const defaultTextStyle = {
        fontSize: '1.5rem',
    }

    return (
        <p style={customTextStyle ? customTextStyle : defaultTextStyle} className="text">{text}</p>
    );
}

export { Text }