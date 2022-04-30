import React from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useLocation, Link, useNavigate } from "react-router-dom";
import uploadImage from "../utils/fileUpload";
import Loading from "./Loading";
import Modal from "./Modal";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const RecipeForm = () => {
  const queryID = useQuery().get("id");
  const location = useNavigate();

  const {
    createRecipe,
    isLoading,
    isModalOpen,
    showLoading,
    recipeData,
    updateData,
    isEditing,
    getDataToUpdate,
    cancelUpdate,
  } = useGlobalContext();

  const { ingredients, instructions } = recipeData;

  const [tempData, setTempData] = React.useState(recipeData);

  const imageRef = React.useRef(null);

  const [ingredient, setIngredient] = React.useState([
    { id: `ing${Date.now().toString()}`, name: "ingredient", value: "" },
  ]);

  const [instruction, setInstruction] = React.useState([
    { id: `ins${Date.now().toString()}`, name: "instruction", value: "" },
  ]);

  const [imageFile, setImageFile] = React.useState({});

  const handleInsertInput = (e, id, index, name) => {
    e.preventDefault();
    if (index === 0) {
      if (name === "ingredient") {
        setIngredient([
          ...ingredient,
          { id: `ing${Date.now().toString()}`, name: "ingredient", value: "" },
        ]);
      } else {
        setInstruction([
          ...instruction,
          { id: `ins${Date.now().toString()}`, name: "instruction", value: "" },
        ]);
      }
    } else {
      if (name === "ingredient") {
        setIngredient(ingredient.filter((item) => item.id !== id));
      } else {
        setInstruction(instruction.filter((item) => item.id !== id));
      }
    }
  };

  const handleArrayInput = (id, { currentTarget: input }, name) => {
    if (name === "ingredient") {
      setIngredient(
        ingredient.map((item) => {
          if (id === item.id) {
            return { ...item, value: input.value };
          }
          return item;
        })
      );
    } else {
      setInstruction(
        instruction.map((item) => {
          if (id === item.id) {
            return { ...item, value: input.value };
          }
          return item;
        })
      );
    }
  };

  const handleTextInput = ({ currentTarget: input }) => {
    setTempData({ ...tempData, [input.name]: input.value });
    console.log(tempData);
  };

  const handleInputImage = ({ currentTarget: input }) => {
    setImageFile(input.files[0]);
  };

  const clearForm = async () => {
    if (!isEditing) {
      setIngredient([
        { id: `ing${Date.now().toString()}`, name: "ingredient", value: "" },
      ]);
      setInstruction([
        { id: `ins${Date.now().toString()}`, name: "instruction", value: "" },
      ]);
      setTempData({
        recipeName: "",
        menuType: "",
        description: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        instructions: [],
        ingredients: [],
        imageName: "",
        imageURL: "",
      });
      imageRef.current.value = "";
      return;
    }
    cancelUpdate();
  };

  const handleSubmit = async () => {
    showLoading();
    if (!isEditing) {
      const { imageURL, imageName } = await uploadImage(imageFile);
      const newData = { ...tempData, imageName, imageURL };
      createRecipe(newData);
    } else {
      // edit data
      if (imageRef.current.value !== "") {
        const { imageURL, imageName } = await uploadImage(imageFile);
        const newData = { ...tempData, imageName, imageURL };
        updateData(queryID, newData);
        location("/recipe-form");
      } else {
        const newData = { ...tempData };
        updateData(queryID, newData);
        location("/recipe-form");
      }
    }
  };

  React.useEffect(() => {
    setTempData((prev) => {
      return { ...prev, ingredients: ingredient.map((ing) => ing.value) };
    });

    setTempData((prev) => {
      return { ...prev, instructions: instruction.map((ins) => ins.value) };
    });
  }, [ingredient, instruction]);

  React.useEffect(() => {
    if (queryID) {
      // fetch data to edit
      getDataToUpdate(queryID);
    }
  }, [queryID, getDataToUpdate]);

  React.useEffect(() => {
    setTempData(recipeData);
    if (ingredients.length !== 0) {
      setIngredient(
        ingredients.map((item, index) => {
          return {
            id: `ing${Date.now().toString()}${index}`,
            name: "ingredient",
            value: item,
          };
        })
      );
    } else {
      setIngredient([
        { id: `ing${Date.now().toString()}`, name: "ingredient", value: "" },
      ]);
    }
    if (instructions.length !== 0) {
      setInstruction(
        instructions.map((item, index) => {
          return {
            id: `ins${Date.now().toString()}${index}`,
            name: "instruction",
            value: item,
          };
        })
      );
    } else {
      setInstruction([
        { id: `ins${Date.now().toString()}`, name: "instruction", value: "" },
      ]);
    }
  }, [recipeData, ingredients, instructions]);

  return (
    <form className='form' id='form'>
      {/* recipe name */}
      <input
        type='text'
        name='recipeName'
        className='form-input'
        placeholder='Recipe name'
        value={tempData.recipeName}
        onChange={handleTextInput}
      />
      {/* menu type */}
      <input
        type='text'
        name='menuType'
        className='form-input'
        placeholder='Menu type'
        value={tempData.menuType}
        onChange={handleTextInput}
      />
      {/* description */}
      <textarea
        type='text'
        name='description'
        className='form-textarea'
        placeholder='Description'
        value={tempData.description}
        onChange={handleTextInput}
      />
      {/* prep | cook | servings */}
      <div className='form-row'>
        <input
          type='number'
          name='prepTime'
          className='form-input'
          min={0}
          placeholder='Prep time'
          value={tempData.prepTime}
          onChange={handleTextInput}
        />
        <input
          type='number'
          name='cookTime'
          className='form-input'
          min={0}
          placeholder='Cook time'
          value={tempData.cookTime}
          onChange={handleTextInput}
        />
        <input
          type='text'
          name='servings'
          className='form-input'
          placeholder='Servings'
          value={tempData.servings}
          onChange={handleTextInput}
        />
      </div>
      {/* image input */}
      <div className='form-group'>
        <label htmlFor='image' className='form-label'>
          food image
        </label>
        <input
          ref={imageRef}
          type='file'
          accept='image/*'
          name='imageName'
          id='image'
          className='form-input'
          placeholder='Servings'
          onChange={handleInputImage}
        />
      </div>
      {/* ingredients input */}
      <label htmlFor='image' className='form-label'>
        ingredients
      </label>
      {ingredient.map((item, index) => {
        const { id, name } = item;
        if (name === "ingredient") {
          return (
            <div className='form-row' key={index}>
              <input
                type='text'
                name={`ingredient #${index + 1}`}
                value={ingredient[index].value}
                onChange={(e) => handleArrayInput(id, e, "ingredient")}
                className='form-input'
                placeholder={`Ingredient #${index + 1}`}
              />
              {index === 0 ? (
                <FaRegPlusSquare
                  name='add-icon'
                  className='form-icons'
                  onClick={(e) => handleInsertInput(e, id, index, name)}
                />
              ) : (
                <FaRegMinusSquare
                  name='minus-icon'
                  className='form-icons'
                  onClick={(e) => handleInsertInput(e, id, index, name)}
                />
              )}
            </div>
          );
        }
        return item;
      })}
      {/* instructrions input */}
      <label htmlFor='image' className='form-label'>
        instructions
      </label>
      {instruction.map((item, index) => {
        const { id, name } = item;
        if (name === "instruction") {
          return (
            <div className='form-row' key={index}>
              <textarea
                type='text'
                name={`Instruction #${index + 1}`}
                value={instruction[index].value}
                onChange={(e) => handleArrayInput(id, e, "instruction")}
                className='form-textarea small'
                placeholder={`Instruction #${index + 1}`}
              />
              {index === 0 ? (
                <FaRegPlusSquare
                  name='add-icon'
                  className='form-icons'
                  onClick={(e) => handleInsertInput(e, id, index, name)}
                />
              ) : (
                <FaRegMinusSquare
                  name='minus-icon'
                  className='form-icons'
                  onClick={(e) => handleInsertInput(e, id, index, name)}
                />
              )}
            </div>
          );
        }
        return item;
      })}
      <br />
      <div className='form-row'>
        <button
          type='button'
          className='btn btn-block btn-hipster blue'
          onClick={handleSubmit}
        >
          {!isEditing ? "submit" : "save"}
        </button>
        {!isEditing && (
          <button
            type='button'
            className='btn btn-block btn-hipster red'
            onClick={clearForm}
          >
            clear
          </button>
        )}
        {isEditing && (
          <Link to={"/"} className='btn-block'>
            <button
              type='button'
              className='btn btn-block btn-hipster red'
              onClick={clearForm}
            >
              cancel
            </button>
          </Link>
        )}
      </div>
      {isLoading && <Loading />}
      {isModalOpen && <Modal />}
    </form>
  );
};

export default RecipeForm;
