const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const thoughtRoutes = require("./api/thoughtRoutes");

router.use("/api", userRoutes);
router.use("/api", thoughtRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 route not found!</h1>')
});

module.exports = router;