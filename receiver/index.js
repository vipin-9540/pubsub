const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

const mongooseClient = config.get('db.client');
const redisUrl = config.get('redis.url');

// MongoDB connection
mongoose.connect(mongooseClient);
  
  // MongoDB Schema
  const UserSchema = new mongoose.Schema({
    id: String,
    user: String,
    class: String,
    age: Number,
    email: String,
    inserted_at: Date
  });
  
  const User = mongoose.model('user', UserSchema);
  
  const redisClient = createClient({ url: redisUrl });
  redisClient.connect().then(() => console.log('Redis connected (Receiver)'))
  .catch((error) =>{
    //console.log('redis_error',error);
  });
  

  app.get('/',(req,res)=>{
    res.send("Receiver is running ");
  });
  
  app.post('/receiver',[
    body('user').isString(),
    body('class').isString(),
    body('age').isInt(),
    body('email').isEmail()
    .custom(async (email) => {
      const existing = await User.findOne({ email });
      if (existing) {
        throw new Error('Email already exists');
      }
      return true;
    })
  ],
    async (req, res) => { 
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
      const payload = {
        ...req.body,
        inserted_at: new Date()
      };
      

      await User.create(payload);
      await redisClient.publish('user_new_record', JSON.stringify(payload))
      .then(() => {
        res.status(201).json({ 
          success: true,
          message: 'Record is saved successfully!',
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: 'Unable to publish record in redis!',
          errorDetails: {},
        });
      });
     
    });
  
app.listen(3000, () => {
  console.log('Receiver service running on port 3000');
});