# 🤖 Mecha Swagger Insult API

A playful, public insult API built with Node.js + Express. Use it to fetch random, filtered, or complete lists of sarcastic and humorous insults. Great for bots, games, or just having fun.

---

## 🚀 Live Demo

- 🌐 Base URL: [`https://random-insult.onrender.com/`](https://random-insult.onrender.com/)
- 🧾 Docs Endpoint: [`/docs`](https://random-insult.onrender.com/docs)

---

## 📦 Features

- ✅ Random insult generator
- ✅ Filter insults by keyword
- ✅ Full list of all insults
- ✅ Rate-limited to prevent spam
- ✅ CORS enabled
- ✅ JSON response format

---

## 📡 API Endpoints

### `GET /`

Returns a welcome message.

### `GET /docs`

Returns basic API documentation in JSON format.

### `GET /insults`

Returns the full list of insults.

#### Optional query:
- `filter` – filter insults by keyword  
  Example: `/insults?filter=moron`

### `GET /random-insult`

Returns a single random insult.

---

## 🧪 Example Responses

### `GET /random-insult`
```json
{
  "status": "success",
  "data": "You're the reason the gene pool needs a lifeguard."
}
