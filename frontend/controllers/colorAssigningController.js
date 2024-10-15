
async function divColorFilter(filter) {
    let style;
    let dotStyle;
    switch(filter) {
        case 'fisica': {
            console.log('2')
            style = 'fisica'
            dotStyle = 'dotFisica'
            break
        }
        case 'matematica': {
            console.log('3')
            style = 'matematica'
            dotStyle = 'dotMatematica'
            break
        }
        case 'ingles': {
            console.log('3')
            style = 'ingles'
            dotStyle = 'dotIngles'
            break
        }
        case 'edu-judia': {
            console.log('4')
            style = 'edu-judia'
            dotStyle = 'dotEdu'
            break
        }
        case 'historia': {
            console.log('5')
            style = 'historia'
            dotStyle = 'dotHistoria'
            break
        }
        case 'lengua': {
            console.log('6')
            style = 'lengua'
            dotStyle = 'dotLengua'
            break
        }
        case 'geografia': {
            console.log('7')
            style = 'geografia'
            dotStyle = 'dotGeo'
            break
        }
        case 'economia': {
            console.log('7')
            style = 'economia'
            dotStyle = 'dotEconomia'
            break
        }
        case 'biologia': {
            console.log('7')
            style = 'biologia'
            dotStyle = 'dotBiologia'
            break
        }
        case 'etica': {
            console.log('7')
            style = 'etica'
            dotStyle = 'dotEtica'
            break
        }
    }
    console.log('filter:', filter)
    console.log('Style:', style)
    return { style, dotStyle };
}

export { divColorFilter }