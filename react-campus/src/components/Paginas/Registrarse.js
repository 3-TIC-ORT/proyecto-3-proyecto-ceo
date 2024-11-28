import React, { useState } from "react";
import { Text } from "../Utilities/Text";
import { Button } from "../Utilities/Buttons";
import { Input } from "../Utilities/Inputs";

const Registrarse = ({ setLogged, logged }) => {

    const [firstName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [gmail, setEmail] = useState('')
    const [lastName, setApellido] = useState('')


    const defaultStyle = {
        height: '90vh',
        width: '100vw',
    }
    
    const contentStyle = {
        height: '70%',
        width: '75%',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px'
    }

    const dataBoxStyle = {
        height: '60%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }

    const customButtonStyle = {
        border: '1px solid black',
        width: '20%',
        height: '10%',
        borderRadius: '20px',
        backgroundColor: '#007BFF',
    }

    const register = async () => {
        console.log('Registrandose')
        try {
            let response = await fetch('http://localhost:3000/registers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    password,
                    gmail
                })
            })
            if (response.ok) {
                console.log('Registered user!')
            } else {
                console.log('failed')
            }
        } catch (error) {
            console.log('ERROR, failed to register:', error)
        }
    }

    return (
        <main style={defaultStyle} className="registrarse">
            <div style={contentStyle}>
                <Text text={'Registrate'}/>

                <div style={dataBoxStyle}>
                    <Data tag={'input'} text1={'Nombre usuario'} text2={'Email'} onChange1={setUserName} onChange2={setEmail} />
                    <Data tag={'input'} text1={'Apellido'} text2={'Contraseña'} type={'password'} onChange1={setApellido} onChange2={setPassword} />
                </div>

                <Button buttonCustomStyle={customButtonStyle} id={'send'} text={'Registrarse'} onClick={() => register()}/>
                <p>Ya tengo cuenta</p>
            </div>
        </main>
    );
}

const Data = ({ tag, text1, text2, type, onChange1, onChange2}) => {

    const customInputStyle = {
        width: '100%',
        height: '30%',
        border: 'solid 2px black',
        borderRadius: '10px',
        fontSize: '1.5rem',
        paddingLeft: '2.5%',
    }

    const customBoxStyle = {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }

    const defaultStyle = {
        width: '42.5%'
    }

    return (
        <div style={defaultStyle}>
            <Input 
                text={text1}
                single={false} 
                customBoxStyle={customBoxStyle} 
                customStyle={customInputStyle} 
                tag={`${tag}`} 
                placeholder={'Informacion'}
                onChange={(e) => onChange1(e.target.value)}
            />

            <Input 
                text={text2}
                single={false} 
                customBoxStyle={customBoxStyle} 
                customStyle={customInputStyle} 
                tag={`${tag}`} 
                placeholder={'Informacion'}
                type={type}
                onChange={(e) => onChange2(e.target.value)}
            />        

        </div>
    );
}

export default Registrarse