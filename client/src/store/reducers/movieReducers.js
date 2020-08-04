import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    
} from '../actions/movieType'

const initialState = {
    loading: false,
    movies: [],
    error: ''
}

const movieReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MOVIES_SUCCESS:
            return {
                loading: false,
                movies: payload,
                error: ''
            }
        case FETCH_MOVIES_FAILURE:
            return {
                loading: false,
                movies: [],
                error: payload
            }
    
        default: return state
    }
}

export default movieReducers