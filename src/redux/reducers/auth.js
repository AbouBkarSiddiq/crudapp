import { LOGIN, LOGIN_LOADING, REGISTER, REGISTER_LOADING } from "../constants";

const initState = {
    user: null,
    isLoading: false,
}

export default function authReducer(state=initState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            };
    
        case LOGIN_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
            case REGISTER:
                return {
                    ...state,
                    user: action.payload,
                    isLoading: false,
                };
        
            case REGISTER_LOADING:
                return {
                    ...state,
                    isLoading: action.payload
                }
            // break;
        

        default:
            return state;
    }
}