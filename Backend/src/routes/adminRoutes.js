import express from "express";
import {
  getAllDonations,
  getAllRequests,
  getDonationById,
  getRequestById,
  updateDonationStatus,
  updateRequestStatus,
  getDashboardStats,
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatchStatus,
  deleteMatch,
} from "../controllers/adminControllers.js";

const router = express.Router();

// Dashboard routes
router.get("/dashboard/stats", getDashboardStats);

// Donation routes
router.get("/donations", getAllDonations);
router.get("/donations/:id", getDonationById);
router.patch("/donations/:id/status", updateDonationStatus);

// Request routes
router.get("/requests", getAllRequests);
router.get("/requests/:id", getRequestById);
router.patch("/requests/:id/status", updateRequestStatus);

// Match routes
router.post("/matches", createMatch);
router.get("/matches", getAllMatches);
router.get("/matches/:id", getMatchById);
router.patch("/matches/:id/status", updateMatchStatus);
router.delete("/matches/:id", deleteMatch);

export default router;