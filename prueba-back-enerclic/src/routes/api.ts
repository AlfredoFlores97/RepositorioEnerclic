import express from "express";
import { datos } from '../data/datos';
import { middle } from "../middleware/middle";

const router = express.Router();
router.get('/api', middle, (req, res, next) => {
    res.send(datos);
})

export default router;