
import { BASE_URL } from './type'

export const editTestById = async (data) => {
    //editing the test by id passing all the test object as a POST parameter
    try {

        let response = await fetch(`${BASE_URL}test-associations/edit`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        console.log("res", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};

export const removeTestById = async (data) => {
    //removing the test by its id when the checkbox is unchecked
    try {

        let response = await fetch(`${BASE_URL}test-associations/remove`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let responseJson = await response.json();
        console.log("res", responseJson)

        return responseJson
    } catch (error) {

        console.log(error)
    }
};

