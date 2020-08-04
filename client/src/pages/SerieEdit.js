import React, {useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Link} from 'react-router-dom'
import { Button, Input, message} from 'antd'

import {gql} from 'apollo-boost'
import {useMutation, useQuery} from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

const QUERY = gql`
query serie($Id : ID!){
    serie(Id: $Id){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

const EDIT_SERIE = gql`
mutation editSerie($Id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tags: String!){
    editSerie(Id: $Id,data:{title: $title, overview: $overview, poster_path: $poster_path , popularity:  $popularity, tags:$tags}) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`



const SerieEdit = ({props}) => {
    const {id} = useParams()
    console.log(id)
  
    const { loading, error, data, refetch } = useQuery(QUERY, {
        variables: { 'Id' : id },
      });
      
    //   console.log(data)
     const [title, setTitle] = useState('')
     const [overview, setOverview] = useState('')
     const [poster_path, setPoster_path] = useState('')
     const [popularity, setPopularity] = useState('')
     const [tags, setTags] = useState('')

     const [editMovie] = useMutation(EDIT_SERIE)

     if(loading) return <p>Loading....</p>   
    if(error) return <p>Error!!</p>
    
    const editData =  async (event) => {
        if(!title){
            await setTitle(data.serie.title)
        }
        if(!overview) await setOverview(data.serie.overview)
        if(!poster_path) await setPoster_path(data.serie.poster_path)
        if(!popularity) await setPopularity(data.serie.popularity)
        if(!tags) await setTags(data.serie.tags)
            
        editMovie({variables: {'Id' : id,title, overview, poster_path, popularity, tags}})
    
        setTitle('')
        setOverview('')
        setPoster_path('')
        setPopularity('')
        setTags('')
        
        refetch()
    }


    return (
        <div style={{padding: 200}}>
            <h1>Edit {data.serie.title}</h1>
            <h3>Title :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.serie.title} onChange={(event) => setTitle(event.target.value)}/> <br />
            <h3>Overview :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.serie.overview} onChange={(event) => setOverview(event.target.value)}/> <br />
            <h3>Poster_url :</h3>
            <Input placeholder="Basic usage"  style={{ width: 200 }} defaultValue={data.serie.poster_path} onChange={(event) => setPoster_path(event.target.value)}/> <br />
            <h3>Popularity :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.serie.popularity} onChange={(event) => setPopularity(event.target.value)} /> <br />
            <h3>Tags:</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.serie.tags} onChange={(event) => setTags(event.target.value)} /> <br />
            
            <Button type="primary" onClick={editData}>Edit Movie</Button>
        </div>
    )

}

export default SerieEdit