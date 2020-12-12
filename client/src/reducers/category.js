import { ADD_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../action/types";

const initialState = {
  categories: [],
  category: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    case GET_CATEGORY:
      return { ...state, categories: payload, loading: false };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: payload,
        loading: false,
      };
    default:
      return state;
  }
}
