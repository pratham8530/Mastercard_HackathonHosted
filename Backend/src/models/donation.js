import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Clothing",
        "Electronics",
        "Stationery",
        "Furniture",
        "Toys",
        "Others",
      ],
      required: true,
    },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
