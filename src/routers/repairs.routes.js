const express = require('express');

const router = express.Router();

//Controller
const { 
    findAllRepairs, 
    findOneRepair, 
    createRepair,
    updateRepair,
    deleteRepair
} = require('../controllers/repairs.controller')

//middleware
const {
    protect,
    restrictTo
} = require('../middlewares/auth.middleware')
const {
    createRepairsValidator
} = require('../middlewares/validations.middleware')

router.use(protect)
router.use(restrictTo("employee"))

router
    .route('/')
    .get(findAllRepairs)
    .post(createRepairsValidator, createRepair)
    
router
    .route('/:id')
    .get(findOneRepair)
    .patch(updateRepair)
    .delete(deleteRepair);

module.exports = router;