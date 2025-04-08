const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/pubsub');
  
  // MongoDB Schema
  const RecordSchema = new mongoose.Schema({
    id: String,
    user: String,
    class: String,
    age: Number,
    email: String,
    inserted_at: Date
  });
  
  const User = mongoose.model('user', RecordSchema);
  
  // Redis Publisher
  const redisClient = createClient({ url: 'redis://redis:6379' });
  redisClient.connect().then(() => console.log('Redis connected (Receiver)'))
  .catch((error) =>{
    console.log('redis_error',error);
  });
  
  // Receiver endpoint
  app.get('/',(req,res)=>{
    res.send("Hello World");
  });
  app.post('/receiver',
    body('user').isString(),
    body('class').isString(),
    body('age').isInt(),
    body('email').isEmail(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
      const payload = {
        ...req.body,
        inserted_at: new Date()
      };
  
      await User.create(payload);

      const value = await redisClient.get('user_new_record');
      console.log('Value from Redis:', value);
      await redisClient.publish('user_new_record', JSON.stringify(payload))
      .then((payload) => {
        res.status(201).json({ 
          success: true,
          message: 'Record is saved successfully!',
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: 'Unable to save record in redis!',
          errorDetails: {},
        });
      });
     
    });
  
app.listen(3000, () => {
  console.log('Receiver service running on port 3000');
});