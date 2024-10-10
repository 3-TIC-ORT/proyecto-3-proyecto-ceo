

let res = 0; 
const coficiente = [1, 2, -1, -2]
let cociente = []
const rootNum = -2

console.log('--------------------------')

for (let i = 0; i < coficiente.length; i++) {
    if (i == 0) {
        res = coficiente[i]
        cociente.push(res)
        res = coficiente[i] * rootNum
        console.log(res)
        continue;
    }
    res = res + coficiente[i]
    cociente.push(res)
    res = res * rootNum
}

console.log(cociente)
