let tweets = [
  {
    id: 1,
    text: "hello1",
    createdAt: Date.now().toString(),
    name: "Bob",
    userName: "bob",
    url: "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
  },
  {
    id: 2,
    text: "hello2",
    createdAt: Date.now().toString(),
    name: "Kate",
    userName: "kate",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export function getAll() {
  return tweets;
}

export function getAllByUserName(userName) {
  return tweets.filter((tweet) => tweet.userName === userName);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === Number(id));
}

export function create(text, name, userName) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    userName,
  };

  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === Number(id));
  if (tweet) {
    tweet.text = text;
  }
  return text;
}

//javascript 자체에 delete가 있으므로 사용할 수 없음
export function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
