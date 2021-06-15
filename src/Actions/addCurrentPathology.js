
import { BASE_URL } from './type'

export const addCurrentPathology = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}current-pathologies/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        let responseJson = await response.json();
        console.log("addCurrentPathology", responseJson);
        return responseJson
    } catch (error) {
        console.log(error)
    }
};

