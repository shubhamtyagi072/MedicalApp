
import { BASE_URL } from './type'

export const submitPathology = async (data, from) => {
    console.log("data", data)
    var endPoint = ""
    if (from == "current") {
        endPoint = "current-pathologies/add"
    } else if (from == "previous") {
        endPoint = "past-pathologies/add"
    } else {
        endPoint = "clinical-diary-notes/add"
    }
    console.log("url", `${BASE_URL}` + `${endPoint}`)
    console.log("data", data)
    try {

        let response = await fetch(`${BASE_URL}` + `${endPoint}`, {
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

