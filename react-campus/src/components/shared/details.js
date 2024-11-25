import React, {useEffect, useState} from "react";
import { CustomDiv } from "./CustomDiv";
import { Image } from "./Image";
import { getPostExtraInfo, fetchBlob } from "../controllers/api-details";

const Visualizacion = ({ 
    titulo, 
    setIsSelected, 
    setBackedOut, 
    descripcion, 
    userId, 
    fileFormat, 
    id,
    endpoint,
    route,
}) => {
    const [extraInfo, setExtraInfo] = useState('');
    const [url, setUrl] = useState('')

    const defaultStyle = {
        height: '90%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: '2%'
    }

    const customDivStyle = {
        height: '13%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        marginBottom: '4%',
        border: 'solid 1px black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }

    const customBigDivStyle = {
        height: '70%',
        width: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        border: 'solid 1px black',
        boxShadow: '6px 6px 2px rgba(0, 0, 0, 0.3)',
    }

    const customTextStyle = {
        fontSize: '2rem'
    }

    const imgStyle = {
        height: '87.5%',
        width: '100%',
        backgroundColor: 'red',
        borderRadius: '30px',
        margin: '2.5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '4px 6px 2px rgba(0, 0, 0, 0.3)',
    }

    const extraStyle = {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }

    const infoStyle = {
        width: '100%',
        height: '82.5%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '5%'
    }

    const descripcionStyle = {
        fontSize: '1.3rem',
        fontWeight: '450',
    }
    
    useEffect(() => {
        const fetchExtraInfo = async () => {
            try {
                const result = await getPostExtraInfo(endpoint, userId);
                const fileUrl = await fetchBlob('image', route, id)

                setExtraInfo(result); 
                setUrl(fileUrl);
            } catch (error) {
                console.error("Failed to fetch extra info || image:", error);
            }
        };
        fetchExtraInfo();

        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    
    }, [userId, id]);

    return (
        <div style={defaultStyle}>
            <div className="data-display">
                <CustomDiv setIsSelected={setIsSelected} text={titulo} customStyle={customDivStyle} customTextStyle={customTextStyle} image={'img/Back-Arrow.svg'} setBackedOut={setBackedOut}/>
                <div style={customBigDivStyle}>
                    <section style={infoStyle}>
                        <p style={descripcionStyle} className="text">
                            {descripcion}
                        </p>
                    </section>
                    <section style={extraStyle}>

                        {extraInfo ? (
                            <>
                                <ExtraInfo text={'Contacto'} info={extraInfo.gmail}/>
                                <ExtraInfo text={'Propuesto por'} info={extraInfo.firstName}/>
                            </>
                        ) : <p>Cargando informacion...</p> }
                    </section>
                </div>
            </div>
            <Image file={url} imgCustomStyle={imgStyle}/>
        </div>
    );
}

const ExtraInfo = ({ text, info }) => {

    const sizeStyle = {
        fontSize: '1.5rem',
        fontWeight: '530',
        margin: '1%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '3%'
    }

    const infoStyle = {
        fontSize: '1.7rem',
        fontWeight: '300',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '3%'
    }

    return (
        <p className="text" style={sizeStyle}>{text}:<span style={infoStyle}>{info}</span></p>
    );
}

export default Visualizacion