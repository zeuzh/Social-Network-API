const express = require("express")
const mongoose = require("mongoose")
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routes)

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://actiohn:pass123word@cluster0.qz4zuvo.mongodb.net/', {
    useUnifiedTopology: true
})

mongoose.set('debug', true)

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))