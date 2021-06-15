
import { BASE_URL } from './type'

export const getPathologiesList = async () => {
    try {
        let response = await fetch(`${BASE_URL}pathology/get/list`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
};

