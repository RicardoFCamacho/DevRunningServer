const router = require('express').Router()

const users = require('./users')
const runs = require('./runs')
const categories = require('./categories')

router.get('/', (req, res) => res.send('DevReactJS sample project.'))
router.use('/users', users)
router.use('/runs', runs)
router.use('/categories', categories)

module.exports = router
