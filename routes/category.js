const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

function createCategory(list, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId === null) {
    category = list.filter((cat) => cat.parentId == undefined);
  } else {
    category = list.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      children: createCategory(list, cat._id),
    });
  }
  return categoryList;
}

router.post("/create", async (req, res) => {
  try {
    let category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res
        .status(400)
        .json({ error: [{ msg: " Category already exist" }] });
    }
    categoryObj = { name: req.body.name };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    category = new Category(categoryObj);

    await category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Category.find({});
    if (list) {
      const nestedList = createCategory(list);
      res.json(nestedList);
      // res.json(list);
    }
  } catch (error) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    await category.remove();

    res.json({ msg: "product removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    category.name = req.body.name;
    category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(401).send("sserver error");
  }
});

module.exports = router;
