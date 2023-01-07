
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
} 


const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


const isValidString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false  
    return true;
}

const isValidEmail = function (value) {
    // if (!(/^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(value.trim()))) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())) {
        return false
    }
    return true
}

const isvalidNum = function(value) {
    if (!/^[0-9]+$/.test(value)) {
        return false
    }
    return true
}

const isValidremoveProduct = function(value) {
    return [0,1].indexOf(value) !== -1
}





export default{
    isValid, 
    isValidBody, 
    isValidString, 
    isValidEmail, 
    isvalidNum,
    isValidremoveProduct,
}
