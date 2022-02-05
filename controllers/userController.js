const { storeTokenInDb, getAll } = require("../services/userService");
const writeResponse = require("../utils/writeResponse");

const User = require("../schema/user");

exports.getAllUsers = async (req, res) => {
  try {
    User.find((err, doc) => {
      if (err) {
        res.status(500).json(writeResponse(false, "Something went wrong", err));
      } else {
        res
          .status(200)
          .json(writeResponse(true, "Successfully get users", doc));
      }
    });
  } catch (err) {
    res
      .status(500)
      .json(writeResponse(false, "Something went wrong CATCH", err));
  }
};

exports.createUser = async (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;

  if (!email) {
    return res.status(400).json(writeResponse(false, "email is missing"));
  }

  try {
    User.findOne({ email }, (err, doc) => {
      if (err) {
        res.status(500).json(writeResponse(false, "Something went wrong", err));
      } else {
        if (doc) {
          res
            .status(200)
            .json(writeResponse(true, "Successfully get users", doc));
        } else {
          const newUser = new User({ email: email, firstName, subscriptionToken: "" });
          newUser.save(function (err, result) {
            if (err) {
              res
                .status(500)
                .json(writeResponse(false, "Something went wrong", err));
            } else {
              res
                .status(200)
                .json(writeResponse(true, "Successfully create users", result));
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).json(writeResponse(false, "Something went wrong ", err));
  }
};

exports.storeToken = async (req, res) => {
  let subscription = req.body;
  let id = req.params.id;
  await storeTokenInDb(
    id,
    subscription,
    (result) => {
      res
        .status(200)
        .json(writeResponse(true, "Successfully stored token", result));
    },
    (err) =>
      res
        .status(500)
        .json(writeResponse(false, "Could not store token for this user", err))
  );
};

exports.deleteToken = async (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id }, null, (err, doc) => {
    if (err) {
      res.status(500).json(writeResponse(false, "Something went wrong", err));
    } else {
      res
        .status(200)
        .json(writeResponse(true, "Successfully delete user", doc));
    }
  });
};
