
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Resumenes from "./Resumenes";
import Foros from "./Foros";

const Navigator = ({ selectedRoute, setSelectedRoute, setLogged}) => {

    function renderRoute(route) {
        switch (route) {
            case 'Home': 
                return <Home setSelectedRoute={setSelectedRoute}/>
            case 'Foros': 
                return <Foros setLogged={setLogged}/>       
            case 'Objetos Perdidos': 
                return <div>Objetos Perdidos</div>
            case 'Resumenes': 
                return <Resumenes setLogged={setLogged}/>     
            case 'Intercambios': 
                return <div>Intercambios</div>    
            case 'Registrarse':
                return <div>Registrarse</div>
        }
    }

    return (
        <div className="navigator">
            {renderRoute(selectedRoute)}
        </div>  
    ); 
};


export default Navigator