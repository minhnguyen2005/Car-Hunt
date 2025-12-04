import express from "express";
import SellRequest from "../models/SellRequest.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route   POST /api/sell
// @desc    Create a new sell request
// @access  Public (should be protected in production)
router.post("/", async (req, res) => {
  try {
    const sellRequestData = req.body;

    // Create sell request
    const sellRequest = await SellRequest.create({
      ...sellRequestData,
      userId: sellRequestData.userId || null, // Can be null if user not logged in
    });

    res.status(201).json({
      success: true,
      message: "Sell request submitted successfully",
      data: sellRequest,
    });
  } catch (error) {
    console.error("Create sell request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/sell
// @desc    Get all sell requests (for admin)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const sellRequests = await SellRequest.find(query)
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: sellRequests,
    });
  } catch (error) {
    console.error("Get sell requests error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/sell/public/approved
// @desc    Get all approved sell requests (public, used for catalog)
// @access  Public
router.get("/public/approved", async (req, res) => {
  try {
    const sellRequests = await SellRequest.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: sellRequests,
    });
  } catch (error) {
    console.error("Get public approved sell requests error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/sell/public/:id
// @desc    Get a single approved sell request (public)
// @access  Public
router.get("/public/:id", async (req, res) => {
  try {
    const sellRequest = await SellRequest.findOne({
      _id: req.params.id,
      status: "approved",
    }).populate("userId", "name email phone");

    if (!sellRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sellRequest,
    });
  } catch (error) {
    console.error("Get public sell request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   GET /api/sell/:id
// @desc    Get a single sell request
// @access  Private/Admin
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const sellRequest = await SellRequest.findById(req.params.id).populate(
      "userId",
      "name email phone"
    );

    if (!sellRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell request not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sellRequest,
    });
  } catch (error) {
    console.error("Get sell request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PATCH /api/sell/:id/approve
// @desc    Approve a sell request
// @access  Private/Admin
router.patch("/:id/approve", protect, admin, async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const sellRequest = await SellRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
        adminNotes: adminNotes || "",
      },
      { new: true }
    ).populate("userId", "name email phone");

    if (!sellRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sell request approved",
      data: sellRequest,
    });
  } catch (error) {
    console.error("Approve sell request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @route   PATCH /api/sell/:id/reject
// @desc    Reject a sell request
// @access  Private/Admin
router.patch("/:id/reject", protect, admin, async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const sellRequest = await SellRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        adminNotes: adminNotes || "",
      },
      { new: true }
    ).populate("userId", "name email phone");

    if (!sellRequest) {
      return res.status(404).json({
        success: false,
        message: "Sell request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sell request rejected",
      data: sellRequest,
    });
  } catch (error) {
    console.error("Reject sell request error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
