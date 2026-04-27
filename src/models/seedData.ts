import mongoose from "mongoose";
import { productModel } from "./product.model.js";
import { MONOGO_URL } from "../config/ENVconfig.js";

const seedProducts = async () => {
  try {
    await mongoose.connect(MONOGO_URL as string);
    const categoryId = new mongoose.Types.ObjectId();
    const subCategoryId = new mongoose.Types.ObjectId();
    const products = [];
    const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "Nike", "Adidas"];
    const titles = ["Phone", "Laptop", "Headphones", "Shoes", "Watch", "Tablet"];
    for (let i = 1; i <= 50; i++) {
      const title = `${brands[i % brands.length]} ${titles[i % titles.length]} ${i}`;
      products.push({
        title,
        slug: title.toLowerCase().replaceAll(" ", "-"),
        price: Math.floor(Math.random() * 2000) + 100,
        priceAfterDiscount: Math.random() > 0.5 ? Math.floor(Math.random() * 1500) + 50 : undefined,
        ratingAvg: (Math.random() * 4 + 1).toFixed(1),
        ratingCount: Math.floor(Math.random() * 500),
        description: `This is a great ${titles[i % titles.length]} with high quality and performance number ${i}`,
        quantity: Math.floor(Math.random() * 200),
        sold: Math.floor(Math.random() * 100),
        imgCover: "default.jpg",
        images: ["img1.jpg", "img2.jpg"],
        category: categoryId,
        subCategory: subCategoryId,
        brand: brands[i % brands.length]
      });
    }

    await productModel.insertMany(products);

    console.log("🔥 50 Products Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();