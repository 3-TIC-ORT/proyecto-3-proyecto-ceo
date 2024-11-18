import React, { useEffect, useState } from "react";
import { Text } from "../Utilities/Text";
import { Input } from "../Utilities/Inputs";
import { Button } from "../Utilities/Buttons";
import { sendFeedback } from "./sendFeedback";
import { InvalidPopup } from "../Utilities/Invalid-popup";

const Feedback = ({}) => {
    const [opinion, setOpinion] = useState('');
    const [sugerencia, setSugerencia] = useState('');
    const [rating, setRating] = useState(0)

    const [error, setError] = useState(false);
    const [publishing, setPublishing] = useState(false)
    const [buttonText, setButtonText] = useState('Enviar')

    useEffect(() => {
        if (error) {

            const timeoutId = setTimeout(() => {
                setError(false);
            }, 1000); 

            return () => clearTimeout(timeoutId);
        }
    }, [error]);

    useEffect(() => {
        setButtonText(publishing ? 'Enviando...' : 'Enviar');
    }, [publishing]);

    const feedbackStyle = {
        backgroundColor: '#D9D9D9',
        height: '40%',
        width: '80%',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '3px 4px 3px rgba(0, 0, 0, 0.3)',
    }

    const titleStyle = {
        fontSize: '2.5rem'
    }

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '35%'
    }

    const invalidPopupStyle = {
        opacity: '1',
    }

    return (
        <section style={feedbackStyle}>
            <div>
                <Text text={'Calificanos!'} customTextStyle={titleStyle}/>
                <Text text={'¿Cuanto nos darias?'}/>
            </div>
            <Stars setRating={setRating} rating={rating}/>
            <div style={rowStyle}>

                <Input 
                    text={'Alguna opinion?'} 
                    tag='textarea' 
                    placeholder={'Tu opinion..'}
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                    type={'text'}
                />

                <Input 
                    text={'Alguna sugerencia?'} 
                    tag='textarea' 
                    placeholder={'Tu sugerencia..'} 
                    value={sugerencia}
                    onChange={(e) => setSugerencia(e.target.value)}
                    type={'text'}
                />

            </div>
            <Button
                id={'send'}
                onClick={() => {
                    sendFeedback({
                        opinion, 
                        sugerencia, 
                        rating, 
                        setError, 
                        setPublishing
                    });
                }}
                publishing={publishing}
                text={buttonText}
            />

            <InvalidPopup show={invalidPopupStyle} error={error} text={'No te olvides de la opinion!'}/>
        </section>
    );
}

const Stars = ({ setRating, rating }) => {

    const handleClickStar = (starNum) => {
        setRating(starNum)
    }

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    }

    return (
        <div style={rowStyle} className="stars">
            {[1, 2, 3, 4, 5].map((number) => (
                <Star
                    key={number}
                    number={number}
                    selected={number <= rating}
                    onClick={() => handleClickStar(number)}
                />
            ))}
        </div>
    );
}

const Star = ({ number, selected, onClick }) => {
    return (
        <img 
            src={`${selected ? 'img/Star.svg': 'img/Empty-Star.svg'}`} 
            alt={`${number}`} 
            className="star"
            onClick={onClick}
            data-star={`${number}`} 
        />
    );
}



export { Feedback };