
import { BASE_URL } from './type'

export const addPathology = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}pathology/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log("addPathology", responseJson);
        return responseJson;
    } catch (error) {
        console.log(error)
    }
};

