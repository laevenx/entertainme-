import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    
} from './movieType'

export const fetchmovies = () => {
    return (dispatch) => {
    }
}

export const fetchMoviesRequest = () => {
    return {
        type: FETCH_MOVIES_REQUEST
    }
}
export const fetchMoviesSuccess = favorite => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: favorite
    }
}

export const fetchMoviesFailure = error => {
    return {
        type: FETCH_MOVIES_FAILURE,
        payload: error
    }
}
