import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res, next) {
  const userName = req.query.userName;
  const data = await (userName
    ? tweetRepository.getAllByUserName(userName)
    : tweetRepository.getAll());

  res.status(200).json(data);
}
export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text, name, userName } = req.body;
  const tweet = await tweetRepository.create(text, name, userName);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;

  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.param.id;
  const tweet = await tweetRepository.remove(id);
  res.sendStatus(204);
}
