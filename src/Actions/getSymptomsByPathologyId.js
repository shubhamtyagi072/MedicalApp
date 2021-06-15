
import { BASE_URL } from './type'

export const getSymptomsByPathologyId = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}symptoms/get/by/pathology_id`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log("**FROM_SERVER**_getSymptomsByPathologyId", responseJson);
        return responseJson
    } catch (error) {
        console.log(error)
    }
};

