import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        // console.log("helloworld");
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        // console.log("helloworldError");
        res.status(404).json({ message: error.message });
    }
});

export default router;