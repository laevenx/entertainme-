import React, { useEffect } from 'react'

import { useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

import {Space, Spin, Alert } from 'antd'

import Data from '../components/Data'


const SERIES = gql`
    {
        series{
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export default function Series(){

    const {loading,error,data, refetch} = useQuery(SERIES)
    console.log(data)


    useEffect(() => {
        refetch()
    }, [])


    if(loading) return <Spin tip="Loading...">
    <Alert
      message="One Moment Please..."
      description="Don't go anywhere or you gonna regret it"
      type="info"
    />
  </Spin>   
    if(error) return <p>Error!!</p>
    

    return(
        <div >
            <h1 style={{margin: 'auto', width: 50,padding: 10,}}>Series</h1>
            <Space>
            {
                data.series.map((serie) => {
                    return <Data id={serie._id} category='series' data={serie} refetch={refetch} />
                })
            }
            </Space>
          
        </div>

    )
}