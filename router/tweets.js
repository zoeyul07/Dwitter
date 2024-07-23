import express from "express";
import "express-async-errors";

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
const router = express.Router();

//GET /tweets
//GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const userName = req.query.userName;
  const data = userName
    ? tweets.filter((tweet) => tweet.userName === userName)
    : tweets;

  res.status(200).json(data);
});

//GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === Number(id));
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
});

//POST /tweets
router.post("/", (req, res, next) => {
  console.log("hello");
  // console.log(req);

  const { text, name, userName } = req.body;

  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    userName,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

//PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  console.log(id, tweets);
  const tweet = tweets.find((tweet) => tweet.id === Number(id));
  console.log(tweet);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id:${id} not found` });
  }
});

//DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.param.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});

export default router;
