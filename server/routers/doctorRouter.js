const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')

//index
router.get('/', doctorController.index)

//show
router.get('/:id', doctorController.show)

module.exports = router