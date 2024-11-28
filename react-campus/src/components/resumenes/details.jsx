import React, { useState, useEffect } from "react";
import { checkDeleteAuthorization } from "../controllers/api-delete";

import { Text } from "../Utilities/Text";
import { CustomDiv } from "../shared/CustomDiv";
import { Image } from "../shared/Image";
import { deletePost } from "../controllers/api-delete";

const Visualizacion = ({ 
    title, 
    info, 
    setIsSelected, 
    postId, 
    setBackedOut, 
    file, 
    isPdf, 
    route
}) => {

    const defaultStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height :'90vh',
    }

    const imageProps = isPdf ? { pdf: file } : { file: file };

    return (
        <div className="resumen-vis" style={defaultStyle}>
            <Info title={title} info={info} setIsSelected={setIsSelected} setBackedOut={setBackedOut} postId={postId} file={file} route={route}/>
            <Image {...imageProps}/>
        </div>
    );
}


const Info = ({ title, info, setIsSelected, postId, setBackedOut, file, route }) => {
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const isAuthorized = await checkDeleteAuthorization(route, postId);
                setShowDelete(isAuthorized);
            } catch (error) {
                console.error('Error checking authorization:', error);
                setShowDelete(false); 
            }
        };
        checkAuthorization();
    }, [postId]); 


    const defaultStyle = {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const customTitleText = {
        fontSize: '2rem',
    }

    const customInfotText = {
        fontSize: '1.25rem',
    }

    const customInfoStyle = {
        width: '80%',
        height: '55%',
        borderRadius: '20px',
        backgroundColor: '#D9D9D9',
        margin: '1.25%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '2.5%',
    }

    const extraDivStyle = {
        height: '65%',
        borderRadius: '20px',
        width: '42.5%',
        backgroundColor: '#007BFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }


    const handlePreviousButton = () => {
        setIsSelected(false)
        setBackedOut(true)
    }    

    const handleDeleteClick = async () => {
        await deletePost('resumen', 'delete', postId)
    }

    const handleDownload = () => {
        if (file) {
            const link = document.createElement('a');
            link.href = file; 
            link.download = 'downloaded-file'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('No file to download!');
        }
    };

    return (
        <section style={defaultStyle}>
            <CustomDiv 
                image={'img/Back-Arrow.svg'} 
                customHeight={'12.5%'} text={title} 
                customTextStyle={customTitleText}
                setIsSelected={setIsSelected}
                showDelete={showDelete}
                id={postId}
                setBackedOut={setBackedOut}
                deleteButtonAction={async () => await handleDeleteClick()}
                onClickPrevious={handlePreviousButton}
            />
            <CustomDiv text={info} customTextStyle={customInfotText} customStyle={customInfoStyle}/>
            <CustomDiv customHeight={'12.5%'} extraDivStyle={extraDivStyle} file={file} onClick={handleDownload}/>
        </section>
    );
}

export default Visualizacion;