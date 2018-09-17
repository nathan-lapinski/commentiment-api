var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var youtube = require('../sentiment-api/third_party_apis/youtube/youtube-comments');

var appRouter = function (app) {

  // Sentiment endpoint for Youtube comments. Other endpoints can follow a similar convention
  // for instance, sentiment/tw for something like Twitter.
  app.get("/sentiment/yt", function(req, res) {
    if (req.query.id) {
        youtube.getCommentsTextById(req.query.id)
               .then(comments => {
                 const results = comments.map(c => sentiment.analyze(c));
                 res.status(200).send(results);
               }).catch(err => res.status(500).send(`Error getting comment sentiment: ${err}`));
    } else {
        res.status(200).send([]);
    }
  });

  app.get("/*", function(req, res) {
    res.status(200).send('Go to /sentiment to do stuff');
  });
}

module.exports = appRouter;