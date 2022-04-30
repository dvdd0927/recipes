import React, { useEffect } from "react";
import reducer from "./reducer";
import {
  getAllRecipe,
  insertRecipe,
  findRecipe,
  updateRecipe,
} from "./utils/api";

export const AppContext = React.createContext();

const initialState = {
  recipeList: [],
  recipeData: {
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
  },
  isEditing: false,
  menuFilter: "all",
  isLoading: false,
  isModalOpen: false,
  modalMessage: "",
  modalType: "",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchAllRecipe = async () => {
    dispatch({ type: "LOADING" });

    const recipeData = await getAllRecipe();

    dispatch({ type: "GET_ALL_RECIPE", payload: recipeData });
  };

  const searchRecipe = async (data, option) => {
    const response = await findRecipe(data, option);
    dispatch({ type: "SEARCH_RECIPE", payload: response });
  };

  const createRecipe = async (recipeData) => {
    const response = await insertRecipe(recipeData);

    if (response.msg.startsWith("Path")) {
      return openModal(true, response.msg, "danger");
    }

    openModal(true, response.msg, "success");
    dispatch({ type: "CREATE_RECIPE", payload: { newRecipe: response.data } });
  };

  const updateData = async (recipeID, dataToUpdate) => {
    const response = await updateRecipe(recipeID, dataToUpdate);

    if (response.msg.startsWith("Path")) {
      return openModal(true, response.msg, "danger");
    }

    openModal(true, response.msg, "success");
    dispatch({ type: "UPDATE_RECIPE", payload: { newRecipe: response.data } });
  };

  const getDataToUpdate = React.useCallback(async (id) => {
    dispatch({ type: "LOADING" });
    const response = await findRecipe(id, "ID");
    dispatch({ type: "LOAD_RECIPE", payload: response });
  }, []);

  const cancelUpdate = () => {
    dispatch({ type: "CANCEL" });
  };

  const filterRecipe = async (menuType) => {
    dispatch({ type: "FILTER_RECIPE", payload: menuType });
  };

  const showLoading = () => {
    dispatch({ type: "LOADING" });
  };

  const openModal = (isModalOpen, modalMessage, modalType) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { isModalOpen, modalMessage, modalType },
    });
  };

  const closeModal = (isModalOpen, modalMessage, modalType) => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: { isModalOpen, modalMessage, modalType },
    });
  };

  useEffect(() => {
    fetchAllRecipe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        searchRecipe,
        createRecipe,
        openModal,
        closeModal,
        showLoading,
        filterRecipe,
        updateData,
        getDataToUpdate,
        cancelUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};
