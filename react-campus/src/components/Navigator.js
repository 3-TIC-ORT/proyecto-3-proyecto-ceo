
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Resumenes from "./Resumenes";
import Foros from "./Foros";
import Intercambios from "./Paginas/Intercambios";

const Navigator = ({ selectedRoute, setSelectedRoute, setLogged, logged}) => {

    function renderRoute(route) {
        switch (route) {
            case 'Home': 
                return <Home setSelectedRoute={setSelectedRoute}/>
            case 'Foros': 
                return <Foros setLogged={setLogged} logged={logged}/>       
            case 'Objetos Perdidos': 
                return <div>Objetos Perdidos</div>
            case 'Resumenes': 
                return <Resumenes setLogged={setLogged} logged={logged}/>     
            case 'Intercambios': 
                return <Intercambios setLogged={setLogged} logged={logged}/>  
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