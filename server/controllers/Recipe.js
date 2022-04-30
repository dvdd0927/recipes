const { BadRequestError, NotFoundError } = require("../errors");
const RecipeSchema = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");

const getAllRecipe = async (req, res) => {
  const data = await RecipeSchema.find({});

  res.status(StatusCodes.OK).json(data);
};

// searching recipe and getting single recipe
const getQueryRecipe = async (req, res) => {
  const { name, id } = req.query;

  // get by id
  if (id) {
    const recipeData = await RecipeSchema.findOne({ _id: id });

    if (!recipeData) {
      throw new NotFoundError("No recipe available");
    }
    return res.status(StatusCodes.OK).json(recipeData);
  }

  if (name === "") {
    const recipeData = await RecipeSchema.find({});

    return res.status(StatusCodes.OK).json(recipeData);
  }

  // get by name
  if (name) {
    const recipeData = await RecipeSchema.find({
      recipeName: { $regex: name, $options: "i" },
    });

    return res.status(StatusCodes.OK).json(recipeData);
  }
};

const createRecipe = async (req, res) => {
  const newData = await RecipeSchema.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "New Recipe Added!", data: newData });
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;

  const checkData = await RecipeSchema.findOne({ _id: id });
  if (!checkData) {
    return res.status(StatusCodes.OK).json({ msg: "No Data Found!" });
  }

  const newRecipe = await RecipeSchema.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ msg: "Recipe Updated!", data: newRecipe });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const checkData = await RecipeSchema.findOne({ _id: id });
  if (!checkData) {
    throw new NotFoundError("No recipe found");
  }

  await RecipeSchema.findOneAndRemove({ _id: id });

  res.status(StatusCodes.OK).json({ msg: "Recipe Deleted!" });
};

module.exports = {
  getAllRecipe,
  getQueryRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
