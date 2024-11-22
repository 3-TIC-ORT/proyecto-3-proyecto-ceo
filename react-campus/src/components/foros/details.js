import React, { useState, useEffect } from "react";
import { checkDeleteAuthorization } from "../controllers/api-delete";

import { Text } from "../Utilities/Text";
import { CustomDiv } from "../shared/CustomDiv";
import { Image } from "../shared/Image";

const Visualizacion = ({ title, info, setIsSelected, postId, setBackedOut }) => {

    const defaultStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height :'90vh',
    }

    return (
        <div className="foros-vis" style={defaultStyle}>
            <Info title={title} info={info} setIsSelected={setIsSelected} setBackedOut={setBackedOut} postId={postId}/>
        </div>
    );
}


const Info = ({ title, info, setIsSelected, postId, setBackedOut}) => {
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const isAuthorized = await checkDeleteAuthorization('resumen', postId);
                setShowDelete(isAuthorized); 
            } catch (error) {
                console.error('Error checking authorization:', error);
                setShowDelete(false); 
            }
        };
        checkAuthorization();
    }, [postId]); 


    const defaultStyle = {
        width: '80%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const customTitleText = {
        fontSize: '2rem',
    }

    const customStyle = {
        width: '100%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        margin: '1.25%',
        height: '12.5%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '2.5%',
    }

    return (
        <section style={defaultStyle}>
            <CustomDiv 
                image={'img/Back-Arrow.svg'} 
                customHeight={'12.5%'} 
                text={title} 
                customTextStyle={customTitleText}
                setIsSelected={setIsSelected}
                showDelete={showDelete}
                id={postId}
                setBackedOut={setBackedOut}
                customStyle={customStyle}
            />
            <CenterDiv info={info}/>
            <CustomDiv customStyle={customStyle}
            />
        </section>
    );
}

const CenterDiv = ({ info }) => {

    const customInfoStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        display: 'flex',
        alignItems:' center',
        justifyContent: 'flex-end',
        paddingLeft: '2.5%',
    }

    const customStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '60%',
        width: '100%'
    }

    const leftSideInfo = {
        display: 'flex',
        width: '50%',
        height: '100%',
    }

    return (
        <section style={customStyle}>
            <div style={customInfoStyle}>
                <div style={leftSideInfo}>
                    <Text text={info}/>
                </div>
                <Image/>
            </div>
        </section>
    );
}
export default Visualizacion;
export { CenterDiv }