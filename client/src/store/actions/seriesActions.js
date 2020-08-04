import {
    FETCH_SERIES_REQUEST,
    FETCH_SERIES_SUCCESS,
    FETCH_SERIES_FAILURE,
    
} from './seriesType'

export const fetchSeries = () => {
    return (dispatch) => {
    }
}

export const fetchMoviesRequest = () => {
    return {
        type: FETCH_SERIES_REQUEST
    }
}
export const fetchMoviesSuccess = favorite => {
    return {
        type: FETCH_SERIES_SUCCESS,
        payload: favorite
    }
}

export const fetchMoviesFailure = error => {
    return {
        type: FETCH_SERIES_FAILURE,
        payload: error
    }
}
