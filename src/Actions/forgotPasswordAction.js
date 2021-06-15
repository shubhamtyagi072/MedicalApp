import axios from "axios";
import {
    Loginloading,
    Loginerror,
    Loginsucess
} from "./type";
import { BASE_URL } from './type'

export const forgotPasswordApi = async (data, type) => {
    try {
        let response = await fetch(`${BASE_URL}auth/${type}/forgotPassword`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        return responseJson
    } catch (error) {

        console.log(error)
    }
};
