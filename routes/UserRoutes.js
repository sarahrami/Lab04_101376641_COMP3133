const express = require('express');
const app = express();
const User = require('../models/User');
const mongoose = require('mongoose');

// ADD USER
// http://localhost:3000/users
app.post('/', async (req, res) => {
    try{
        const {username} = req.body
        const userExist = await User.findOne({username})

        if(!userExist){
            const user = new User({...req.body})
            const newUser = await user.save()
            res.status(201).json({message: 'User Added', newUser })
        }else{
            res.status(500).json({message: 'User already exist.'})
        }
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

// RETRIEVE ALL USERS
// http://localhost:3000/users
app.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET USER BY ID
// http://localhost:3000/users/:id
app.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User does not exist.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE USER
// http://localhost:3000/users/:id
app.put('/:id', async (req, res) => {
    try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User does not exist.' });
        } else{
            res.json({message: "User Updated."});
        }
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE USER
// http://localhost:3000/users/:id
app.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User does not exist.' });
        } else{
            res.json({message: "User Deleted."});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;