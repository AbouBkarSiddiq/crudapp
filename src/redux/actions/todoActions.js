import axios from "axios";
import { GET_TODOS, SET_IS_FETCHING_TODOS, GET_TODO_DETAIL, DELETE_TODO, CREATE_TODO, UPDATE_TODO, GET_TODO_DATA_TO_UPDATE } from "../constants/index";
require('dotenv').config();

const setIsFetchingTodos = (status) => {
    return {
        type: SET_IS_FETCHING_TODOS,
        payload: status,
    };
};

export const getTodos = (userId, token) => async (dispatch) => {
  try {
    // dispatch(setIsFetchingTodos(true)); 

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
            // isFetching: false,
            payload: res.data.data,
        });
    } else {
        // dispatch(setIsFetchingTodos(false));

    }
      
  } catch (error) {
    // dispatch(setIsFetchingTodos(false));
  }
    
}

export const getTodoDetail = (id) => async (dispatch) => {
    console.log('Id for get todo detail:', id)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}todo/${id}`);
    console.log('Get todo details action:', res)
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

export const deleteTodo = (id, ownProps) => async (dispatch) => {
    console.log('ownProps at delete todo:', ownProps)
    
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}todo/${id}`);
    console.log('Response from api for single todo:', res.data.data)
    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: DELETE_TODO,
            // isFetching: false,
            payload: res.data.data
        });
        ownProps.history.push('/home')
    } else {
    }
}

export const createTodo = (formData, ownProps) => async (dispatch) => {
    console.log('Own Props:', ownProps);
    const headers = {
        'Content-Type': 'multipart/form-data'
      }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}todo/`, formData, {headers});
    console.log('Response from api for newly created todo:', res.data.data)

    if (res.status === 200) {
        dispatch({
            type: CREATE_TODO,
            // isFetching: false,
            payload: res.data.data,
            // ownProps.push('/')
        });
        ownProps.history.push('/home')
    } else {
    }
}

export const getTodoDataToUpdate = (id) => async (dispatch) => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}todo/${id}`);

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

export const updateTodo = (id, formData, ownProps) => async (dispatch) => {
    console.log('Own props of updateTodo:', ownProps);
    const headers = {
        'Content-Type': 'multipart/form-data'
      }
    const res = await axios.put(`${process.env.REACT_APP_API_URL}todo/${id}`, formData, {headers});
    // dispatch(setIsFetchingTodos(true));
    if (res.status === 200) {
        dispatch({
            type: UPDATE_TODO,
            // isFetching: false,
            payload: res.data.data
        });
        ownProps.history.push('/home')
    } else {
    }
}