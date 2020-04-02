const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twitterApi = require('./twitterApi')

// init auth
admin.initializeApp(functions.config().firebase);

// init db
const db = admin.firestore()

// globals
let tweets = [];

// serve tweets
exports.tweets = functions.https.onRequest(async (req, resp) => {
  resp.set('Access-Control-Allow-Origin', '*');
  if(tweets.length) { // see if there's any new tweets since last time, unshift to global 
    const newTweets = await twitterApi.getTweets(functions.config().twitterapi, tweets[0].id);
    tweets.unshift(newTweets);
  } else {            // initial load tweets
    tweets = await twitterApi.getTweets(functions.config().twitterapi)
  }
  resp.send(tweets)
})


// exports.blogs = functions.https.onRequest((req, resp) => {
//   resp.set('Access-Control-Allow-Origin', '*');
//   db.collection('blogs').get().then(snapshot => {
//     let blogs = [];
//     snapshot.forEach(doc => {
//       blogs.push(doc.data())
//     })
//     return resp.send(blogs)
//   }).catch(err => {
//     console.log('There was an error', err);
//   })
// })

