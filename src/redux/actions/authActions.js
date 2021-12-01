import axios from "axios";
import { LOGIN, FETCH_USER, FETCH_LOADING, LOGIN_LOADING, REGISTER, REGISTER_LOADING } from "../constants";
require('dotenv').config();

export const setIsFetchingUser = (status) => dispatch => {
    dispatch({ type: FETCH_LOADING, payload: status });
}

export const fetchUser = (data) => dispatch => {
    dispatch({ type: FETCH_USER, payload: true });
    
}

export const login = (data) => dispatch => {
    dispatch({ type: LOGIN_LOADING, payload: true });
    
    console.log('React app api url', process.env.REACT_APP_API_URL)
    axios.post(`${process.env.REACT_APP_API_URL}user/login`, data)
    .then(response => {
            console.log("Response login for token: ", response)
            localStorage.setItem('userId', response.data.data._id);
            localStorage.setItem('token', response.data.token);

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
    axios.post(`${process.env.REACT_APP_API_URL}user/register`, data)
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
