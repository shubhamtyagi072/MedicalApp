
import { BASE_URL } from './type'

export const getPatientList = async () => {

    try {

        let response = await fetch(`${BASE_URL}patient/get/list`, {
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

