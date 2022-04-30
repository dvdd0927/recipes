const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  menuType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cookTime: {
    type: Number,
    required: true,
  },
  prepTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
