const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var ObjectID = require("mongodb").ObjectID;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect("mongodb://localhost:27017", (err, database) => {
  if (err) return console.log(err);

  app.listen(3002, () => {
    console.log("app TV Series working on 3002");
  });

  // let movieDB = database.db("movies");
    let tvDB = database.db("tvseries")

  app.post("/series/add", (req, res, next) => {
    let movie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };

    tvDB.collection("series").save(movie, (err, result) => {
      if (err) throw err;
      res.send({info: 'add series successfully',data : result.ops});
    });
  });

  app.get("/series", (req, res, next) => {
    tvDB
      .collection("series")
      .find()
      .toArray((err, results) => {
        res.send(results);
      });
  });

  app.get("/series/:id", (req, res, next) => {
    if (err) {
      throw err;
    }

    let id = ObjectID(req.params.id);
    tvDB
      .collection("series")
      .find(id)
      .toArray((err, result) => {
        if (err) {
          throw err;
        }

        res.send(result);
      });
  });

  app.put("/series/:id", (req, res, next) => {
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

      tvDB
      .collection("series")
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
          tvDB
            .collection("series")
            .find(id)
            .toArray((err, result) => {
              if (err) {
                throw err;
              }
      
              res.send({info:'series updated sucessfully',result});
            });

        }
      );
  });

  app.delete("/series/:id", (req, res, next) => {
    let id = ObjectID(req.params.id);

    tvDB.collection("series").deleteOne({ _id: id }, (err, result) => {
      if (err) {
        throw err;
      }

      res.send("series deleted");
    });
  });
});
