import axios from "axios";
import { LOGIN, LOGIN_LOADING, REGISTER, REGISTER_LOADING } from "../constants";

export const login = (data) => dispatch => {
    dispatch({ type: LOGIN_LOADING, payload: true });
    
    console.log('Data going for login :', data)
    axios.post('http://192.168.100.44:3000/user/login', data)
    .then(response => {
            console.log("Response login for token: ", response)
            localStorage.setItem('userId', response.data.data._id);
            localStorage.setItem('token', response.data.token);
            // localStorage.setItem('userId', 12345678_2)

            dispatch({
                type: LOGIN,
                payload: response.data.data
            })

        })
        .catch(err => {
            console.log("Error: ", err)
            alert('Error while logging in!')
            dispatch({ type: LOGIN_LOADING, payload: false });
        })
}

export const register = (data) => dispatch => {
    dispatch({ type: REGISTER_LOADING, payload: true });
    axios.post('http://192.168.100.44:3000/user/register', data)
        .then(response => {
            console.log("Response register: ", response.data.data)
            dispatch({
                type: REGISTER,
                payload: response.data.data
            })

        })
        .catch(err => {
            console.log("Error: ", err)
            alert('Error while logging in!')
            dispatch({ type: REGISTER_LOADING, payload: false });
        })
}
