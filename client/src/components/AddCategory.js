import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addcategory } from "../action/category";
import { getcategories } from "../action/category";

const AddCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getcategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    dispatch(addcategory({ name }));
    setName("");
    window.location.reload();
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"> Name</label>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          autoFocus
        />
      </div>
      <button className="btn btn-outline-primary">Create Root Category</button>
    </form>
  );

  return (
    <div>
      <h1>Create root Category</h1>
      {newCategoryForm()}
    </div>
  );
};

export default AddCategory;
