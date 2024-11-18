import React, { useEffect, useState } from "react";
import { Text } from "./Text";
import { Button } from "./Buttons";
import { Input } from "./Inputs";
import { login } from "../controllers/api-login";

const LoginPopup = ({ show, setLogged, setError}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClickLogin = async () => {
        setError(false)
        await login({
            setLogged,
            setError,
            password,
            gmail: email
        })
    }

    const buttonStyle = {
        width: '50%',
        height: '10%',
        borderRadius: '20px',
        backgroundColor: '#007BFF',
        border: '1px solid black',
        margin: '5%',
    }

    return (
        <div style={show} id="loginPopup" className="popup">
            <Text text={'Login'}/>
            <Inputs setEmail={setEmail} setPassword={setPassword} email={email} password={password}/>
            <Button text={'Iniciar sesion'} buttonCustomStyle={buttonStyle} onClick={handleClickLogin} id={'send'}/>
            <a>No tienes cuenta?</a>
        </div> 
    );
}


const Inputs = ({ setEmail, setPassword, email, password }) => {
    const inputsBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50%',
        width: '100%',
    }

    const inputStyle = {
        width: '80%',
        height: '30%',

        border: 'solid 2px black',  
        borderRadius: '5px',
        fontSize: '1.5rem',
        paddingLeft: '2.5%',
        paddingTop: '1%',
    }

    const customBoxStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '10%',
    }

    return (
        <div style={inputsBoxStyle}>
            <Input 
                tag="input" 
                customBoxStyle={customBoxStyle} 
                customStyle={inputStyle} 
                placeholder={'Email...'} 
                text={'Email'}
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                type={'text'}
            />

            <Input 
                tag="input" 
                customBoxStyle={customBoxStyle} 
                customStyle={inputStyle} 
                placeholder={'Contraseña...'} 
                text={'Contraseña'}
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                type={'password'}
            />
        </div>
    );
}

export { LoginPopup }