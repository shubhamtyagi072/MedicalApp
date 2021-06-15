
import { BASE_URL } from './type'

export const addPastPathology = async (data) => {

    console.log("Add pathology data:", data)
    try {
        let response = await fetch(`${BASE_URL}past-pathologies/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log("addPastPathology", responseJson);
        return responseJson
    } catch (error) {
        console.log(error)
    }
};

