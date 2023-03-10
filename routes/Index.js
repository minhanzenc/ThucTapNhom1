const {Router} = require('express')
const router = Router({mergeParams:true})

const {router:categoryRouter} = require('./CategoryRoute') 
 
router.use('/category',categoryRouter)

module.exports = router