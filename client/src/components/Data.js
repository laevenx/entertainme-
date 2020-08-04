import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Divider, Card, Row, Col } from "antd";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const DELETE_MOVIE = gql`
mutation deleteMovie($Id: ID!){
    deleteMovie(Id : $Id){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`;

const DELETE_SERIE = gql`
mutation deleteSerie($Id: ID!){
    deleteSerie(Id : $Id){
        title
        overview
        poster_path
        popularity
        tags
    }
}
`;

const Data = (props) => {
  let { id, data, category, refetch } = props;
  let url;

  const [title, ] = useState(data.title);
  const [tags, ] = useState(data.tags);
  //   const [overview, setOverview] = useState(data.overview);
  const [popularity, ] = useState(data.popularity);

  const [deleteMovie] = useMutation(DELETE_MOVIE);
  const [deleteSerie] = useMutation(DELETE_SERIE);
  

  console.log(props);

  if (category === "movies") {
    url = `/movies/${id}`;
  } else if (category === "series") {
    url = `/series/${id}`;
  }

  async function deleteData() {
    if (category === "movies") {
        await deleteMovie({variables: {'Id' : id}})
        await refetch()
    } else if (category === "series") {
        await deleteSerie({variables: {'Id' : id}})
        await refetch()
    }
    
  }

  return (
    <div>
      <img placeholder="pic" src={data.poster_path} style={{ width: 200,margin: 0 }} />
      <Card title={title} style={{width: 200}}>
        <p>{tags}</p>
        <p>Popularity: {popularity}</p>
        <Button type="primary">
              <Link to={url}>Detail</Link>
            </Button>
            <Button type="primary" onClick={deleteData}>
              Delete
            </Button>
      </Card>
     
    </div>
  );
};

export default Data;
