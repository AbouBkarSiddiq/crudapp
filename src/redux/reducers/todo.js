import { GET_TODOS, SET_IS_FETCHING_TODOS, GET_TODO_DETAIL, DELETE_TODO, CREATE_TODO, GET_TODO_DATA_TO_UPDATE, UPDATE_TODO } from "../constants/index";

const initialState = {
  todos: [],
  isFetching: false,
  todo:{}
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_TODOS:
      return {
        ...state,
        isFetching: action.payload,
      };
      
      case GET_TODOS:
        // console.log('data at reducer:', state)
        return {
        ...state,
        isFetching: false,
        todos: action.payload,
      };

      case GET_TODO_DETAIL:
        // console.log('data at reducer:', state)
        return {
        ...state,
        isFetching: false,
        todo: action.payload,
      };

      case DELETE_TODO:
        // console.log('data at reducer:', state)
        return {
        ...state,
        isFetching: false,
        todos: action.payload,
      };
      case CREATE_TODO:
        return {
        ...state,
        isFetching: false,
        todos: action.payload,
      };
      case GET_TODO_DATA_TO_UPDATE:
        return {
        ...state,
        isFetching: false,
        todo: action.payload,
      };
      case UPDATE_TODO:
        return {
        ...state,
        isFetching: false,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;