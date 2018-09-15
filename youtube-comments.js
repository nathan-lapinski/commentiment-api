require('dotenv/config');
const axios = require('axios');
const videoId = 'kbhWCLbZqj8'; //? get this from chrome extension???
const ApiKey = process.env.API_KEY; //TODO: set an env variable on heroku
const youtubeUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';
const commentimentUrl = 'https://commentiment.herokuapp.com/sentiment';

const createCommentsArray = (res) => {
  let commentsArray = [];
    // by default  youtube data api send 20 comments back
    for(let i = 0; i < res.data.pageInfo.totalResults ; i++) {
      commentsArray.push(res.data.items[i].snippet.topLevelComment.snippet.textDisplay);
    }
    return commentsArray;
}

const getCommentsSentiment = (comments) => {
  axios.post(commentimentUrl, {
    "comments": comments
  }).then(res => {
    console.log(res.data);
  })
}

axios.get(youtubeUrl, {
  params : {
    part: 'snippet',
    videoId: videoId,
    key: ApiKey
  }
})
  .then(response => {
    // axios converts JSON to object automatically
    return response;
  })
  .then(res => {
    return createCommentsArray(res);
  })
  .then(comments => {
    getCommentsSentiment(comments);
  })
  .catch(err => {
    console.log(err);
  });