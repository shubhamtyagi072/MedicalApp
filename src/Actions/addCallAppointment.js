

import { BASE_URL } from './type'

export const addCallAppointment = async (data) => {

    console.log("Call")
    try {
        let response = await fetch(`${BASE_URL}appointment-calls/add`, {
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

