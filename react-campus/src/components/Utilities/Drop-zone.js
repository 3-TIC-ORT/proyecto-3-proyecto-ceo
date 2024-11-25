import React, { useEffect, useState } from "react";
import { Text } from "./Text";
import { Icon } from "./Icon";

const DropZone = ({ file, setFile, customHeight }) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleFileReset = () => {
        setFile(null)
    }

    const defaultStyle = {
        transition: '0.4s ease',
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        height: customHeight
    }

    const uploadedFileStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#D9D9D9'
    }

    return (
        <div
            style={defaultStyle} 
            className="drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {file ? (
                <div style={uploadedFileStyle}>
                    <Text text={`${file.name}`}/>
                    <Icon src={'img/TachitoBasura.svg'} onClick={handleFileReset}/>
                </div>
            ) : (
                <Text text={'Suelta tu archivo!'}/>
            )}
        </div>
    );
}

export default DropZone;