
import { BASE_URL } from './type'

export const getPathologys = async () => {

    try {

        let response = await fetch(`${BASE_URL}pathology/get/list`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },


        })
        let responseJson = await response.json();
        console.log("res", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};


import { BASE_URL } from './type'

export const chatMsgSend = async () => {

    try {
        let response = await fetch(`${BASE_URL}/message/add`, {
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

