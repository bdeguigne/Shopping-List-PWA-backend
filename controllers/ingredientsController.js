const fs = require("fs");
const { dirname } = require("path");
const writeResponse = require("../utils/writeResponse");
const appDir = dirname(require.main.filename);

exports.getAll = (req, res) => {
  const path = appDir + "/public/images/ingredients/";
  try {
    const filesArray = fs
      .readdirSync(path)
      .filter((file) => fs.lstatSync(path + file).isFile());
    const filesWithPath = filesArray.map((file) => "images/ingredients/" + file);
    res.json(writeResponse(true, "Ingrédients", filesWithPath));
  } catch (error) {
    res.status(500).json(writeResponse(false, "Cannot get ingrédients", error));
  }
};
