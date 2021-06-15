
import { BASE_URL } from './type'

export const getDocCallAppoListByDocPat = async (data) => {
    //get call appointments list by doctor and patient
    try {

        let response = await fetch(`${BASE_URL}appointment-calls/get/by/doctorId/patientId`, {
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