const { Op } = require('sequelize');
const Repair = require("../models/repair.model")
const catchAsync = require('./../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
    const repairs = await Repair.findAll({
        where: {
            status: {
                [Op.not] : "cancelled",
            },
        }
    })
    return res.status(200).json({
        results: repairs.length,
        status: "success",
        message: "Repairs were successfully",
        repairs
    })
})

exports.findOneRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const repair = await Repair.findOne({
        where: {
            status: {
                [Op.not] : "cancelled",
            },
            id
        }
    })
    if (!repair) {
        return res.status(404).json({
            status: "Not Found",
            message: "Repair could not found",
        })
    }
    return res.status(200).json({
        status: "OK",
        repair
    })
})

exports.createRepair = catchAsync(async (req, res, next) => {
    const { date, userId, motorsNumber, description } = req.body
    console.log(date, userId, motorsNumber, description)
    const repair = await Repair.create({
        date,
        userId,
        motorsNumber,
        description
    })
    
    return res.status(200).json({
        message: "Repairs were successfully created",
        repair
    })
})

exports.updateRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const repair = await Repair.findOne({
        where: {
            status: "pending",
            id
        }
    })
    if (!repair) {
        return res.status(404).json({
            status: "Not Found",
            message: "Repair could not found"
        })
    }
    
    await repair.update({status: "completed"})

    return res.status(200).json({
        status: "Ok",
        repair
    })
})

exports.deleteRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const repair = await Repair.findOne({
        where: {
            status: {
                [Op.not] : "cancelled",
            },
            id
        }
    })

    if (!repair) {
        return res.status(404).json({
            status: "Not Found",
            message: "Repair could not found"
        })
    }

    if (repair.status === "completed") {
        return res.json({
            status: "deleted negative",
            message: "I dont have deleted"
        })
    }

    await repair.update({status:"cancelled"})

    return res.status(200).json({
        status: "Ok",
        repair
    })
})