"use strict";

const {ObjectId} = require("mongodb");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err) => {
        if (err) {
          throw err
        }
        callback(null);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          throw err;
        }
        callback(null, tweets);
      });
    },

    // Find a specific tweet in `db` by id
    findTweet: function(id, callback) {
      db.collection("tweets").findOne({"_id": ObjectId(id)}, (err, tweet) => {
        if (err) {
          throw err;
        }
        console.log('Tweet.likes: ', tweet.likes);
        callback(null, tweet);
      });
    },

    // Update likes of tweet in `db`
    updateLikes: function(id, callback) {
      db.collection("tweets").findOneAndUpdate({"_id": ObjectId(id)}, {$inc: {likes: 1}}, (err, tweet) => {
        if (err) {
          throw err;
        }
        callback(null, tweet);
      });
    }
  };
}
