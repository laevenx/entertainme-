import {combineReducers} from 'redux'
import movieReducers from './movieReducers'
import seriesReducers from './seriesReducers'


const rootReducers = combineReducers({
    movies: movieReducers,
    series: seriesReducers
})

export default rootReducers