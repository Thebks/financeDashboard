
import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
    try {
        // console.log("helloworld");
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (error) {
        // console.log("helloworldError");
        res.status(404).json({ message: error.message });
    }
});

export default router;