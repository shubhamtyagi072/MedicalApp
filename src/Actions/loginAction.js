import axios from "axios";
import {
    Loginloading,
    Loginerror,
    Loginsucess
} from "./type";
import { BASE_URL } from './type'

export const loginApi = async (data, type) => {
    console.log("data", data, type)



    console.log("url ===>", `${BASE_URL}auth/${type}/login`)
    try {

        let response = await fetch(`${BASE_URL}auth/${type}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        console.log("res", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};

