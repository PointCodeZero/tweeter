# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

A simple sigle-page AJAX-based Twitter clone build with front-end HTML5 & CSS, JavaScript and jQuery, and back-end NodeJS, Express and MongoDB.

## Functionality

Users will be able to create new tweets with a maximum of 140 characters. Tweets will be displayed on the top of the page by chronological order. You can like unlimited times the same tweet.

## Images

!["Screenshot of form"](https://github.com/PointCodeZero/tweeter/blob/master/docs/form.jpg?raw=true)
!["Screenshot of tweets hover"](https://github.com/PointCodeZero/tweeter/blob/master/docs/hover.jpg?raw=true)
!["Screenshot of form error"](https://github.com/PointCodeZero/tweeter/blob/master/docs/error.jpg?raw=true)

## Dependencies

- MongoDB
- Node.js 5.10.x or above
- Express
- body-parser
- chance
- md5

## Getting Started

1. Install all dependencies (run `npm install` command).
2. Run the development web server using the `node ./server/index.js` command.

### Expected Usage

This program should be executed from the browser, in the following manner:

1. Go to your browser address bar and open `http://localhost/8080/`.
2. Click on the navbar button `Compose`.
3. Add a new tweet that's 140 characters maximum.
4. The new tweet will be displayed at the top of the list.
5. You can like tweets by clicking on the heart icon when hovering through a tweet.

