const config = require('config');
const mongoose = require('mongoose');
const { createClient } = require('redis');

// MongoDB connection
const mongooseClient = config.get('db.client');
const redisUrl = config.get('redis.url');

mongoose.connect(mongooseClient);

// Define schema for the second table
const ListenerSchema = new mongoose.Schema({
  id: String,
  user: String,
  class: String,
  age: Number,
  email: String,
  inserted_at: Date,
  modified_at: Date
});

const ListenerModel = mongoose.model('user_log', ListenerSchema);

// Redis Subscriber
const redisClient = createClient({ url: redisUrl });

(async () => {
  await redisClient.connect();
  console.log('Redis connected (Listener)');

  // Subscribe to the same channel
  await redisClient.subscribe('user_new_record', async (message) => {
    const parsed = JSON.parse(message);

    const modifiedPayload = {
      ...parsed,
      modified_at: new Date()
    };

    await ListenerModel.create(modifiedPayload);
    console.log('New message processed and stored:', modifiedPayload);
  });
})();