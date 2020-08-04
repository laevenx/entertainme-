import {
    FETCH_SERIES_REQUEST,
    FETCH_SERIES_SUCCESS,
    FETCH_SERIES_FAILURE,
    
} from '../actions/seriesType'

const initialState = {
    loading: false,
    series: [],
    error: ''
}

const seriesReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_SERIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SERIES_SUCCESS:
            return {
                loading: false,
                movies: payload,
                error: ''
            }
        case FETCH_SERIES_FAILURE:
            return {
                loading: false,
                movies: [],
                error: payload
            }
    
        default: return state
    }
}

export default seriesReducers