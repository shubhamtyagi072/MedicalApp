
import { BASE_URL } from './type'

export const getTherapyByPatientId = async (data) => {

    try {

        let response = await fetch(`${BASE_URL}therapy/get/by/patientId`, {
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

