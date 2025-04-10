# PubSub Microservice System

This is a simple Pub/Sub system built using Node.js, Docker, Redis, and MongoDB. It includes two services:

- **Receiver** – Accepts and validates incoming JSON data, stores it in MongoDB, and publishes an event to Redis.
- **Listener** – Listens for published events, modifies the data (adds a timestamp), and stores it into another collection.

---

## 📆 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vipin-9540/pubsub.git
```

### 2. Install Dependencies

- Receiver Service:

  ```bash
  cd pubsub/receiver
  npm install
  ```

- Listener Service:
  ```bash
  cd ../listener
  npm install
  ```

---

## 🚀 Running the Services

Make sure Docker is installed and running.

Start all services using Docker Compose:

```bash
docker-compose up --build
```

### Services

- **Receiver**: [http://localhost:3000](http://localhost:3000)
- **Listener**: Background process
- **Redis** and **MongoDB**: Run in Docker containers

---

## 📬 API Usage

### POST `/receiver`

Send a POST request with user data:

#### Example using `curl`:

```bash
curl -X POST http://localhost:3000/receiver \
  -H "Content-Type: application/json" \
  -d '{
    "user": "Harry",
    "class": "Comics",
    "age": 22,
    "email": "harry@potter.com"
  }'
```

You can also use Postman or any REST client.

---

## ⚙️ Configuration

### `listener/config/dev.js`

```js
"db": {
  "host": "localhost",
  "port": 27017,
  "name": "pubsub",
  "client": "mongodb://mongo:27017/pubsub"
},
"redis": {
  "url": "redis://redis:6379"
},
"port": 300
```

### `receiver/config/dev.js`

```js
"db": {
  "host": "localhost",
  "port": 27017,
  "name": "pubsub",
  "client": "mongodb://mongo:27017/pubsub"
},
"redis": {
  "url": "redis://redis:6379"
},
"port": 3000
```

---

## 👍 Stopping Services

To stop all services:

```bash
docker-compose down
```

---

## 🛠 Tech Stack

- Node.js
- Docker & Docker Compose
- Redis (Pub/Sub)
- MongoDB
- Express

---

## 📌 Notes

- The receiver validates and stores incoming JSON data.
- The listener processes events, adds a timestamp, and saves them in a separate collection.
- The services are loosely coupled and communicate through Redis channels.

---

## 🧑‍💻 Author

**Vipin**  
[GitHub](https://github.com/vipin-9540)

---

Feel free to contribute or raise issues!
