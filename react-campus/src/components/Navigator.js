
import React, {useEffect, useState} from "react";
import Home from "./Home";

const Navigator = ({ selectedRoute }) => {

    function renderRoute(route) {
        switch (route) {
            case 'Home': 
                return <Home/>
            case 'Foros': 
                return <div>Foros</div>        
            case 'Objetos Perdidos': 
                return <div>Objetos Perdidos</div>
            case 'Resumenes': 
                return <div>Resumenes</div>       
            case 'Intercambios': 
                return <div>Intercambios</div>    
        }
    }

    return (
        <div className="navigator">
            {renderRoute(selectedRoute)}
        </div>  
    ); 
};


export default Navigator