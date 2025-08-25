// const Request = require("../models/requests");
import Request from "../models/requests.js";
export const createRequest = async (req, res) => {
  try {
  const receiver = req.user && (req.user._id || req.user.sub);
    const request = new Request({
      receiver,
      itemsNeeded,
      description,
      category,
      quantity,
    });
    await request.save();
    res.status(201).json({ message: "Request created", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};