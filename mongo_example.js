"use strict";

// Equals to ES6 below - const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, tweets) => {
    if (err) {
      throw err;
    }
    console.log("Logging Each tweet:");
    for(let tweet of tweets) {
      console.log(tweet);
    }
    db.close();
  });
});