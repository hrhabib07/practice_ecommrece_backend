# practise_eccorece_backend

A practice project exploring **server-side development with Express, TypeScript, and MongoDB**.  
This backend demonstrates building a structured CRUD API for products and orders, integrating validation, error handling, and deployment to Vercel.  

🔗 **Live Server:** [https://practise-ecommerece-backend.vercel.app/](https://practise-ecommerece-backend.vercel.app/)

---

## 🚀 Features

- **Product Management**
  - Create, Read, Update, Delete (CRUD) products
  - Search products by name or tags
  - Inventory tracking with quantity and stock status

- **Order Management**
  - Create new orders
  - Retrieve all orders or filter by user email
  - Auto-update product inventory on new order
  - Prevents order placement if stock is insufficient

- **Validation & Error Handling**
  - Input validation with **Zod/Joi**
  - Meaningful error responses for invalid requests
  - Handles not found routes and missing resources gracefully

- **Tech Stack**
  - **TypeScript** + **Express.js** for backend
  - **MongoDB** + **Mongoose** for database and data modeling
  - **Vercel** for deployment (fast serverless hosting)

---

## 📂 API Endpoints Overview

### Products
- `POST /api/products` → Create a new product  
- `GET /api/products` → Get all products / search with `?searchTerm=`  
- `GET /api/products/:productId` → Get product by ID  
- `PUT /api/products/:productId` → Update product  
- `DELETE /api/products/:productId` → Delete product  

### Orders
- `POST /api/orders` → Create a new order  
- `GET /api/orders` → Get all orders  
- `GET /api/orders?email=user@example.com` → Get orders by email  

---

## 🛠️ Getting Started

**Clone the repo & install dependencies:**
```bash
git clone https://github.com/yourusername/practise_ecommerece_backend.git
cd practise_ecommerece_backend
npm install
