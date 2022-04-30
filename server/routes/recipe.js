const router = require("express").Router();

const {
  getAllRecipe,
  getQueryRecipe,
  updateRecipe,
  deleteRecipe,
  createRecipe,
} = require("../controllers/Recipe");

router.route("/").get(getAllRecipe).post(createRecipe);
router.route("/query").get(getQueryRecipe);
router.route("/:id").patch(updateRecipe).delete(deleteRecipe);

module.exports = router;
