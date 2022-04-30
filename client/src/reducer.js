const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "LOADING") {
    return { ...state, isLoading: true };
  }
  if (type === "OPEN_MODAL") {
    return { ...state, isLoading: false, ...payload };
  }
  if (type === "CLOSE_MODAL") {
    return { ...state, ...payload };
  }
  if (type === "GET_ALL_RECIPE") {
    return { ...state, recipeList: payload, isLoading: false };
  }
  if (type === "CREATE_RECIPE") {
    return {
      ...state,
      recipeList: [...state.recipeList, payload.newRecipe],
      isLoading: false,
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
    };
  }
  if (type === "UPDATE_RECIPE") {
    return {
      ...state,
      isLoading: false,
      isEditing: false,
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
    };
  }
  if (type === "CANCEL") {
    return {
      ...state,
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
      isLoading: false,
    };
  }
  if (type === "LOAD_RECIPE") {
    return {
      ...state,
      recipeData: payload,
      isEditing: true,
      isLoading: false,
    };
  }
  if (type === "SEARCH_RECIPE") {
    return { ...state, recipeList: payload };
  }
  if (type === "FILTER_RECIPE") {
    return {
      ...state,
      menuFilter: payload,
    };
  }
  return state;
};

export default reducer;
