
import { BASE_URL } from './type'

export const getPatTestList = async (data) => {
    console.log('testing in action----------',data)

    try {

        let response = await fetch(`${BASE_URL}test-associations/get/by/patientId`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        console.log("res123--------------", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};

