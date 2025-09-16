# 🛒 Full-Stack E-commerce App

This is a simple full-stack **E-commerce Store** project built with:

- **Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite (or PostgreSQL/MySQL)
- **Frontend:** React (Create React App + TypeScript)

---

## 📂 Project Structure

```
.
├── backend/         # Express + Prisma + TS
│   ├── src/         # Backend source code
│   │   └── index.ts
│   ├── prisma/      # Prisma schema & seed
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/        # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```bash
cd backend
npm install
```

### 2️⃣ Configure environment variables

Create a `.env` file inside the `backend/` folder:

```env
# For SQLite
DATABASE_URL="file:./dev.db"

# OR (if using PostgreSQL)
# DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
```

### 3️⃣ Setup Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample products
npx ts-node prisma/seed.ts
```

### 4️⃣ Run backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production build
npm run build
npm start
```

By default, backend runs at **[http://localhost:5000](http://localhost:5000)**.

---

## 🎨 Frontend Setup

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Run frontend

```bash
npm start
```

Frontend will run at **[http://localhost:3000](http://localhost:3000)**.

---

## 🔗 Connecting Frontend & Backend

In your frontend code (e.g. `src/api.ts`), set API base URL to your backend:

```typescript
const API_BASE_URL = "http://localhost:5000";
```

When deployed, replace with your hosted backend URL (e.g., Render/Railway).

---

## 📡 API Documentation

### Products

- **GET** `/api/products` → Get all products
- **GET** `/api/products/:id` → Get single product by ID
- **GET** `/api/products?category=Apparel` → Get products filtered by category
- **POST** `/api/products` → Add new product

**POST Body Example:**

```json
{
  "name": "New Product",
  "price": 29.99,
  "category": "Apparel",
  "image": "https://example.com/product.jpg",
  "variants": ["Red", "Blue"],
  "inStock": true
}
```

### Cart

- **GET** `/api/cart/:cartId` → Get cart items
- **POST** `/api/cart/:cartId` → Add product to cart
- **DELETE** `/api/cart/:cartId/item/:productId` → Remove item from cart

---

## 🚀 Deployment Notes

### Deploy Backend

- Works with **Render**, **Railway**, or **Heroku**.
- Example build & start commands:
  - **Build:** `npm install && npx prisma generate && npm run build`
  - **Start:** `npm start`
- Add your `.env` variables in the platform settings.

### Deploy Frontend

- Use **Netlify**, **Vercel**, or **Render**.
- Build frontend:
  ```bash
  npm run build
  ```
- Deploy the `build/` folder.

---

## ✅ Scripts Summary

### Backend

```bash
npm run dev          # Start dev server with reload
npm run build        # Compile TypeScript
npm start            # Run compiled server
npx prisma studio    # Open Prisma Studio (DB browser)
```

### Frontend

```bash
npm start            # Start React dev server
npm run build        # Build for production
```

---

## 🧑‍💻 Author

Melkzedeck B Silemu

---

Would you like me to also include a sample `.env.example` file (ready to copy) inside the README so anyone cloning your repo knows exactly what env vars to add?
