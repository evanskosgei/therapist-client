import { REHYDRATE } from 'redux-persist';
// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  logout:null
};

// Action types
const SET_USER = 'SET_USER';
const SET_TOKEN = 'SET_TOKEN';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const LOGOUT = 'LOGOUT'

// Action creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const logout = () => ({ type: LOGOUT, });

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}