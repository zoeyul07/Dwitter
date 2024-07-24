import * as tweetRepository from "../data/tweet.js";

export function getTweets(req, res, next) {
  const userName = req.query.userName;
  const data = userName
    ? tweetRepository.getAllByUserName(userName)
    : tweetRepository.getAll();

  res.status(200).json(data);
}
export function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
}

export function createTweet(req, res, next) {
  const { text, name, userName } = req.body;
  const tweet = tweetRepository.create(text, name, userName);
  res.status(201).json(tweet);
}

export function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;

  const tweet = tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
}

export function deleteTweet() {
  (req, res, next) => {
    const id = req.param.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
  };
}
