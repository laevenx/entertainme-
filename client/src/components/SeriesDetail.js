import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import { Divider, Card, Button, Skeleton} from "antd";
import { useParams, Link } from "react-router-dom";

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


const MovieDetail = (props) => {
    const {id} = useParams()

    const { loading, error, data} = useQuery(QUERY, {
        variables: { 'Id' : id },
      });
      console.log(data)
    //   const [file, setFile] = useState(data.movie)
      if (loading) return <Skeleton active />;
      if (error) return `Error! ${error}`;

      const url = `/series/edit/${id}`
    
    console.log(data)
  return (
    <div>
        <img src={data.serie.poster_path} style={{width: 120}}/>
      <Card title={data.serie.title}>
        <p>Overview: {data.serie.overview}</p>
        <p>Popularity: {data.serie.popularity}</p>
        <p>Tags: {data.serie.tags}</p>
        <Button type='primary'><Link to={url}>Edit Movie</Link></Button>
      </Card>
      <Divider />
    </div>
  );
};

export default MovieDetail;
