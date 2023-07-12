const { User } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((allUserData) => res.json(allUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((userByIdData) => {
        if (!userByIdData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(userByIdData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((createdUserData) => res.json(createdUserData))
      .catch((err) => res.json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deletedUserData) => {
        if (!deletedUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(deletedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((addedFriendData) => {
        if (!addedFriendData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(addedFriendData);
      })
      .catch((err) => res.json(err));
  },
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((deletedFriendData) => {
        if (!deletedFriendData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(deletedFriendData);
      })
      .catch((err) => res.json(err));
  },
};


