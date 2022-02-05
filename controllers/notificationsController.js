const writeResponse = require("../utils/writeResponse");
const webPush = require("../utils/web-push.js");
const { storeTokenInDb } = require("../services/userService");
const User = require("../schema/user");

exports.subscribe = async (req, res) => {
  let subscription = req.body;
  console.log("SUB ?", subscription);
  const payload = {
    title: "Vous êtes bien souscrit aux notifications ! 🔔 ",
    icon: "/assets/icons/icon-128x128.png",
    body: "",
    data: { url: "https://google.co.in" },
    vibrate: [
      500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
      40, 500,
    ],
  };

  webPush
    .sendNotification(subscription, JSON.stringify(payload))
    .then((result) => {
      // storeTokenInDb(subscription);
      return res
        .status(200)
        .json(writeResponse(true, "Send notifications success !", result));
    })
    .catch((e) => {
      console.log("error", e.stack);
      res
        .status(500)
        .json(writeResponse(false, "Cannot send notifications", err));
    });
};

const send = (subscription, recipeName, recipeId) => {
  const payload = {
    title: "A new recipe is available ! 👨‍🍳",
    icon: "/assets/icons/icon-128x128.png",
    body: recipeName,
    data: { url: `${process.env.REACT_APP_URL}/recipes/${recipeId}` },
    vibrate: [
      500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
      40, 500,
    ],
  };
  webPush
    .sendNotification(subscription, JSON.stringify(payload))
    .then((result) => console.log(result))
    .catch((e) => console.log("error", e.stack));
};

exports.sendNotificationToAllUsers = async (req, res) => {
  const recipeName = req.body.recipeName;
  const recipeId = req.body.recipeId;

  User.find((err, documents) => {
    if (err) {
      res.status(500).json(writeResponse(false, "Something went wrong", err));
    } else {
      documents.forEach((doc) => {
        const subscriptionToken = doc.subscriptionToken;
        send(subscriptionToken, recipeName, recipeId);
      });
      res
        .status(200)
        .json(
          writeResponse(true, "Successfully send notifications", documents)
        );
    }
  });
};
