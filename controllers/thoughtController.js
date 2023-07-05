const { User, Thought } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions", 
        select: "-__v", 
      })
      .select("-__v") 
      .then((allThoughtData) => res.json(allThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thoughtByIdData) => {
        if (!thoughtByIdData) {
          res.status(404).json({ message: "No Thought found with this ID!" });
          return;
        }
        res.json(thoughtByIdData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createThought({ body }, res) {
    Thought.create(body)
      .then((_id) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((createThoughtData) => {
        if (!createThoughtData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(createThoughtData);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(404).json({ message: "No Thought found with this ID!" });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedUserData) => {
        if (!deletedUserData) {
          res.status(404).json({ message: "No Thought found with this ID!" });
          return;
        }
        res.json(deletedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((addedReactionData) => {
        if (!addedReactionData) {
          res.status(404).json({ message: "No Reaction found with this ID!" });
          return;
        }
        res.json(addedReactionData);
      })
      .catch((err) => res.json(err));
  },
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((deletedReactionData) => {
        if (!deletedReactionData) {
            res.status(404).json({ message: "No Reaction found with this ID!" });
            return;
          }
        res.json(deletedReactionData);
      })
      .catch((err) => res.json(err));
  },
};
