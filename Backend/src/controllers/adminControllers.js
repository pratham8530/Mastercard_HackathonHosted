import Donation from "../models/donation.js";
import Request from "../models/requests.js";
import Match from "../models/match.js";

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email") // Populate donor details
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
      error: error.message,
    });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("receiver", "name email") // Populate receiver details
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id).populate(
      "donor",
      "name email"
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error("Error fetching donation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation",
      error: error.message,
    });
  }
};

// Get request by ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id).populate(
      "receiver",
      "name email"
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch request",
      error: error.message,
    });
  }
};

// Update donation status
export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "completed", "approved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: pending, completed, approved",
      });
    }

    const donation = await Donation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("donor", "name email");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation status updated successfully",
      data: donation,
    });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update donation status",
      error: error.message,
    });
  }
};

// Update request status
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: pending, approved, completed",
      });
    }

    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("receiver", "name email");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update request status",
      error: error.message,
    });
  }
};

// Create a match between donation and request
export const createMatch = async (req, res) => {
  try {
    const { donationId, requestId } = req.body;

    // Validate input
    if (!donationId || !requestId) {
      return res.status(400).json({
        success: false,
        message: "Both donation ID and request ID are required",
      });
    }

    // Check if donation exists and is available
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    if (donation.status !== "pending" && donation.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Donation is not available for matching",
      });
    }

    // Check if request exists and is available
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.status !== "pending" && request.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Request is not available for matching",
      });
    }

    // Check if match already exists
    const existingMatch = await Match.findOne({
      donation: donationId,
      request: requestId,
    });

    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: "This donation and request are already matched",
      });
    }

    // Create the match
    const match = new Match({
      donor: donation.donor,
      receiver: request.receiver,
      donation: donationId,
      request: requestId,
      status: "pending",
    });

    await match.save();

    // Populate the match with related data
    const populatedMatch = await Match.findById(match._id)
      .populate("donor", "name email")
      .populate("receiver", "name email")
      .populate("donation", "title description category quantity image status")
      .populate("request", "itemsNeeded description category quantity status");

    // Optionally update donation and request status to indicate they're matched
    await Promise.all([
      Donation.findByIdAndUpdate(donationId, { status: "approved" }),
      Request.findByIdAndUpdate(requestId, { status: "approved" }),
    ]);

    res.status(201).json({
      success: true,
      message: "Match created successfully",
      data: populatedMatch,
    });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create match",
      error: error.message,
    });
  }
};

// Get all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("donor", "name email")
      .populate("receiver", "name email")
      .populate("donation", "title description category quantity image status")
      .populate("request", "itemsNeeded description category quantity status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
};

// Get match by ID
export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id)
      .populate("donor", "name email")
      .populate("receiver", "name email")
      .populate("donation", "title description category quantity image status")
      .populate("request", "itemsNeeded description category quantity status");

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch match",
      error: error.message,
    });
  }
};

// Update match status
export const updateMatchStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: pending, approved, completed",
      });
    }

    const match = await Match.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("donor", "name email")
      .populate("receiver", "name email")
      .populate("donation", "title description category quantity image status")
      .populate("request", "itemsNeeded description category quantity status");

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    // If match is completed, update donation and request status
    if (status === "completed") {
      await Promise.all([
        Donation.findByIdAndUpdate(match.donation._id, { status: "completed" }),
        Request.findByIdAndUpdate(match.request._id, { status: "completed" }),
      ]);
    }

    res.status(200).json({
      success: true,
      message: "Match status updated successfully",
      data: match,
    });
  } catch (error) {
    console.error("Error updating match status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update match status",
      error: error.message,
    });
  }
};

// Delete a match
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    // Reset donation and request status to pending when match is deleted
    await Promise.all([
      Donation.findByIdAndUpdate(match.donation, { status: "pending" }),
      Request.findByIdAndUpdate(match.request, { status: "pending" }),
      Match.findByIdAndDelete(id),
    ]);

    res.status(200).json({
      success: true,
      message: "Match deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete match",
      error: error.message,
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalDonations,
      totalRequests,
      totalMatches,
      pendingDonations,
      pendingRequests,
      pendingMatches,
      completedDonations,
      completedRequests,
      completedMatches,
    ] = await Promise.all([
      Donation.countDocuments(),
      Request.countDocuments(),
      Match.countDocuments(),
      Donation.countDocuments({ status: "pending" }),
      Request.countDocuments({ status: "pending" }),
      Match.countDocuments({ status: "pending" }),
      Donation.countDocuments({ status: "completed" }),
      Request.countDocuments({ status: "completed" }),
      Match.countDocuments({ status: "completed" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        donations: {
          total: totalDonations,
          pending: pendingDonations,
          completed: completedDonations,
        },
        requests: {
          total: totalRequests,
          pending: pendingRequests,
          completed: completedRequests,
        },
        matches: {
          total: totalMatches,
          pending: pendingMatches,
          completed: completedMatches,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};