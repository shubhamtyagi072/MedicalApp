
import { BASE_URL } from './type'

export const getPendingRequests = async (data) => {
    console.log("request dataa", data)

    try {

        let response = await fetch(`${BASE_URL}specialist/get/doctor-id/and/status`, {
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
