const { Schema, model } = require("mongoose")

const reactionSchema = new Schema(
    {

    }
)

const thoughtSchema = new Schema(
    {

    }
)
const Thought = model("Thought", thoughtSchema)

module.exports = Thought