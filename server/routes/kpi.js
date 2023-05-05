import express from "express"

const router = express.Router();

router.get("/Kpis", async (req, res) => {
    try {
        const kpis = await KPI.find();
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})