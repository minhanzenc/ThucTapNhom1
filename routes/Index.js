const {Router} = require('express')
const router = Router({mergeParams:true})

const {router:categoryRouter} = require('./CategoryRoute') 
const {router:subjectRouter} = require('./SubjectRouter') 
const {router:teacherRouter} = require('./TeacherRouter') 
const {router:studentRouter} = require('./StudentRouter') 

 
router.use('/category',categoryRouter)
router.use('/subject',subjectRouter)
router.use('/teacher',teacherRouter)
router.use('/student',studentRouter)
module.exports = router