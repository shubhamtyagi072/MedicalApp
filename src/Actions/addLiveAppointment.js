

import { BASE_URL } from './type'

export const addLiveAppointment = async (data) => {

    try {
        let response = await fetch(`${BASE_URL}appointments/add`, {
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

