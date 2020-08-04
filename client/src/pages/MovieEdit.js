import React, {useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Link} from 'react-router-dom'
import { Button, Input, message} from 'antd'

import {gql} from 'apollo-boost'
import {useMutation, useQuery} from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

const QUERY = gql`
query movie($Id : ID!){
    movie(Id: $Id){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`

const EDIT_MOVIE = gql`
mutation editMovie($Id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: String!, $tags: String!){
    editMovie(Id: $Id,data:{title: $title, overview: $overview, poster_path: $poster_path , popularity:  $popularity, tags:$tags}) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`



const MovieEdit = ({props}) => {
    const {id} = useParams()
    // console.log(id)
  
    const { loading, error, data, refetch } = useQuery(QUERY, {
        variables: { 'Id' : id },
      });
      
    //   console.log(data)
     const [title, setTitle] = useState('')
     const [overview, setOverview] = useState('')
     const [poster_path, setPoster_path] = useState('')
     const [popularity, setPopularity] = useState('')
     const [tags, setTags] = useState('')

     const [editMovie] = useMutation(EDIT_MOVIE)

     if(loading) return <p>Loading....</p>   
    if(error) return <p>Error!!</p>
    
    async function editData (event) {
        
        await setTitle(data.movie.title)
        console.log(data.movie.title)
        if(!overview) await setOverview(data.movie.overview)
        if(!poster_path) await setPoster_path(data.movie.poster_path)
        if(!popularity) await setPopularity(data.movie.popularity)
        if(!tags) await setTags(data.movie.tags)
            
        await editMovie({variables: {'Id' : id,title, overview, poster_path, popularity, tags}})
    
        setTitle('')
        setOverview('')
        setPoster_path('')
        setPopularity('')
        setTags('')
        
        await refetch()
    }


    return (
        <div style={{padding: 200}}>
            <h1>Edit {data.movie.title}</h1>
            <h3>Title :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.movie.title} onChange={(event) => setTitle(event.target.value)}/> <br />
            <h3>Overview :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.movie.overview} onChange={(event) => setOverview(event.target.value)}/> <br />
            <h3>Poster_url :</h3>
            <Input placeholder="Basic usage"  style={{ width: 200 }} defaultValue={data.movie.poster_path} onChange={(event) => setPoster_path(event.target.value)}/> <br />
            <h3>Popularity :</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.movie.popularity} onChange={(event) => setPopularity(event.target.value)} /> <br />
            <h3>Tags:</h3>
            <Input placeholder="Basic usage" style={{ width: 200 }} defaultValue={data.movie.tags} onChange={(event) => setTags(event.target.value)} /> <br />
            
            <Button type="primary" onClick={editData}>Edit Movie</Button>
        </div>
    )

}

export default MovieEdit