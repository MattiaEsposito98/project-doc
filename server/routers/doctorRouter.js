const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')

//index
router.get('/', doctorController.index)

//show
router.get('/:id', doctorController.show)

//postDoctor
router.post('/register', doctorController.storeDoctor)

//postReview
router.post('/:id', doctorController.storeReview)


module.exports = router