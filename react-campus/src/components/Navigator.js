
import React, {useEffect, useState} from "react";
import Home from "./Home";
import Resumenes from "./Resumenes";
import Foros from "./Foros";
import Intercambios from "./Paginas/Intercambios";
import ObjetosPerdidos from "./Paginas/Objetos";
import Registrarse from "./Paginas/Registrarse";

const Navigator = ({ selectedRoute, setSelectedRoute, setLogged, logged}) => {

    function renderRoute(route) {
        switch (route) {
            case 'Home': 
                return <Home setSelectedRoute={setSelectedRoute}/>
            case 'Foros': 
                return <Foros setLogged={setLogged} logged={logged}/>       
            case 'Objetos Perdidos': 
                return <ObjetosPerdidos setLogged={setLogged} logged={logged}/>
            case 'Resumenes': 
                return <Resumenes setLogged={setLogged} logged={logged}/>     
            case 'Intercambios': 
                return <Intercambios setLogged={setLogged} logged={logged}/>  
            case 'Registrarse':
                return <Registrarse setLogged={setLogged} logged={logged}/>
        }
    }

    return (
        <div className="navigator">
            {renderRoute(selectedRoute)}
        </div>  
    ); 
};


export default Navigator