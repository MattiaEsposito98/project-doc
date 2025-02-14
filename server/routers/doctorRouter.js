const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController')

//index
router.get('/', doctorController.index)

//Ricerca
router.get('/search', doctorController.search)

//postDoctor
router.post('/register', doctorController.storeDoctor)

//show
router.get('/:id', doctorController.show)

//postReview
router.post('/:id', doctorController.storeReview)

module.exports = router