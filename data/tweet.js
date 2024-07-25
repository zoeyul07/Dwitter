import * as userRepository from "./auth.js";

let tweets = [];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepository.findById(tweet.userId);
      return { ...tweet, ...user };
    })
  );
}

export async function getAllByUserName(userName) {
  return getAll().then((tweets) => {
    tweets.filter((tweet) => tweet.userName === userName);
  });
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.findById(found.userId);
  return { ...found, user };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    userId,
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === Number(id));
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

//javascript 자체에 delete가 있으므로 사용할 수 없음
export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
