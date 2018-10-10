const router = require('express').Router()
const controller = require('../controllers/categories')

const auth = require('./auth')

const db = require('../db')
const jwt = require('jsonwebtoken')
const jwtSecret = 'DevPlenoRocks!'

router.use(auth.checkJWT({ jwt, jwtSecret }))
router.post('/', controller.createCategory({ db }))
router.get('/', controller.getCategories({ db }))

router.patch('/:id', controller.update({ db }))
router.get('/:id', controller.getOne({ db }))
router.delete('/:id', controller.remove({ db }))

module.exports = router
