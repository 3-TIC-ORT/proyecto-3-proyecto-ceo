
import React from "react";


const Icon = ({ onClick, src, iconStyle }) => {

    const defaultStyle = {}

    const style = iconStyle ? iconStyle : defaultStyle
    return (
        <img style={style} className="icon" src={src} onClick={() => onClick()}/>
    );
}

export { Icon };