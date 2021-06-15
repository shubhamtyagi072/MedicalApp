import axios from "axios";
import { BASE_URL } from './type'

export const sendPushToPatient = async (data) => {
    console.log("data in push notification---------", data)

    console.log("url ===>", `${BASE_URL}patient/send/notification`)
    try {

        let response = await fetch(`${BASE_URL}patient/send/notification`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        console.log("res-------------", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};