var Sentiment = require('sentiment');
var sentiment = new Sentiment();


var appRouter = function (app) {
  app.post("/sentiment", function(req, res) {
    
    console.log(req.body);
    if (req.body.comments) {

        const results = req.body.comments.map(c => sentiment.analyze(c));

        res.status(200).send(results);
    } else {
        res.status(200).send('No Query specified: ' + sentiment.analyze('Cats are stupid.'));
    }
  });

  app.get("/", function(req, res) {
    res.status(200).send('Go to /sentiment to do stuff');
  });
}

module.exports = appRouter;
