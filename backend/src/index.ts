import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category) } : {};
    
    const products = await prisma.product.findMany({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, inStock, variants } = req.body;
    
    // Basic validation
    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        variants: variants ? JSON.parse(variants) : null
      }
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cart endpoints
app.get('/cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId },
      include: { product: true }
    });
    
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId,
          productId: parseInt(productId)
        }
      },
      update: {
        quantity: parseInt(quantity) || 1
      },
      create: {
        cartId,
        productId: parseInt(productId),
        quantity: parseInt(quantity) || 1
      },
      include: { product: true }
    });
    
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/cart/:cartId/item/:productId', async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId,
          productId: parseInt(productId)
        }
      }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});