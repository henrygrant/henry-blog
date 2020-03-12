const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise');
const OAuth = require('oauth')

admin.initializeApp(functions.config().firebase);

let db = admin.firestore()

exports.blogs = functions.https.onRequest((req, resp) => {
  resp.set('Access-Control-Allow-Origin', '*');
  db.collection('blogs').get().then(snapshot => {
    let blogs = [];
    snapshot.forEach(doc => {
      blogs.push(doc.data())
    })
    return resp.send(blogs)
  }).catch(err => {
    console.log('There was an error', err);
  })
})

exports.tweets = functions.https.onRequest((req, resp) => {
  resp.set('Access-Control-Allow-Origin', '*');

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    functions.config().twitterapi.key,
    functions.config().twitterapi.secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  )

  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json',
    functions.config().twitterapi.mytoken,
    functions.config().twitterapi.mysecret,
    (err, data, res) => {
      if(err) console.error(err);
      resp.send(JSON.parse(data))
    }
  )
})
