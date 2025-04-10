1. Clone the repo
   git clone https://github.com/vipin-9540/pubsub.git
   cd pubsub/receiver
   npm i

   cd pubsub/listener
   npm i

3. Start all services
   docker-compose up --build

4. receiver service on http://localhost:3000

5. Redis and MongoDB in background

6. Use Postman or curl:

7. Curl Request

   curl -X POST http://localhost:3000/receiver \
    -H "Content-Type: application/json" \
    -d '{
   "user": "Harry",
   "class": "Comics",
   "age": 22,
   "email": "harry@potter.com"
   }'

8. Config Varibles

   i. listner/config/dev.js

   "db": {
   "host": "localhost",
   "port": 27017,
   "name": "pubsub",
   "client": "mongodb://mongo:27017/pubsub",
   },
   "redis": {
   "url": "redis://redis:6379"
   },
   "port": 300

   ii. receiver/config/dev.js
   "db": {
   "host": "localhost",
   "port": 27017,
   "name": "pubsub",
   "client": "mongodb://mongo:27017/pubsub",
   },
   "redis": {
   "url": "redis://redis:6379"
   },
   "port": 3000

9. Stopping All Services

   docker-compose down
