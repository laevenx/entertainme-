const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var ObjectID = require("mongodb").ObjectID;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect("mongodb://localhost:27017", (err, database) => {
  if (err) return console.log(err);

  app.listen(3001, () => {
    console.log("app movies working on 3001");
  });

  let movieDB = database.db("movies");
  //   let tvDB = database.db("tvseries")

  app.post("/movies/add", (req, res, next) => {
    let movie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    movieDB.collection("movie").save(movie, (err, result) => {
      if (err) throw err;
      res.send({info: 'add movie successfully',data : result.ops});
    });
  });

  app.get("/movies", (req, res, next) => {
    movieDB
      .collection("movie")
      .find()
      .toArray((err, results) => {
        res.send(results);
      });
  });

  app.get("/movies/:id", (req, res, next) => {
    if (err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    movieDB
      .collection("movie")
      .find(id)
      .toArray((err, result) => {
        if (err) {
          throw err;
        }

        res.send(result);
      });
  });

  app.put("/movies/:id", (req, res, next) => {
    var id = {
      _id: new ObjectID(req.params.id),
    };

    let movie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      };

    movieDB
      .collection("movie")
      .update(
        id,
        {
          $set: movie,
        },
        (err, result) => {
          if (err) {
            throw err;
          }

          let id = ObjectID(req.params.id);
          movieDB
            .collection("movie")
            .find(id)
            .toArray((err, result) => {
              if (err) {
                throw err;
              }
      
              res.send({info:'user updated sucessfully',result});
            });

        //   res.send("user updated sucessfully");
        }
      );
  });

  app.delete("/movies/:id", (req, res, next) => {
    let id = ObjectID(req.params.id);

    movieDB.collection("movie").deleteOne({ _id: id }, (err, result) => {
      if (err) {
        throw err;
      }

      res.send("user deleted");
    });
  });
});
