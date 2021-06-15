//# GET CURRENT PATHOLOGIES FOR THE PASSED PATIENT ID
import { BASE_URL } from './type'

export const getCurrentPathologyByPatient = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}current-pathologies/get/by/patient_id`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
};

export const getPastPathologyByPatient = async (data) => {
    try {

        let response = await fetch(`${BASE_URL}past-pathologies/get/by/patient_id`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
};


export const getAllPathologyList = async () => {
    try {

        let response = await fetch(`${BASE_URL}pathology/get/list`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let responseJson = await response.json();
        return responseJson
    } catch (error) {

        console.log(error)
    }
};
