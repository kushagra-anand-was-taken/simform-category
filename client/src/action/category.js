import { ADD_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "./types";
import api from "../utils/api";
import axios from "axios";

export const addcategory = (data) => async (dispatch) => {
  try {
    const res = await api.post("/category/create", data);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      console.log(errors);
    }
  }
};

export const getcategories = () => async (dispatch) => {
  try {
    const res = await api.get("/category");
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletecategories = async (id) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/category/delete/${id}`
    );
    console.log(res.data.msg);
  } catch (error) {
    console.log(error);
  }
};

export const updatecategories = (id, name) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/category/update/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        name,
      }
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
