import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { Divider, Card, Button, Skeleton} from "antd";
import { useParams, Link } from "react-router-dom";

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


const MovieDetail = (props) => {
    const {id} = useParams()

    const { loading, error, data} = useQuery(QUERY, {
        variables: { 'Id' : id },
      });
      console.log(data)
    //   const [file, setFile] = useState(data.movie)
      if (loading) return <Skeleton active />;
      if (error) return `Error! ${error}`;

      const url = `/movies/edit/${id}`
    
    console.log(data)
  return (
    <div>
        <img src={data.movie.poster_path} style={{width: 120}}/>
      <Card title={data.movie.title}>
        <p>Overview: {data.movie.overview}</p>
        <p>Popularity: {data.movie.popularity}</p>
        <p>Tags: {data.movie.tags}</p>
        <Button type='primary'><Link to={url}>Edit Movie</Link></Button>
      </Card>
      <Divider />
    </div>
  );
};

export default MovieDetail;
