import axios from "axios";

import { GET_TODOS, SET_IS_FETCHING_TODOS, GET_TODO_DETAIL, DELETE_TODO, CREATE_TODO, UPDATE_TODO, GET_TODO_DATA_TO_UPDATE } from "../constants/index";
// import { apiUrl } from "../../constants/index";
require('dotenv').config();

const setIsFetchingTodos = (status) => {
    return {
        type: SET_IS_FETCHING_TODOS,
        payload: status,
    };
};

export const getTodos = (userId, token) => async (dispatch) => {
  try {
    dispatch(setIsFetchingTodos(true)); 

    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}todo`)
    // const res = await axios.get(`${apiUrl}todo`)
    // const res = await axios.get(`${apiUrl}/todo?userId=${userId}`, config);

    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: GET_TODOS,
            isFetching: false,
            payload: res.data.data,
        });
    } else {
        dispatch(setIsFetchingTodos(false));

    }
      
  } catch (error) {
    dispatch(setIsFetchingTodos(false));
  }
    
}


export const getTodoDetail = (id) => async (dispatch) => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}todo`, id);
    // const res = await axios.get(`${apiUrl}todo/${id}`);

    if (res.status === 200) {
        dispatch({
            type: GET_TODO_DETAIL,
            // isFetching: false,
            payload: res.data.data,
        });
    } else {

    }
}

export const deleteTodo = (id) => async (dispatch) => {
    
    // const res = await axios.delete('http://192.168.100.44:3000/todo/' + id);
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}todo/`, id);
    // const res = await axios.delete(`${apiUrl}todo/${id}`);
    console.log('Response from api for single todo:', res.data.data)
    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: DELETE_TODO,
            // isFetching: false,
            payload: res.data.data
        });
    } else {
    }
}

export const createTodo = (formData) => async (dispatch) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}todo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    });
    console.log('Response from api for newly created todo:', res.data.data)

    if (res.status === 200) {
        dispatch({
            type: CREATE_TODO,
            // isFetching: false,
            payload: res.data.data
        });
    } else {
    }
}

export const getTodoDataToUpdate = (id) => async (dispatch) => {

    // const res = await axios.get(`${apiUrl}todo/${id}`);
    // const res = await axios.get('http://192.168.100.44:3000/todo/' + id);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}todo/`, id);

    console.log('Response from api for single todo to be update:', res)
    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: GET_TODO_DATA_TO_UPDATE,
            // isFetching: false,
            payload: res.data.data
        });
    } else {
    }
}

export const updateTodo = (id, data) => async (dispatch) => {
    console.log('Data coming from edittodo comp:', data)
    
    const res = await axios.put(`${process.env.REACT_APP_API_URL}todo/${id}`, data);
    // const res = await axios.put('http://192.168.100.44:3000/todo/' + id, data);
    console.log('Response from api for single todo to be update:', res.data.data)
    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: UPDATE_TODO,
            // isFetching: false,
            payload: res.data.data
        });
    } else {
    }
}