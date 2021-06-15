export const BASE_URL = "https://miomedico.drop.ws/";     //PROD SERVER
//export const BASE_URL = "http://localhost:4007/";      //LOCAL SERVER
//export const BASE_URL = "https://miomedico.test.drop.ws/";//      TEST CLOUD SERVER
//export const BASE_URL = "https://medicalappsngnn.herokuapp.com/"; //sanganan testing url

export const REGISTER_DATA = "RESTAURANTLIST_DATA";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const REGISTER_ISLODING = "REGISTER_ISLODING";

export const REGISTERDOC_DATA = "REGISTERDOC_DATA";
export const REGISTERDOC_ERROR = "REGISTERDOC_ERROR";
export const REGISTERDOC_ISLODING = "REGISTERDOC_ISLODING";
export const LOGIN_DATA = "LOGIN_DATA";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_ISLODING = "LOGIN_ISLODING";

export const IO_INIT = "IO_INIT";
export const IO_LOGOUT = "IO_LOGOUT";

export function loading(bool) {
    return {
        type: REGISTER_ISLODING,
        isLoading: bool
    }
}

export function error(errorMes) {
    return {
        type: REGISTER_ERROR,
        error: errorMes
    }
}

export function sucess(data) {
    console.log("data")
    return {
        type: REGISTER_DATA,
        data: data
    }
}
export function RegisterDocloading(bool) {
    return {
        type: REGISTERDOC_ISLODING,
        isLoading: bool
    }
}

export function RegisterDocerror(errorMes) {
    return {
        type: REGISTERDOC_ERROR,
        error: errorMes
    }
}

export function RegisterDocsucess(data) {
    console.log("data")
    return {
        type: REGISTERDOC_DATA,
        data: data
    }
}
export function Loginloading(bool) {
    console.log("call", bool)
    return {
        type: LOGIN_ISLODING,
        isLoading: bool
    }
}

export function Loginerror(errorMes) {
    return {
        type: LOGIN_ERROR,
        error: errorMes
    }
}

export function Loginsucess(data) {
    console.log("data")
    return {
        type: LOGIN_DATA,
        data: data
    }
}
