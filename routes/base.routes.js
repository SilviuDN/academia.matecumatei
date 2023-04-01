const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => res.json( { message: 'API MateCuMatei - disponibil in curand'} ) );

module.exports = router;
