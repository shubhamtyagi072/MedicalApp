
import { BASE_URL } from './type'

export const addSymptoms = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}symptoms/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log("**FROM_SERVER**_addSymptoms", responseJson);
        return responseJson
    } catch (error) {
        console.log(error)
    }
};

