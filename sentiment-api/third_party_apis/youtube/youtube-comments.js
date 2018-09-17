const axios = require('axios');
const ApiKey = process.env.API_KEY; //TODO: set an env variable on heroku
const youtubeUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';

// private
// helper function to filter a raw response into an array of comments
const createCommentsArray = (res) => {
  let commentsArray = [];
  // by default  youtube data api send 20 comments back
  if (res.data && res.data.pageInfo && res.data.pageInfo.totalResults) {
    for(let i = 0; i < res.data.pageInfo.totalResults ; i++) {
      commentsArray.push(res.data.items[i].snippet.topLevelComment.snippet.textDisplay);
    }
  }
  return commentsArray;
}

// private function. hits Youtube's api and returnd the comments for a given video id
const fetch = (videoId) => {
  return axios.get(youtubeUrl, {
    params : {
      part: 'snippet',
      videoId: videoId,
      key: ApiKey
    }
  });
}

// public
// returns the raw response object from the YouTube api
// returns [] by default, or in case of error.
const getCommentsById = (videoId) => {
  return fetch(videoId).catch(() => []);
}

// public
// returns only the comment strings for a video
// returns [] by default, or in case of error.
const getCommentsTextById = (videoId) => {
  return fetch(videoId).then(commentObjects => createCommentsArray(commentObjects)).catch(() => []);
}

module.exports =  {
  getCommentsById,
  getCommentsTextById
};