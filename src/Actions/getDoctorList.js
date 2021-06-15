
import { BASE_URL } from './type'

export const getDocList = async () => {

    try {

        let response = await fetch(`${BASE_URL}doctor/get/list`, {
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
