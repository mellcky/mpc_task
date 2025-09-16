import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Classic Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt for everyday wear',
        price: 19.99,
        category: 'Apparel',
        imageUrl: 'https://i.pinimg.com/1200x/4a/28/c4/4a28c4d59bae708b4906ce9645e5fd1b.jpg',
        inStock: true,
        variants: JSON.stringify([{
          id: 1,
          name: 'Size',
          options: ['S', 'M', 'L', 'XL']
        }])
      },
      {
        name: 'Stylish Baseball Cap',
        description: 'Adjustable baseball cap with trendy design',
        price: 24.99,
        category: 'Accessories',
        imageUrl: 'https://i.pinimg.com/1200x/50/b3/66/50b3667f24a53319f47643737e2bf1df.jpg',
        inStock: true,
        variants: JSON.stringify([{
          id: 1,
          name: 'Color',
          options: ['Black', 'Navy', 'Red', 'Green']
        }])
      },
      {
        name: 'Ceramic Coffee Mug',
        description: 'Large ceramic mug perfect for your morning coffee',
        price: 12.99,
        category: 'Home',
        imageUrl: 'https://i.pinimg.com/1200x/92/9f/e1/929fe12239f3f3d5ba63c22d55feee65.jpg',
        inStock: true,
        variants: JSON.stringify([{
          id: 1,
          name: 'Color',
          options: ['White', 'Black', 'Blue']
        }])
      },
      {
        name: 'Premium Leather Wallet',
        description: 'Genuine leather wallet with multiple card slots',
        price: 49.99,
        category: 'Accessories',
        imageUrl: 'https://i.pinimg.com/736x/5a/59/f9/5a59f94b2c2fa519d7a87961c5d1c505.jpg',///
        inStock: false,
        variants: JSON.stringify([{
          id: 1,
          name: 'Color',
          options: ['Brown', 'Black']
        }])
      }
    ]
    
  });
  
}

  


main()
  .catch((e) => {
    console.error(e);
    // Instead of process.exit(1), throw the error
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });