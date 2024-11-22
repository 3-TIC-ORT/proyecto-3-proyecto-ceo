import React from "react";
import { Text } from "./Text";

const Input = ({ tag: Tag = 'div' , text, placeholder, onChange, customStyle, customBoxStyle, type, single, value}) => {

    const defaultStyle = {
        width: '90%',
        height: '40%',
        border: 'solid 2px black',
        borderRadius: '10px',
        fontSize: '1.5rem',
        paddingLeft: '2.5%',
        paddingTop: '1%'
    }

    const dataBoxStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    return (
        <div style={customBoxStyle ? customBoxStyle : dataBoxStyle}>
            {single ? '' : <Text text={text} />}
            <Tag 
                type={type} 
                style={customStyle ? customStyle : defaultStyle} 
                placeholder={`${placeholder}`}
                onChange={onChange}
                value={value}
                className='font'
            />
        </div>
    );
}

const Filter = ({ options, customStyle, setFiltro }) => {
    
    const handleFilterOption = (value) => {
        setFiltro(value.toLowerCase())
    }

    return (
        <select 
            style={customStyle} 
            className="filter font" 
            placeholder='Filtrar por...' 
            onChange={(e) => handleFilterOption(e.target.value)}
        >
            <option disabled>Filtrar por...</option>
            <option value={''} >Todos</option>
            {options.map((option) => (
                <Option key={option} value={option}/>
            ))}
        </select>
    );
}

const Option = ({ value }) => {
    return (
        <option>
            {value}
        </option>
    );
}

export { Input, Filter }