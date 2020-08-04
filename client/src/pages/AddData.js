import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import {Link} from 'react-router-dom'
import { Button, Input, Select, message } from "antd";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const { Option } = Select;

const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: String!
    $tags: String!
  ) {
    addMovie(
      data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const ADD_SERIE = gql`
  mutation addSerie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: String!
    $tags: String!
  ) {
    addSerie(
      data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function AddData() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const [addMovie] = useMutation(ADD_MOVIE);
  const [addSerie] = useMutation(ADD_SERIE);

  const addNewData = (event) => {
    // console.log([title,overview,poster_path,popularity,tags])
    if (
      !title ||
      !overview ||
      !poster_path ||
      !popularity ||
      !tags ||
      !category
    ) {
      message.error("please fill all empty field!!");
    } else {
      if (category === "movies") {
        addMovie({
          variables: { title, overview, poster_path, popularity, tags },
        });
        message.info("Add Movie Completed");
      } else if (category === "series") {
        addSerie({
          variables: { title, overview, poster_path, popularity, tags },
        });
        message.info("Add Serie Completed");
      }
      setTitle("");
      setOverview("");
      setPoster_path("");
      setPopularity("");
      setTags("");
    }

    event.preventDefault();
  };

  return (
    <div style={{margin: 'auto', padding: 10, textalign: 'center'}}>
      <h1>Add New Title</h1>
      <h3>Title :</h3>
      <Input
        placeholder="Basic usage"
        style={{ width: 200 }}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />{" "}
      <br />
      <h3>Overview :</h3>
      <Input
        placeholder="Basic usage"
        style={{ width: 200 }}
        value={overview}
        onChange={(event) => setOverview(event.target.value)}
      />{" "}
      <br />
      <h3>Poster_url :</h3>
      <Input
        placeholder="Basic usage"
        style={{ width: 200 }}
        value={poster_path}
        onChange={(event) => setPoster_path(event.target.value)}
      />{" "}
      <br />
      <h3>Popularity :</h3>
      <Input
        placeholder="Basic usage"
        style={{ width: 200 }}
        value={popularity}
        onChange={(event) => setPopularity(event.target.value)}
      />{" "}
      <br />
      <h3>Tags:</h3>
      <Input
        placeholder="Basic usage"
        style={{ width: 200 }}
        value={tags}
        onChange={(event) => setTags(event.target.value)}
      />{" "}
      <br />
      <h3>Category:</h3>
      <Select
        defaultValue="select"
        style={{ width: 120 }}
        onChange={(value) => setCategory(value)}
      >
        <Option value="movies">Movies</Option>
        <Option value="series">Series</Option>
      </Select>
      <br></br>
      <br />
      <Button type="primary" onClick={addNewData}>
        Add
      </Button>
    </div>
  );
}
