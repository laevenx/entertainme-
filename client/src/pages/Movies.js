import React from 'react'

import { useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import {Space, Spin, Alert } from 'antd'

import Data from '../components/Data'



const MOVIES = gql`
    {
        movies{
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export default function Movies(){

    const {loading,error,data, refetch} = useQuery(MOVIES)

    if(loading) return <Spin tip="Loading...">
    <Alert
      message="One Moment Please..."
      description="Don't go anywhere or you gonna regret it"
      type="info"
    />
  </Spin>   
    if(error) return <p>Error!!</p>
    

    return(
        <div style={{flexWrap: 'nowrap'}}>
            <h1 style={{margin: 'auto', width: 50,padding: 10}}>Movies</h1>
            <div>
            {
                data.movies.map((movie, index) => {
                    console.log(index)
                    
                        return <li><Data id={movie._id} category='movies' data={movie} refetch={refetch} /></li>
                    
                })
            }
            </div>
          
        </div>

    )
}