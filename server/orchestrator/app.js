const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const redis = require("./redis");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: String
    tags: String
  }

  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: String
    tags: String
  }

  type Query {
    movies: [Movie]
    movie(Id: ID!): Movie
    series: [Serie]
    serie(Id: ID!): Serie
  }

  input InputData {
    title: String!
    overview: String!
    poster_path: String!
    popularity: String!
    tags: String!
  }

  type Mutation {
    addMovie(data: InputData): Movie
    addSerie(data: InputData): Serie
    deleteSerie(Id: ID!): Serie
    deleteMovie(Id: ID!): Movie
    editMovie(Id: ID!, data: InputData): Movie
    editSerie(Id: ID!, data: InputData): Serie
  }
`;

const movieurl = "http://localhost:3001/movies";
const serieurl = "http://localhost:3002/series";

const resolvers = {
  Query: {
    movies: async () => {
      const cache = await redis.get("movies");
      try {
        const cache = await redis.get("movies");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(movieurl);
          const result = data;
          console.log(result);
          await redis.set("movies", JSON.stringify(result));
          return result;
        }
      } catch (e) {
        console.log(e);
      }
    },
    movie: (parent, args, context, info) => {
      const { Id } = args;
      console.log(Id);
      return axios({
        url: `http://localhost:3001/movies/${Id}`,
        method: "get",
      })
        .then(({ data }) => {
          console.log(data);
          return data[0];
        })
        .catch(console.log);
    },
    series: async () => {
      const cache = await redis.get("series");
      try {
        const cache = await redis.get("series");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios.get(serieurl);
          const result = data;
          console.log(result);
          await redis.set("series", JSON.stringify(result));
          return result;
        }
      } catch (e) {
        console.log(e);
      }

      // return axios({
      //   url: "http://localhost:3002/series",
      //   method: "get",
      // })
      //   .then(({ data }) => {
      //     return data;
      //   })
      //   .catch(console.log);
    },
    serie: (parent, args, context, info) => {
      const { Id } = args;
      return axios({
        url: `http://localhost:3002/series/${Id}`,
        method: "get",
      })
        .then(({ data }) => {
          return data[0];
        })
        .catch(console.log);
    },
  },
  Mutation: {
    addSerie: async (_, args) => {
      try {
        let cache = await redis.get("series");

        const { data } = await axios.post(serieurl + "/add", args.data);
        cache = JSON.parse(cache);
        const result = data;
        console.log(result);

        if (cache) {
          cache.result = cache.push(result.data[0]);
          await redis.set("series", JSON.stringify(cache));
          return result.data[0];
        } else {
          const { data } = await axios.get(url);
          // .then(({data}) => {
          await redis.set("series", JSON.stringify(data));
          return result.data[0];
        }
      } catch (e) {
        console.log(e);
      }

      // const Serie = await axios.post("http://localhost:3002/series/add", args.data)
      // const result = Serie.data
      // return result.data[0]
      // const { data } = args;
      // return axios
      //   .post("http://localhost:3002/series/add", data)
      //   .then(({ data }) => {
      //     return data;
      //   })
      //   .catch(console.log);
    },
    editSerie: async (_, args) => {
      try {
        const { Id } = args;
        let cache = await redis.get("series");
        const { data } = await axios.put(serieurl + `/${Id}`, args.data);
        cache = JSON.parse(cache);
        if (cache) {
          cache.map((data) => {
            if (data._id == Id) {
              // console.log(args.data.title)
              data.title = args.data.title;
              data.overview = args.data.overview;
              data.poster_path = args.data.poster_path;
              data.popularity = args.data.popularity;
              data.tags = args.data.tags;
            }
          });
          await redis.set("series", JSON.stringify(cache));
        } else {
          const { data } = await axios.get(serieurl);
          await redis.set("series", JSON.stringify(data));
        }
        console.log(data);
        return data.result[0];
      } catch (e) {
        console.log(e);
      }
      // const { data,Id } = args;
      // return axios
      //   .put(`http://localhost:3002/series/${Id}`, data)
      //   .then(({ data }) => {
      //     return data.result[0];
      //   })
      //   .catch(console.log);
    },
    deleteSerie: async (_, args) => {
      try {
        const { Id } = args;
        // let cache = await redis.get("movies");

        const { data } = await axios.delete(serieurl + `/${Id}`);

        await redis.del("series");
        const movies = await axios.get(serieurl);
        await redis.set("series", JSON.stringify(movies.data));

        return data;
      } catch (e) {
        console.log(e);
      }
      // const { Id } = args;
      // return axios
      //   .delete(`http://localhost:3002/series/${Id}`)
      //   .then(({ data }) => {
      //     return data;
      //   })
      //   .catch(console.log);
    },
    addMovie: async (_, args) => {
      try {
        let cache = await redis.get("movies");

        const { data } = await axios.post(movieurl + "/add", args.data);
        cache = JSON.parse(cache);
        const result = data;
        console.log(result);

        if (cache) {
          cache.result = cache.push(result.data[0]);
          await redis.set("movies", JSON.stringify(cache));
          return result.data[0];
        } else {
          const { data } = await axios.get(url);
          // .then(({data}) => {
          await redis.set("movies", JSON.stringify(data));
          return result.data[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    editMovie: async (_, args) => {
      try {
        const { Id } = args;
        let cache = await redis.get("movies");
        const { data } = await axios.put(movieurl + `/${Id}`, args.data);
        cache = JSON.parse(cache);
        if (cache) {
          cache.map((data) => {
            if (data._id == Id) {
              // console.log(args.data.title)
              data.title = args.data.title;
              data.overview = args.data.overview;
              data.poster_path = args.data.poster_path;
              data.popularity = args.data.popularity;
              data.tags = args.data.tags;
            }
          });
          await redis.set("movies", JSON.stringify(cache));
        } else {
          const { data } = await axios.get(movieurl);
          await redis.set("movies", JSON.stringify(data));
        }
        console.log(data);
        return data.result[0];
      } catch (e) {
        console.log(e);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { Id } = args;
        // let cache = await redis.get("movies");

        const { data } = await axios.delete(movieurl + `/${Id}`);

        await redis.del("movies");
        const movies = await axios.get(movieurl);
        await redis.set("movies", JSON.stringify(movies.data));

        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
