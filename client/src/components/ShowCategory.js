import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletecategories,
  updatecategories,
  addcategory,
} from "../action/category";

const ShowCategory = () => {
  const dispatch = useDispatch();
  const [edited, setedited] = useState("");
  const [newCat, setnewCat] = useState("");
  const [selectedId, setselectedId] = useState("");
  const category = useSelector((state) => state.category.categories);

  const handlefilter = (id) => {
    console.log(id);
    deletecategories(id);
    window.location.reload();
  };
  const renderCategory = (categories) => {
    let myCategory = [];
    for (let category of categories) {
      myCategory.push(
        <li key={category._id}>
          {category.name}

          <button
            onClick={() => {
              // console.log(category._id);
              setselectedId(category._id);
            }}
            type="button"
            className="btn btn-primary ml-3"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            +
          </button>
          <hr></hr>

          {category.children.length > 0 ? (
            <ul>{renderCategory(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategory;
  };

  const handleeditchange = (e) => {
    setedited(e.target.value);
  };

  const handleEditClick = (id) => {
    dispatch(updatecategories(id, edited));
    window.location.reload();
  };

  const handlenewchange = (e) => {
    setnewCat(e.target.value);
  };

  const handleNewClick = (id) => {
    dispatch(addcategory({ name: newCat, parentId: id }));
    window.location.reload();
  };

  return (
    <div className="mt-5">
      <h1>Categories</h1>
      <ul id="table">{renderCategory(category)}</ul>
      <div
        className="modal fade"
        id="exampleModal"
        // tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                onChange={handleeditchange}
                value={edited}
                type="text"
                placeholder="Category name"
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handleEditClick(selectedId)}
                type="button"
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Subcategory
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                onChange={handlenewchange}
                value={newCat}
                type="text"
                placeholder="Category name"
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handleNewClick(selectedId)}
                type="button"
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handlefilter(selectedId)}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCategory;
