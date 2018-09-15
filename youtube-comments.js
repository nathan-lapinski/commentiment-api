const axios = require('axios');
const videoId = 'kbhWCLbZqj8'; //? get this from chrome extension???
const dummyApiKey = 'AIzaSyDt17FKOXnKgdLYpxTJJD7rc0ajHQFlPfE'; //TODO: figure out how to secure the api ket
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
    key: dummyApiKey
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