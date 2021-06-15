import axios from "axios";
import {
  loading,
  error,
  sucess
} from "./type";
import { BASE_URL } from './type'

export const registerApi = async (data, type) => {
  try {

    let response = await fetch(`${BASE_URL}auth/${type}/register`, {
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
    return error;
  }
};

