import User from "../models/user.js";

export const deleteCategory = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id // don't use strict equality due to the different types string != mongoose.Types.ObjectId
  );
  await User.updateOne(
    { _id: req.user._id },
    { $set: { categories: newCategories } }
  );
  const user = await User.findOne({ _id: req.user._id });
  res.json({ message: "Success", user, newCategories });
};
