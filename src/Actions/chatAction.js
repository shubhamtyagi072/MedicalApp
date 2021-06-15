import axios from "axios";
import store from "../../store";
import { BASE_URL } from './type'

export const getChatMessage = async (data) => {

    try {

        let response = await fetch(`${BASE_URL}message/get/by/ids`, {
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

export const sendChatMessage = async (data) => {
    try {

        let response = await fetch(`${BASE_URL}message/add`, {
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
