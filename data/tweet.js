import { getTweets } from "../db/database.js";
import * as userRepository from "./auth.js";

import MongoDb from "mongodb";

// prettier-ignore
const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
}

export async function getAllByUserName(userName) {
  return getTweets()
    .find({ userName })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, userName, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createAt: new Date(),
    userId,
    name,
    userName,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      //업데이트 된 후의 데이터를 받아옴
      { returnDocument: "after" }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

//javascript 자체에 delete가 있으므로 사용할 수 없음
export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
