const Recipe = require("../schema/recipe");
const writeResponse = require("../utils/writeResponse");

exports.getAll = async (req, res) => {
  Recipe.find((err, doc) => {
    if (err) {
      res.status(500).json(writeResponse(false, "Something went wrong", err));
    } else {
      res
        .status(200)
        .json(writeResponse(true, "Successfully get recipes", doc));
    }
  });
};

exports.add = async (req, res) => {
  let recipeName = req.body.recipeName;
  let basket = req.body.basket;
  let image = req.body.image;

  console.log("ADD ? ", req.body);

  try {
    const newRecipe = new Recipe({ recipeName, basket, image });
    newRecipe.save(function (err, result) {
      if (err) {
        res.status(500).json(writeResponse(false, "Something went wrong", err));
      } else {
        res
          .status(201)
          .json(writeResponse(true, "Successfully add recipe", result));
      }
    });
  } catch (err) {
    res.status(500).json(writeResponse(false, "Something went wrong", err));
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  Recipe.deleteOne({ _id: id }, null, (err, doc) => {
    if (err) {
      res.status(500).json(writeResponse(false, "Something went wrong", err));
    } else {
      res
        .status(200)
        .json(writeResponse(true, "Successfully delete recipe", doc));
    }
  });
};
