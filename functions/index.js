const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
