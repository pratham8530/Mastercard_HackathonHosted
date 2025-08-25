// const Donation = require("../models/donation");
// const uploadToCloudinary = require("../services/cloudinary.js");

// export const createDonation = async (req, res) => {
//   try {
//     const { donor, title, description, category, quantity } = req.body;
//     let imageUrl = "";
//     if (req.file && req.file.path) {
//       const result = await uploadToCloudinary(req.file.path, "donations");
//       imageUrl = result?.secure_url || "";
//     }
//     const donation = new Donation({
//       donor,
//       title,
//       description,
//       category,
//       quantity,
//       image: imageUrl,
//     });
//     await donation.save();
//     res.status(201).json({ message: "Donation created", donation });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



import Donation from "../models/donation.js";
import uploadToCloudinary from "../services/cloudinary.js";

export const createDonation = async (req, res) => {
  try {
    // Get user id from auth middleware
    const donor = req.user && (req.user._id || req.user.sub);
    console.log(donor)
    if (!donor) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, category } = req.body;
    let quantity = parseInt(req.body.quantity) || 1;
    let imageUrl = "";
    console.log(233)
    if (req.file && req.file.path) {
      const result = await uploadToCloudinary(req.file.path, "donations");
      imageUrl = result?.secure_url || "";
    }
    console.log(3435)
    console.log(imageUrl)
    const donation = new Donation({
      donor,
      title,
      description,
      category,
      quantity,
      image: imageUrl,
    });
    console.log(3453443)
    await donation.save();
    res.status(201).json({ message: "Donation created", donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};