import React, { useEffect, useState } from "react";
import { Text } from "../Utilities/Text";

const Carousel = ({ angle, isDragging, setSelectedRoute}) => {

    const handleCarouselFaceClick = (route) => {
        setSelectedRoute(route)
    }

    return (
        <div
            className="carousel"
            style={{
                transform: `rotateY(${angle}deg)`,
                transition: isDragging.current ? "none" : "transform 0.3s ease-out",
            }}

        >
            <CarouselFace
                onClick={handleCarouselFaceClick}
                value={'Foros'}
                img={'img/ForosImg.svg'} 
                text={'Participa en los foros de discusión, donde podrás hacer preguntas, resolver dudas y compartir conocimientos sobre distintos temas. ¡Conéctate con tus compañeros y aprende en grupo!'} 
            />

            <CarouselFace 
                onClick={handleCarouselFaceClick}
                value={'Objetos Perdidos'}
                img={'img/ObjetosImg.svg'} 
                text={'¿Perdiste algo en el colegio? Consulta los objetos que han sido encontrados por otras personas o publica un objeto que encontraste para ayudar a su dueño'}
            />

            <CarouselFace
                onClick={handleCarouselFaceClick} 
                value={'Intercambios'}
                img={'img/IntercambiosImg.svg'} 
                text={'Encuentra o intercambia libros y materiales útiles para tus clases. Esta sección te permite conectarte con otros estudiantes interesados en intercambiar sus libros a cambio de otros asi todos pueden darle otro uso a ese libro que ya terminaron'}
            />

            <CarouselFace 
                text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'}
            />

            <CarouselFace 
                text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'}
            />

            <CarouselFace 
                onClick={handleCarouselFaceClick}
                value={'Resumenes'}
                img={'img/LibroImg.svg'} 
                text={'Bienvenido a la sección de resúmenes, donde podrás acceder a resúmenes creados por otros estudiantes. Encuentra contenido organizado y útil para repasar. Además, tú también puedes contribuir con tus propios resúmenes.'}
            />
        </div>
    );
}

const CarouselFace = ({ img, id, text, onClick, value }) => {
    const [dragDistance, setDragDistance] = useState(0)
    const [dragStart, setDragStart] = useState(0)

    const pStlye = {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        pointerEvents: 'none',
    }
    const noEvent = {
        pointerEvents: 'none'
    }

    const preventDrag = (e) => {
        e.preventDefault(); 
    };

    const handleMouseUp = () => {
        setTimeout(() => console.log('mouse up!'), 200); 
    };

    const handleMouseDown = (e) => {
        setDragStart(e.clientX)
    };

    const handleClick = (e) => {
        if (
            (dragDistance < 15 && 
            dragDistance > -15 && 
            onClick) || 
            dragStart === e.clientX
        ) {
            onClick(value)
        }
    }

    const handleMouseMove = (e) => {
        setDragDistance(dragStart - e.clientX); 
    }

    return (
        <a 
            onMouseDown={handleMouseDown}
            onDragStart={preventDrag}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            className="carousel__face" 
            id={`${id}`} 
        >
            <img style={noEvent} id="icon" src={`${img}`} alt="ICON"/>
            <p style={pStlye} className="smallText">{text}</p>
        </a>
    );
}

export { Carousel };