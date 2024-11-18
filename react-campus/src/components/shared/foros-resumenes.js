import React, { useState } from "react";
import { Filter, Input } from "../Utilities/Inputs";
import { Text } from "../Utilities/Text";


const ArticleBar = ({ text, filter, onClick }) => {
    const defaultStyle = {
        width: '90%',
        height: '10vh',
        backgroundColor: '#D9D9D9',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '2.5%',
        position: 'relative',
        fontSize: '1.25em'
    }

    return (
        <article 
            style={defaultStyle} 
            className="article" 
            onClick={onClick}
        >
            <Text text={text}/>
            { filter ? chooseTag(filter) : ''}
        </article>
    );  
}

const Tag = ({ style, text }) => {
    return (
        <div style={style} className="tag font">
            <p>{text}</p>
            <div className="dot"></div>
        </div>
    );
}

const chooseTag = (filter) => {

    const styles = {
        matematica: {
            backgroundColor: 'rgba(214, 7, 255, 0.5)',
        },
        economia: {
            backgroundColor: 'rgba(255, 0, 4, 0.5)',
        },
        historia: {
            backgroundColor: 'rgba(154, 141, 157, 0.5)',
        },
        fisica: {
            backgroundColor: 'rgba(223, 71, 0, 0.5)',
        },
        ingles: {
            backgroundColor: 'rgba(16, 160, 189, 0.5)',
        },
        biologia: {
            backgroundColor: 'rgba(16, 161, 11, 0.5)',
        },
        etica: {
            backgroundColor: 'rgba(206, 136, 14, 0.5)',
        },
        edujudia: {
            backgroundColor: 'rgba(176, 15, 139, 0.5)',
        },
        geografia: {
            backgroundColor: 'rgba(17, 170, 63, 0.5)',
        },
        lengua: {
            backgroundColor: 'rgba(226, 14, 14, 0.5)',
        },
    }

    console.log(filter)

    switch (filter) {
        case 'matematica':
            return <Tag style={styles.matematica} text={filter}/>;
        case 'lengua': 
            return <Tag style={styles.lengua} text={filter}/>;
        case  'historia':
            return <Tag style={styles.historia} text={filter}/>;
        case 'educacion-judia': 
            return <Tag style={styles.edujudia} text={filter}/>;
        case 'fisica':
            return <Tag style={styles.fisica} text={filter}/>;
        case 'biologia': 
            return <Tag style={styles.biologia} text={filter}/>;
        case 'ingles':
            return <Tag style={styles.ingles} text={filter}/>;
        case 'economia':
            return <Tag style={styles.economia} text={filter}/>;
        default: 
            return <Tag text={filter}/>
    }
}

const SearchBar = ({ setCriteria }) => {

    const customBoxStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '80%',
    }

    const customStyle = {
        width: '100%',
        height: '65%',
        border: 'solid 2px black',
        borderRadius: '10px',
        fontSize: '1.5rem',
        paddingLeft: '1.5%',
    }

    const options = ['Matematicas', 'Lengua', 'Etica', 'Edu-judia', 'Fisica', 'Economia', 'Historia']


    return (
        <section className="search-bar">    
            <Input 
                tag="input" 
                placeholder={'Busca tu resumen para el tema que necesites...'} 
                onChange={(e) => setCriteria(e.target.value)}
                type={'text'}
                customBoxStyle={customBoxStyle}
                customStyle={customStyle}
            />

            <Filter options={options} />
        </section>
    );
}


export default SearchBar
export { ArticleBar }