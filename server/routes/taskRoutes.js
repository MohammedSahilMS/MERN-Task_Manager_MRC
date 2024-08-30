const express = require("express")
const Task = require ("../models/Task")
const authMiddeleware = require ("../middleware/authMiddleware")

const router = express.Router()

//Create Task

router.post("/" ,authMiddeleware , async ( req,res) => {
    const {title} = req.body;
    try {
        const task = new Task ({userId: req.user.id , title})
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

// Get task

router.get("/" , authMiddeleware , async (req,res) => {
    try {
        const tasks = await Task.find({userId:req.user.id})
        res.json(tasks)
    } catch (error) {
        res.status(500).json({msg: err.message});
    }
});

//Delete Task

router.delete("/:id" , authMiddeleware , async (req,res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({msg:"Task deleted"});
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
});

module.exports = router;