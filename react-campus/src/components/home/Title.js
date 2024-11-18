import React from "react"
import { Text } from "../Utilities/Text"

const Title = ({}) => {

    const headStyle = {
        height: '30%',
        width: '80%',
        backgroundColor: '#D9D9D9',
        borderRadius: '50px',
        marginTop: '5%',
        boxShadow: '3px 4px 3px rgba(0, 0, 0, 0.3)',
    }
    
    const textStyle = {
        fontSize: '4.5rem',
        width: '100%',
        fontWeight: '450',
        margin: '0'
    }   

    const alignStyle = {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-around'
    }

    const logoStyle = {
        height: '100%',
        width: '50%'
    }

    const portalStyle = {
        fontSize: '5.5rem',
        margin: '0'
    }

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    return (
        <section style={headStyle}>
            <div style={alignStyle}>
            
                <div style={columnStyle}>
                    <Text text={'Bienvenido a'} customTextStyle={textStyle}/>
                    <p style={portalStyle} className="text">P<span id="ort">ORT</span>AL!</p>
                </div>

                <img src="../img/LogoInicio.svg" style={logoStyle}/>
            </div>
        </section>
    );
}


export { Title } 