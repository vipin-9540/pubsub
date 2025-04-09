1. Clone the repo
   git clone https://github.com/vipin-9540/pubsub.git
   cd pubsub
   npm i

2. Start all services
   docker-compose up --build

3. receiver service on http://localhost:3000

4. Redis and MongoDB in background

5. Use Postman or curl:

6. Curl Request

   curl -X POST http://localhost:3000/receiver \
    -H "Content-Type: application/json" \
    -d '{
   "user": "Harry",
   "class": "Comics",
   "age": 22,
   "email": "harry@potter.com"
   }'

7. Config Varibles

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

8. Stopping All Services

   docker-compose down
