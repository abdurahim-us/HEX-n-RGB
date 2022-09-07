const typeSelect = document.querySelector('#typeSelect');
const converterInput =  document.querySelector('.converterInput');
const convertLabel = document.querySelector('.converter');
const mainTitle = document.querySelector('.mainTitle');
const convertLabel2 = document.querySelector('.converter2')
const submitBtn = document.querySelector('#submitbtn')
const output = document.querySelector('.output')

const hexLetterValues = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
}

function isnanCheck(number, boolean) {
    return isNaN(parseInt(number)) === boolean
}

function lengthCheck(e, num) {
    return e.toString().length < num
}

function numberTypeCheck(num) {
    return typeof (parseInt(num)) === 'number'
}


let hexToRgb = (hex) => {
    let twoStore = []
    let store = []
    let red = ''
    
    let redundant = (num) => {
        red = red + parseInt(num);
        store.push(red)
        twoStore = [];
        red = ''
    }
    
    let multiplyBySxtn = (num) => {
        return red = num * 16
    } 
    
    //main function begins
    for(let i = 0; i < hex.length; i++) {
        twoStore.push(hex[i]);
        if(twoStore.length < 3) {
            
            if(isnanCheck(hex[i], true)) {
                let hexk = hex[i].toUpperCase();
                
                for(item in hexLetterValues) {
                    if(hexk === item) {
                        if(lengthCheck(red, 1)) {
                            multiplyBySxtn(hexLetterValues[item])
                        } else {
                            redundant(hexLetterValues[item])
                        }
                    } 
                }
                
            } else if(
                isnanCheck(hex[i], false)
                && 
                numberTypeCheck(hex[i])
                ) {
                    if(lengthCheck(red, 1)) {
                        multiplyBySxtn(hex[i])
                    } else {
                        redundant(hex[i])
                    }
                }
            }
        }
        return output.textContent = `rgb(${store[0]}, ${store[1]}, ${store[2]})`
    } 
    
    
    //subfunc for RgbtoHex    
    function ifBigger(num) {
        return num > 9
    }
    
    // RgbtoHex starts here 
    let rgbToHex = rgb => {
        function replacejon(sValue) {
            return rgb = rgb.replace(sValue, '');
        }
        
        replacejon('rgb')
        replacejon('(')
        replacejon(')')
        
        rgb = rgb.split(',');
        let answer = ''
        let x = rgb.map(colorCode => {
                let devision = colorCode / 16;
                let firstN = Math.floor(devision)
                let secondN = (devision - firstN) * 16;

                for(let i in hexLetterValues) {
                    if(ifBigger(firstN)) {
                        if(firstN === hexLetterValues[i]) firstN = i
                    } 
                    if(ifBigger(secondN)) {
                        if(secondN === hexLetterValues[i]) secondN = i
                    }
                }
                return answer = answer + '' + firstN + '' + secondN    
        })
        return output.textContent = '#' + answer
    }
    
    function autoDetectDemo2(hexOrRgb) {
        if(typeSelect.value === 'hex') {
            return hexToRgb(hexOrRgb)
        } else if(typeSelect.value === 'rgb') {
            hexOrRgb = 'rgb(' + hexOrRgb + ')'
            return rgbToHex(hexOrRgb)
        } else {
            return mainTitle.textContent = 'this type is not supported'
        }
    };
    
    submitBtn.addEventListener('click', dataReciever);
    
    function dataReciever() {
        let cvInpVal = converterInput.value
        converterInput.value = ''
        converterInput.focus()
        autoDetectDemo2(cvInpVal);
    }
    
    
    
    
    // this is for LABEL to change based on select.value
    (function autoDetectDemo() {
        return typeSelect.addEventListener('change', selectTypeCheckForEventListener) ||  typeSelect.value ? textContentMaker([convertLabel, mainTitle], ['#', 'Hex to RGB']) : 'no problem'
    })()
    
    function selectTypeCheckForEventListener() {
        return typeSelect.value === 'hex' ? textContentMaker([convertLabel, mainTitle], ['#', 'Hex to RGB']) : textContentMaker([convertLabel, mainTitle], ['rgb(', 'RGB to Hex'], ')')
    }
    
    function textContentMaker(types, values, additionalScope=null) {
        return types.map((type, i) => {
            let label = convertLabel2.textContent = additionalScope
            return type.textContent = values[i] , label
        })
    }