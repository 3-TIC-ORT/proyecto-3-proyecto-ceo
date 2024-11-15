import React, { useEffect, useMemo, useState }from "react";
import { Text } from "./Text";

const Header = ({ selectedRoute, setSelectedRoute, customButtonHeaderStyle }) => {
    const handleHeaderButtonClick = (route) => {
        setSelectedRoute(route)
    }

    const headerStyle = {
        width: '100%',
        height: '10%',
        borderBottom: '2px solid black'
    }
    const defaultNameHeaderStyle = {
        width: '15%',
        height: '60%',
        backgroundColor: '#007BFF',
        borderRadius: '20px'
    }

    const isSelected = (value) => {
        return selectedRoute === value 
    }

    const altHeader = customButtonHeaderStyle ? customButtonHeaderStyle : defaultNameHeaderStyle
    return (
        <header style={headerStyle} className="header">
            <Logo source={'../img/Logo.svg'} text={'PORTAL'}/>
            <Button value={'Home'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick} />
            <Button value={'Resumenes'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick}  />
            <Button value={'Foros'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick}  />
            <Button value={'Intercambios'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick}  />
            <Button value={'Objetos Perdidos'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick}  />
            <Button value={'Registrarse'} selectedRoute={selectedRoute} onClick={handleHeaderButtonClick} styling={altHeader}  />
        </header>
    );
}

const Button = ({ value, selectedRoute, onClick, styling }) => {

    const isSelected = useMemo(() => 
        selectedRoute === value, [selectedRoute]
    )

    const buttonStyle = {
        width: '10%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const handleMouseOut = (e) => {
        e.target.style.color = '#000000'
    };

    const handleMouseOver = (e) => {
        e.target.style.color = '#D9D9D9'
    }; 

    return ( 
        <div
            style={styling ? styling : buttonStyle}
            onClick={() => onClick(value)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={`boton ${isSelected ? 'selected' : ''}`}
        >   
            <Text text={value}/>
        </div>
    );
}

const Logo = ({ source, text }) => {

    const logoStyle = {
        width: '15%'
    }

    const customTextStyle = {
        fontSize: '2.5rem',
        fontWeight: '300'
    }
    return (
        <div style={logoStyle} className="row">
            <img src={`${source}`} alt="pepe"/>
            <Text text={text} customTextStyle={customTextStyle}/> 
        </div>
    );
}

export default Header;