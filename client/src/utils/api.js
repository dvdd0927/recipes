import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "/recipes";

export const getAllRecipe = async () => {
  const { data } = await axios(API_URL);
  return data;
};

export const findRecipe = async (info, type) => {
  if (type === "ID") {
    const { data } = await axios(`${API_URL}/query?id=${info}`);
    return data;
  }

  if (type === "SEARCH") {
    const { data } = await axios(`${API_URL}/query?name=${info}`);
    return data;
  }
};

export const insertRecipe = async (recipeData) => {
  const { data } = await axios.post(API_URL, recipeData);
  return data;
};

export const deleteRecipe = async (recipeID) => {
  const { data } = await axios.delete(`${API_URL}/${recipeID}`);
  return data;
};

export const updateRecipe = async (recipeID, recipeData) => {
  const { data } = await axios.patch(`${API_URL}/${recipeID}`, recipeData);
  return data;
};
