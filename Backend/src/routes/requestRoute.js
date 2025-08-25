// const express = require("express");
import express from "express"
const router = express.Router();
// const requestController = require("../controllers/requestController");
import {createRequest} from "../controllers/requestController.js"

// POST /api/requests - create request
router.post("/", createRequest);

export default router;